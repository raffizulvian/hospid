import { serialize } from 'cookie';

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

// eslint-disable-next-line import/prefer-default-export
export { multipleCookie };
