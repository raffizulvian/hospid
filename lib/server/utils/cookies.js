import { serialize } from 'cookie';

const fifteenMinutes = 15 * 60;
const oneMonth = 4 * 7 * 24 * 60 * 60;

const multipleCookie = (args) => {
  const cookies = [];

  args.forEach((arg) => {
    const { key, val, opt } = arg;

    if (typeof key !== 'string' || typeof val !== 'string') {
      throw new Error('Invalid value passed. Value can not be undefined.');
    }

    cookies.push(serialize(key, val, opt));
  });

  return cookies;
};

const setToken = (val1, val2) => {
  if (typeof val1 !== 'string' || typeof val2 !== 'string') {
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
    { key: 'token', val: val1, opt: accessOptions },
    { key: 'RFSTKN', val: val2, opt: refreshOptions },
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

export { multipleCookie, setToken, clearToken };
