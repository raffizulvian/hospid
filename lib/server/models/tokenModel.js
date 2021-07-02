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
  static async refresh({ token }) {
    const operation = [verifyRefreshToken(token), revokeRefreshToken(token)];
    const [data] = await Promise.all(operation).catch((err) => {
      throw new AppError(err.message, err.code);
    });

    const { name, username, role } = data;

    const claims = {
      name,
      username,
      role,
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
