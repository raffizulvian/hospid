import jwt from 'jsonwebtoken';
import AppError from '../../utils/appError';

const jwtOptions = { algorithms: 'HS256', issuer: 'HIS' };

const fakeDB = { key: 'value' };

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
  fakeDB[token] = username;
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
      throw new AppError.Unauthorized();
    }

    // Check if refreshToken registered
    // TODO: Implement database later
    if (typeof fakeDB[refreshToken] !== 'undefined' || fakeDB[refreshToken] !== decoded.username) {
      throw new AppError.Unauthorized();
    }

    const now = Math.round(new Date().getTime() / 1000);
    if (decoded.exp < now) {
      throw new AppError.Unauthorized();
    }

    data = decoded;
  });

  return data;
};

const revokeRefreshToken = async (token) => {
  // TODO: Implement database later
  delete fakeDB[token];
};

export {
  signToken,
  registerRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  revokeRefreshToken,
};
