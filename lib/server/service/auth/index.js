/* EXTERNAL */
import jwt from 'jsonwebtoken';

/* INTERNAL */
import { jwtOptions } from './options';
import cache from '../cache';
import AppError from '../../utils/appError';
import { oneMonth } from '../../utils/token';

const signToken = (claim) => {
  const accessOptions = {
    issuer: 'HIS',
    subject: claim.uid,
    audience: claim.name,
    expiresIn: '15m',
  };
  const accessToken = jwt.sign(claim, process.env.ACCESS_TOKEN_SECRET, accessOptions);

  const refreshOptions = {
    issuer: 'HIS',
    subject: claim.uid,
    audience: claim.name,
    expiresIn: '4w',
  };
  const refreshToken = jwt.sign(claim, process.env.REFRESH_TOKEN_SECRET, refreshOptions);

  return { accessToken, refreshToken };
};

const registerRefreshToken = async (token, uid) => {
  const registerStatus = await cache.set(uid, token, 'EX', oneMonth);

  return registerStatus;
};

const verifyAccessToken = (accessToken) => {
  let error = false;

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, jwtOptions, (err, decoded) => {
    if (err) {
      error = true;
      return;
    }

    const now = Math.round(new Date().getTime() / 1000);
    if (decoded.exp < now) {
      error = true;
    }
  });

  return error;
};

const verifyRefreshToken = async (refreshToken) => {
  let data;

  // Verify content of refreshToken
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, jwtOptions, (err, decoded) => {
    if (err) {
      throw AppError.Unauthorized('Invalid token.');
    }

    data = decoded;
  });

  // Check if refreshToken registered
  const storedToken = await cache.get(data.uid);

  if (storedToken === null) {
    throw AppError.Unauthorized('Invalid token. Not registered at server.');
  }

  if (storedToken !== refreshToken) {
    throw AppError.Unauthorized('Invalid token. Different token registered.');
  }

  const now = Math.round(new Date().getTime() / 1000);
  if (data.exp < now) {
    throw AppError.Unauthorized('Invalid token. Token already expired.');
  }

  return data;
};

const revokeRefreshToken = async (uid, token) => {
  const storedToken = await cache.get(uid);
  if (token !== storedToken) {
    throw AppError.Unauthorized('Invalid token. Different token registered.');
  }

  const revokeStatus = await cache.del(uid);

  return revokeStatus;
};

export {
  signToken,
  registerRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  revokeRefreshToken,
};
