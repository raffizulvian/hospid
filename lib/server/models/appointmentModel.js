import db from '../service/db';
import { deleteCollection } from '../service/db/helper';
import FieldValue from '../service/db/value';
import AppError from '../utils/appError';

class AppointmentModel {
  constructor() {}

  static async create(doctor, desc, capacity) {
    // TODO: Implement input validation.

    const data = {
      capacity: capacity,
      description: desc,
      doctor_name: doctor,
      total_registered: 0,
      created_at: FieldValue.serverTimestamp(),
      updated_at: FieldValue.serverTimestamp(),
    };

    const id = db.collection('appointments').doc().id;

    await db
      .collection('appointments')
      .doc(id)
      .set(data)
      .catch((err) => {
        throw new AppError(err.message, 500);
      });

    return id;
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

    let data = [];
    appointments.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    return data;
  }

  static async update(id, doctor, desc, capacity) {
    // TODO: Implement input validation

    const data = {
      capacity: capacity,
      description: desc,
      doctor_name: doctor,
      updated_at: FieldValue.serverTimestamp(),
    };

    const appointmentRef = db.collection('appointments').doc(id);

    const appointment = await appointmentRef.get().catch((err) => {
      throw new AppError(err.message, 500);
    });

    const appointmentData = appointment.data();

    if (capacity < appointmentData.total_registered) {
      throw new AppError(
        `Tidak dapat mengubah kapasitas, jumlah kapasitas tidak boleh lebih kecil dari ` +
          `jumlah pasien yang terdaftar saat ini. Saat ini sudah ada ` +
          `${appointmentData.total_registered} orang yang terdaftar pada ${id}.`,
        400
      );
    }

    await appointmentRef.update(data).catch((err) => {
      throw new AppError(err.message, 500);
    });

    return id;
  }

  static async delete(id) {
    // TODO: Implement input validation

    const REGISTRANT_PATH = `appointments/${id}/registrants`;

    const registrantsData = await db.collection(REGISTRANT_PATH).get();
    registrantsData.forEach(async (doc) => {
      // Remove appointment references from user data
      await doc.data().ref.update({
        appointments: FieldValue.arrayRemove(doc),
      });
    });

    // Remove all registrants in appointment list
    await deleteCollection(REGISTRANT_PATH, 8).catch((err) => {
      throw new AppError(err.message, 500);
    });

    // Delete appointment document
    await db
      .collection('appointments')
      .doc(id)
      .delete()
      .catch((err) => {
        throw new AppError(err.message, 500);
      });

    return id;
  }

  static async getRegistrants(id) {
    let data = [];

    const registrants = await db
      .collection('appointments')
      .doc(id)
      .collection('registrants')
      .get()
      .catch((err) => {
        throw new AppError(err.message, 500);
      });

    registrants.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    return data;
  }

  static async apply(uid, username, aid) {
    // TODO: Implement input validation

    const data = {
      username: username,
      ref: db.doc(`roles/patient/users/${uid}`),
      created_at: FieldValue.serverTimestamp(),
    };

    // Get data of total capacity and this time number of registered patient
    const appointmentRef = db.collection('appointments').doc(aid);
    const appointment = await appointmentRef.get().catch((err) => {
      throw new AppError(err.message, 500);
    });

    const { total_registered, capacity } = appointment.data();

    // Rejejct request if the capacity is already full
    if (total_registered === capacity) {
      throw new AppError('Tidak bisa mendaftar, jumlah pendaftar sudah memenuhi kapasitas', 400);
    }

    // Add new user to registrants collection
    const registrantsRef = db.collection(`appointments/${aid}/registrants`);
    const registrantId = registrantsRef.doc().id;
    await registrantsRef
      .doc(registrantId)
      .set(data)
      .catch((err) => {
        throw new AppError(err.message, 500);
      });

    // Add new appointment to user list of appointments
    const userRef = db.doc(`roles/patient/users/${uid}`);
    await userRef
      .update({
        appointments: FieldValue.arrayUnion(registrantsRef.doc(registrantId)),
      })
      .catch((err) => {
        throw new AppError(err.message, 500);
      });

    // Update number of registered user value
    const registered = { total_registered: FieldValue.increment(1) };
    await appointmentRef.update(registered).catch((err) => {
      throw new AppError(err.message, 500);
    });

    return registrantId;
  }

  static cancel() {} // TODO: Implement cancel specified appointment
}

export default AppointmentModel;
