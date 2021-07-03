/* Service */
import db from '../service/db';
import FieldValue from '../service/db/value';

/* Utility */
import AppError from '../utils/appError';
import { hash, compare } from '../utils/encrypt';

class User {
  static async create({ firstName, lastName, age, email, uid, password }) {
    // Data hashing
    const encoded = hash([password, email]);

    const userRef = db.collection('roles/patient/users');

    // Query user database and check if ther already someone use same email or username
    const sameEmail = userRef.where('email', '==', email).get();
    const sameUsername = userRef.where('uid', '==', uid).get();

    const fieldToCheck = [sameEmail, sameUsername];
    const [sameEmailResult, sameUsernameResult] = await Promise.all(fieldToCheck).catch((err) => {
      throw AppError.BadGateway(err.message);
    });

    if (!sameEmailResult.empty) {
      throw AppError.BadRequest('This email is already registered to another account.');
    }

    if (!sameUsernameResult.empty) {
      throw AppError.BadRequest('This username is not available.');
    }

    // Get resolved hashing data
    const [encodedPassword, encodedEmail] = await encoded.catch((err) => {
      throw new AppError(err.message, err.code);
    });

    const data = {
      uid,
      firstName,
      lastName,
      age,
      email: encodedEmail,
      password: encodedPassword,
      appointments: [],
      createdAt: FieldValue.serverTimestamp(),
    };

    // Create new user data
    await userRef
      .doc(uid)
      .set(data)
      .catch((err) => {
        throw AppError.BadGateway(err.message);
      });

    const responseData = {
      uid,
      firstName,
      lastName,
      age,
      role: 'patient',
      createdAt: new Date().toISOString(),
    };

    return responseData;
  }

  static async login({ uid, password, role }) {
    const userRef = db.collection(`roles/${role}/users`);

    // Check if user submit existing username
    const user = await userRef
      .doc(uid)
      .get()
      .catch((err) => {
        throw AppError.BadGateway(err.message);
      });

    if (!user.exists) {
      throw AppError.NotFound('Username or password is wrong.');
    }

    // Validate user input password with password from database
    const userPassword = user.data().password;
    const [isPasswordValid] = await compare([password], [userPassword]).catch((err) => {
      throw new AppError(err.message, err.code);
    });

    if (!isPasswordValid) {
      throw AppError.BadRequest('Username or password is wrong.');
    }

    const response = {
      uid,
      name: `${user.data().firstName} ${user.data().lastName}`,
      role,
      loginTime: new Date().toISOString(),
    };

    return response;
  }

  static async get({ uid }) {
    const user = await db
      .doc(`roles/patient/users/${uid}`)
      .get()
      .catch((err) => {
        throw AppError.BadGateway(err.message);
      });

    const { firstName, lastName, age, createdAt, updatedAt } = user.data();

    const data = {
      uid,
      firstName,
      lastName,
      age,
      createdAt,
      updatedAt,
    };

    return data;
  }
}

export default User;
