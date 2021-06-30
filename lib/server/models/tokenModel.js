import {
  signToken,
  registerRefreshToken,
  verifyRefreshToken,
  revokeRefreshToken,
} from '../service/auth';
import AppError from '../utils/appError';

class Token {
  static async refresh(token) {
    const data = await verifyRefreshToken(token).catch((err) => {
      throw new AppError(err.message, err.code);
    });

    await revokeRefreshToken(token).catch((err) => {
      throw new AppError(err.message, err.code);
    });

    const claims = {
      ...data,
      loginTime: new Date().toISOString(),
    };

    const newToken = signToken(claims);

    await registerRefreshToken(newToken, claims.username).catch((err) => {
      throw new AppError(err.message, err.code);
    });

    return newToken;
  }
}

export default Token;
