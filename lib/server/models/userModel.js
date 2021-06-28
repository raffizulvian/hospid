import db from '../service/db';
import FieldValue from '../service/db/value';
import AppError from '../utils/appError';

class User {
  constructor() {}

  static async signup(firstName, lastName, age, email, username, password) {
    // TODO: Implement input validation

    const data = {
      first_name: firstName,
      last_name: lastName,
      age: age,
      email: email,
      username: username,
      password: password,
      created_at: FieldValue.serverTimestamp(),
    };

    const userRef = db.collection('roles/patient/users');

    // Query user database and check if ther already someone use same username or email
    const sameUsernameEmail = await userRef
      .where('email', '!=', email)
      .where('username', '!=', username)
      .get()
      .catch((err) => {
        throw new AppError(err.message, 500);
      });

    if (!sameUsernameEmail.empty) {
      throw new AppError('Username atau Email yang anda masukkan sudah terdaftar pada akun lain.', 400);
    }

    // Add user data to user database
    await userRef
      .doc(username)
      .set(data)
      .catch((err) => {
        throw new AppError(err.message, 500);
      });

    return data;
  }

  static async login(username, password) {
    // TODO: Implement input validation

    const userRef = db.collection('roles/patient/users');

    const user = await userRef
      .where('username', '==', username)
      .where('password', '==', password)
      .get()
      .catch((err) => {
        throw new AppError(err.message, 500);
      });

    if (user.empty) {
      throw new AppError('Username atau password yang Anda masukkan salah.', 400);
    }

    const loginTime = new Date().toISOString();

    return loginTime;
  }

  static async get(uid) {
    // TODO: Implement input validation

    const user = await db
      .doc(`roles/patient/users/${uid}`)
      .get()
      .catch((err) => {
        throw new AppError(err.message, 500);
      });

    const userData = user.data();

    const userAppointments = userData.appointments;
    const userAppointmentsData = userAppointments.map(async (ref) => {
      const appointment = await ref.get().catch((err) => {
        throw new AppError(err.message, 500);
      });

      return appointment.data();
    });

    const data = {
      ...userData,
      appointments: userAppointmentsData,
    };

    return data;
  }
}

export default User;
