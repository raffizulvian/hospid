import { decode } from 'jsonwebtoken';

const getuid = (token) => {
  const { uid } = decode(token, { json: true });
  return uid;
};

const getUser = (token) => {
  const user = decode(token, { json: true });
  return user;
};

export { getuid, getUser };
