/* Service */
import db from '../service/db';
import FieldValue from '../service/db/value';
import { registerRefreshToken, revokeRefreshToken, signToken } from '../service/auth';

/* Utility */
import AppError from '../utils/appError';
import { hash, compare } from '../utils/encrypt';

class User {
  static async signup({ firstName, lastName, age, email, username, password }) {
    // Data hashing
    const encoded = hash([password, email]);

    const userRef = db.collection('roles/patient/users');

    // Query user database and check if ther already someone use same email or username
    const sameEmail = userRef.where('email', '==', email).get();
    const sameUsername = userRef.where('username', '==', username).get();

    const fieldToCheck = [sameEmail, sameUsername];
    const [sameEmailResult, sameUsernameResult] = await Promise.all(fieldToCheck).catch((err) => {
      throw new AppError(err.message, 500);
    });

    if (!sameEmailResult.empty) {
      throw new AppError('Email yang anda masukkan sudah terdaftar pada akun lain.', 400);
    }

    if (!sameUsernameResult.empty) {
      throw new AppError('Username yang anda masukkan tidak tersedia.', 400);
    }

    // Get resolved hashing data
    const [encodedPassword, encodedEmail] = await encoded.catch((err) => {
      throw new AppError(err.message, err.code);
    });

    const data = {
      age,
      username,
      first_name: firstName,
      last_name: lastName,
      email: encodedEmail,
      password: encodedPassword,
      created_at: FieldValue.serverTimestamp(),
    };

    // Create new user data
    await userRef
      .doc(username)
      .set(data)
      .catch((err) => {
        throw new AppError(err.message, 500);
      });

    const responseData = {
      username,
      firstName,
      lastName,
      age,
      role: 'patient',
      createdAt: new Date().toISOString,
    };

    return responseData;
  }

  static async login({ username, password, role }) {
    const userRef = db.collection(`roles/${role}/users`);

    // Check if user submit existing username
    const user = await userRef
      .doc(username)
      .get()
      .catch((err) => {
        throw new AppError(err.message, 500);
      });

    if (!user.exists) {
      throw new AppError('Username atau password yang Anda masukkan salah', 400);
    }

    // Validate user input password with password from database
    const userPassword = user.data().password;
    const [isPasswordValid] = await compare([password], [userPassword]);

    if (!isPasswordValid) {
      throw new AppError('Username atau password yang Anda masukkan salah', 400);
    }

    const responseData = {
      name: `${user.data().first_name} ${user.data().last_name}`,
      username,
      role,
      loginTime: new Date().toISOString(),
    };

    const token = signToken(responseData);
    await registerRefreshToken(token.refreshToken, username).catch((err) => {
      throw new AppError(err.message, err.code);
    });

    const response = {
      data: responseData,
      token,
    };

    return response;
  }

  static async logout({ uid, token }) {
    await revokeRefreshToken(uid, token).catch((err) => {
      throw new AppError(err.message, err.code);
    });

    return uid;
  }

  static async get({ uid }) {
    const user = await db
      .doc(`roles/patient/users/${uid}`)
      .get()
      .catch((err) => {
        throw new AppError(err.message, 500);
      });

    const userData = user.data();
    const userAppointments = userData.appointments;

    const userAppointmentsData = [];
    userAppointments.forEach((appointment) => {
      userAppointmentsData.push(appointment.get());
    });

    const appointments = await Promise.all(userAppointmentsData).catch((err) => {
      throw new AppError(err.message, 500);
    });

    appointments.forEach(function cb(appointment, index) {
      this[index] = appointment.data();
    }, appointments);

    const data = {
      ...userData,
      appointments,
    };

    return data;
  }
}

export default User;
