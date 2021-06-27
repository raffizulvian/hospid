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

  static update() {} // TODO: Implement update appointment data

  static delete() {} // TODO: Implement delete specified appointment

  static getRegistrants() {} // TODO: Implement get all registers

  static apply() {} // TODO: Implement apply for existing appointment

  static cancel() {} // TODO: Implement cancel specified appointment
}

export default AppointmentModel;
