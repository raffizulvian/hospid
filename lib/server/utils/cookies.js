import { serialize } from 'cookie';

const fifteenMinutes = 15 * 60;
const oneMonth = 4 * 7 * 24 * 60 * 60;

const multipleCookie = (args) => {
  const { key1, val1, opt1, key2, val2, opt2 } = args;
  const cookies = [];

  cookies.push(serialize(key1, val1, opt1));
  cookies.push(serialize(key2, val2, opt2));

  return cookies;
};

const setToken = (val1, val2) => {
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

  const args = {
    key1: 'token',
    val1: val1,
    opt1: accessOptions,
    key2: 'RFSTKN',
    val2: val2,
    opt2: refreshOptions,
  };

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

  const args = {
    key1: 'token',
    val1: ' ',
    opt1: accessOptions,
    key2: 'RFSTKN',
    val2: ' ',
    opt2: refreshOptions,
  };

  return multipleCookie(args);
};

export { multipleCookie, setToken, clearToken };
