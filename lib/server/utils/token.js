import { multipleCookie } from './cookies';

import AppError from './appError';

const fifteenMinutes = 15 * 60;
const oneMonth = 4 * 7 * 24 * 60 * 60;

const setAccessOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV !== 'development',
  sameSite: 'strict',
  maxAge: fifteenMinutes,
  path: '/',
};

const setRefreshOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV !== 'development',
  sameSite: 'strict',
  maxAge: oneMonth,
  path: '/',
};

const clearAccessOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV !== 'development',
  sameSite: 'strict',
  expires: new Date(1),
  path: '/',
};

const clearRefreshOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV !== 'development',
  sameSite: 'strict',
  expires: new Date(1),
  path: '/',
};

const setToken = (accessToken, refreshToken) => {
  if (typeof accessToken !== 'string' || typeof refreshToken !== 'string') {
    throw AppError.BadRequest('Invalid value passed. Value can not be undefined.');
  }

  const args = [
    { key: 'token', val: accessToken, opt: setAccessOptions },
    { key: 'RFSTKN', val: refreshToken, opt: setRefreshOptions },
  ];

  return multipleCookie(args);
};

const clearToken = () => {
  const args = [
    { key: 'token', val: ' ', opt: clearAccessOptions },
    { key: 'RFSTKN', val: ' ', opt: clearRefreshOptions },
  ];

  return multipleCookie(args);
};

export {
  setToken,
  clearToken,
  fifteenMinutes,
  oneMonth,
  setAccessOptions,
  setRefreshOptions,
  clearAccessOptions,
  clearRefreshOptions,
};
