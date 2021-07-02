/* Service */
import db from '../service/db';
import FieldValue from '../service/db/value';
import { deleteCollection } from '../service/db/helper';

/* Utility */
import AppError from '../utils/appError';

class Appointment {
  static async create({ doctor, description, capacity }) {
    const data = {
      capacity,
      description,
      doctor_name: doctor,
      total_registered: 0,
      created_at: FieldValue.serverTimestamp(),
      updated_at: FieldValue.serverTimestamp(),
    };

    const { aid } = db.collection('appointments').doc();

    await db
      .collection('appointments')
      .doc(aid)
      .set(data)
      .catch((err) => {
        throw new AppError(err.message, 500);
      });

    const responseData = {
      aid,
      ...data,
    };

    return responseData;
  }

  static async get() {
    const appointments = await db
      .collection('appointments')
      .get()
      .catch((err) => {
        throw new AppError(err.message, 500);
      });

    if (appointments.empty) {
      throw new AppError('Tidak ada konsultasi dengan dokter yang tersedia saat ini', 404);
    }

    const data = [];
    appointments.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    return data;
  }

  static async update({ aid, doctor, description, capacity }) {
    const data = {
      capacity,
      description,
      doctor_name: doctor,
      updated_at: FieldValue.serverTimestamp(),
    };

    const appointmentRef = db.collection('appointments').doc(aid);

    const appointment = await appointmentRef.get().catch((err) => {
      throw new AppError(err.message, 500);
    });

    const appointmentData = appointment.data();

    if (capacity < appointmentData.total_registered) {
      throw new AppError(
        'Tidak dapat mengubah kapasitas, jumlah kapasitas tidak boleh lebih kecil dari ' +
          'jumlah pasien yang terdaftar saat ini. Saat ini sudah ada ' +
          `${appointmentData.total_registered} orang yang terdaftar pada ${aid}.`,
        400
      );
    }

    await appointmentRef.update(data).catch((err) => {
      throw new AppError(err.message, 500);
    });

    const responseData = {
      aid,
      ...data,
    };

    return responseData;
  }

  static async delete({ aid }) {
    const APPOINTMENT_PATH = `appointments/${aid}`;
    const REGISTRANT_PATH = `${APPOINTMENT_PATH}/registrants`;

    const getRegistrants = db.collection(REGISTRANT_PATH).get();
    const colectionDeletion = deleteCollection(db, REGISTRANT_PATH, 8);

    const operations = [getRegistrants, colectionDeletion];
    const [registrantsData] = await Promise.all(operations).catch((err) => {
      throw new AppError(err.message, 500);
    });

    // Remove appointment references from user data
    registrantsData.forEach((doc) => {
      const user = doc.data();
      user.ref.update({ appointments: FieldValue.arrayRemove(doc) }).catch((err) => {
        throw new AppError(err.message, 500);
      });
    });

    // Delete appointment document
    await db
      .doc(APPOINTMENT_PATH)
      .delete()
      .catch((err) => {
        throw new AppError(err.message, 500);
      });

    return aid;
  }

  static async getRegistrants({ aid }) {
    const data = [];

    const REGISTRANT_PATH = `appointments/${aid}/registrants`;

    const registrants = await db
      .collection(REGISTRANT_PATH)
      .get()
      .catch((err) => {
        throw new AppError(err.message, 500);
      });

    registrants.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    return data;
  }

  static async apply({ uid, aid }) {
    const data = {
      username: uid,
      ref: db.doc(`roles/patient/users/${uid}`),
      created_at: FieldValue.serverTimestamp(),
    };

    // Get data of total capacity and total number of registered patient
    const appointmentRef = db.collection('appointments').doc(aid);
    const appointment = await appointmentRef.get().catch((err) => {
      throw new AppError(err.message, 500);
    });

    const { total_registered: totalRegistered, capacity } = appointment.data();

    // Reject request if the capacity is already full
    if (totalRegistered === capacity) {
      throw new AppError('Tidak bisa mendaftar, jumlah pendaftar sudah memenuhi kapasitas', 400);
    }

    // Add new user to registrants collection
    const registrantsRef = db.collection(`appointments/${aid}/registrants`);
    const addUser = registrantsRef.doc(uid).set(data);

    // Add new appointment to user list of appointments
    const userRef = db.doc(`roles/patient/users/${uid}`);
    const updateData = { appointments: FieldValue.arrayUnion(registrantsRef.doc(uid)) };
    const updateUser = userRef.update(updateData);

    // Update number of registered user value
    const registered = { total_registered: FieldValue.increment(1) };
    const incrementCounter = appointmentRef.update(registered);

    const operations = [addUser, updateUser, incrementCounter];
    await Promise.all(operations).catch((err) => {
      throw new AppError(err.message, 500);
    });

    return appointment.data();
  }

  static async cancel({ uid, aid }) {
    const APPOINTMENT_PATH = `appointments/${aid}`;
    const REGISTRANT_PATH = `${APPOINTMENT_PATH}/registrants/${uid}`;
    const USER_PATH = `roles/patient/users/${uid}`;

    // Remove user from appointment registered patient
    const registrantUserRef = db.doc(REGISTRANT_PATH);
    const deleteRegistrant = registrantUserRef.delete();

    // Update user appointment list
    const userRef = db.doc(USER_PATH);
    const updateData = { appointments: FieldValue.arrayRemove(registrantUserRef) };
    const updateUser = userRef.update(updateData);

    // Update number of registered user value
    const appointmentRef = db.doc(APPOINTMENT_PATH);
    const registered = { total_registered: FieldValue.increment(-1) };
    const decrementCounter = appointmentRef.update(registered);

    const operations = [deleteRegistrant, updateUser, decrementCounter];
    await Promise.all(operations).catch((err) => {
      throw new AppError(err.message, 500);
    });

    return aid;
  }
}

export default Appointment;
