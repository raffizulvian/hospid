/* Service */
import {
  signToken,
  registerRefreshToken,
  verifyRefreshToken,
  revokeRefreshToken,
} from '../service/auth';

/* Utility */
import AppError from '../utils/appError';

class Token {
  static async create({ claims }) {
    const token = signToken(claims);
    await registerRefreshToken(token.refreshToken, claims.uid).catch((err) => {
      throw new AppError(err.message, err.code);
    });

    return token;
  }

  static async refresh({ uid, token }) {
    const operation = [verifyRefreshToken(token), revokeRefreshToken(uid, token)];
    const [data] = await Promise.all(operation).catch((err) => {
      throw new AppError(err.message, err.code);
    });

    const { name, role } = data;

    const claims = {
      name,
      uid,
      role,
      loginTime: new Date().toISOString(),
    };

    const newToken = signToken(claims);

    await registerRefreshToken(newToken, claims.uid).catch((err) => {
      throw new AppError(err.message, err.code);
    });

    return newToken;
  }

  static async revoke({ uid, token }) {
    await revokeRefreshToken(uid, token).catch((err) => {
      throw new AppError(err.message, err.code);
    });

    return token;
  }
}

export default Token;
