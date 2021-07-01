/* EXTERNAL */
import jwt from 'jsonwebtoken';

/* INTERNAL */
import { jwtOptions } from './options';
import AppError from '../../utils/appError';

const fakeDB = { username: 'token' };

const signToken = (claim) => {
  const accessOptions = {
    issuer: 'HIS',
    subject: claim.username,
    audience: claim.name,
    expiresIn: '15m',
  };
  const accessToken = jwt.sign(claim, process.env.ACCESS_TOKEN_SECRET, accessOptions);

  const refreshOptions = {
    issuer: 'HIS',
    subject: claim.username,
    audience: claim.name,
    expiresIn: '4w',
  };
  const refreshToken = jwt.sign(claim, process.env.REFRESH_TOKEN_SECRET, refreshOptions);

  return { accessToken, refreshToken };
};

const registerRefreshToken = async (token, username) => {
  // TODO: Implement database later
  fakeDB[username] = token;

  return 'ok';
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
      throw AppError.Unauthorized();
    }

    // Check if refreshToken registered
    // TODO: Implement database later
    if (typeof fakeDB[decoded.username] === 'undefined') {
      throw AppError.Unauthorized();
    }

    if (fakeDB[decoded.username] !== refreshToken) {
      throw AppError.Unauthorized();
    }

    const now = Math.round(new Date().getTime() / 1000);
    if (decoded.exp < now) {
      throw AppError.Unauthorized();
    }

    data = decoded;
  });

  return data;
};

const revokeRefreshToken = async (username, token) => {
  // TODO: Implement database later
  if (token !== fakeDB[username]) {
    throw AppError.Unauthorized();
  }

  delete fakeDB[username];

  return 'ok';
};

export {
  signToken,
  registerRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  revokeRefreshToken,
};
