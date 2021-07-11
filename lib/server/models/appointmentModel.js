/* Service */
import db from '../service/db';
import FieldValue from '../service/db/value';
import { deleteCollection } from '../service/db/helper';

/* Utility */
import AppError from '../utils/appError';

class Appointment {
  static async create({ doctorName, description, capacity }) {
    const data = {
      doctorName,
      description,
      capacity,
      totalRegistered: 0,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };

    const aid = db.collection('appointments').doc().id;

    // Add new appointment to database
    await db
      .collection('appointments')
      .doc(aid)
      .set(data)
      .catch((err) => {
        throw AppError.BadGateway(err.message);
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
        throw AppError.BadGateway(err.message);
      });

    if (appointments.empty) {
      throw AppError.NotFound('No appointments available now.');
    }

    const data = [];
    appointments.forEach((doc) => {
      data.push({ aid: doc.id, ...doc.data() });
    });

    return data;
  }

  static async update({ aid, doctorName, description, capacity }) {
    const data = {
      doctorName,
      description,
      capacity,
      updatedAt: FieldValue.serverTimestamp(),
    };

    const appointmentRef = db.collection('appointments').doc(aid);

    const appointment = await appointmentRef.get().catch((err) => {
      throw AppError.BadGateway(err.message);
    });

    const appointmentData = appointment.data();

    if (capacity < appointmentData.totalRegistered) {
      throw AppError.BadRequest(
        'Tidak dapat mengubah kapasitas, jumlah kapasitas tidak boleh lebih kecil dari ' +
          'jumlah pasien yang terdaftar saat ini. Saat ini sudah ada ' +
          `${appointmentData.totalRegistered} orang yang terdaftar pada ${aid}.`
      );
    }

    await appointmentRef.update(data).catch((err) => {
      throw AppError.BadGateway(err.message);
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
      throw AppError.BadGateway(err.message);
    });

    // Remove appointment references from user data
    registrantsData.forEach((doc) => {
      const user = doc.data();
      user.ref.update({ appointments: FieldValue.arrayRemove(doc) }).catch((err) => {
        throw AppError.BadGateway(err.message);
      });
    });

    // Delete appointment document
    await db
      .doc(APPOINTMENT_PATH)
      .delete()
      .catch((err) => {
        throw AppError.BadGateway(err.message);
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
        throw AppError.BadGateway(err.message);
      });

    registrants.forEach((doc) => {
      data.push({ uid: doc.id, ...doc.data() });
    });

    return data;
  }

  static async apply({ uid, aid }) {
    const data = {
      ref: db.doc(`roles/patient/users/${uid}`),
      registeredAt: FieldValue.serverTimestamp(),
    };

    // Get data of total capacity and total number of registered patient
    const appointmentRef = db.collection('appointments').doc(aid);
    const appointment = await appointmentRef.get().catch((err) => {
      throw AppError.BadGateway(err.message);
    });

    const { totalRegistered, capacity } = appointment.data();

    // Reject request if the capacity is already full
    if (totalRegistered === capacity) {
      throw AppError.BadRequest('Failed to register. This appointment capacity is already full.');
    }

    // Add new user to registrants collection
    const registrantsRef = db.collection(`appointments/${aid}/registrants`);
    const addUser = registrantsRef.doc(uid).set(data);

    // Add new appointment to user list of appointments
    const userRef = db.doc(`roles/patient/users/${uid}`);
    const updateData = { appointments: FieldValue.arrayUnion(registrantsRef.doc(uid)) };
    const updateUser = userRef.update(updateData);

    // Update number of registered user value
    const registered = { totalRegistered: FieldValue.increment(1) };
    const incrementCounter = appointmentRef.update(registered);

    const operations = [addUser, updateUser, incrementCounter];
    await Promise.all(operations).catch((err) => {
      throw AppError.BadGateway(err.message);
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

    // Update number of registered user value
    const appointmentRef = db.doc(APPOINTMENT_PATH);
    const registered = { totalRegistered: FieldValue.increment(-1) };
    const decrementCounter = appointmentRef.update(registered);

    // Update user appointment list
    const userRef = db.doc(USER_PATH);
    const updateData = { appointments: FieldValue.arrayRemove(appointmentRef) };
    const updateUser = userRef.update(updateData);

    const operations = [deleteRegistrant, updateUser, decrementCounter];
    await Promise.all(operations).catch((err) => {
      throw AppError.BadGateway(err.message);
    });

    return aid;
  }
}

export default Appointment;
