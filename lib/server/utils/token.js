import { multipleCookie } from './cookies';

const fifteenMinutes = 15 * 60;
const oneMonth = 4 * 7 * 24 * 60 * 60;

const setToken = (accessToken, refreshToken) => {
  if (typeof accessToken !== 'string' || typeof refreshToken !== 'string') {
    throw new Error('Invalid value passed. Value can not be undefined.');
  }

  const accessOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: fifteenMinutes,
    path: '/',
  };

  const refreshOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: oneMonth,
    path: '/',
  };

  const args = [
    { key: 'token', val: accessToken, opt: accessOptions },
    { key: 'RFSTKN', val: refreshToken, opt: refreshOptions },
  ];

  return multipleCookie(args);
};

const clearToken = () => {
  const accessOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    expires: new Date(1),
    path: '/',
  };

  const refreshOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    expires: new Date(1),
    path: '/',
  };

  const args = [
    { key: 'token', val: ' ', opt: accessOptions },
    { key: 'RFSTKN', val: ' ', opt: refreshOptions },
  ];

  return multipleCookie(args);
};

export { setToken, clearToken, fifteenMinutes, oneMonth };
