import db from '../service/db';
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

  static delete() {} // TODO: Implement delete specified appointment

  static getRegistrants() {} // TODO: Implement get all registers

  static apply() {} // TODO: Implement apply for existing appointment

  static cancel() {} // TODO: Implement cancel specified appointment
}

export default AppointmentModel;
