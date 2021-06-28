import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 8;

const hash = (data = []) => {
  let encodedList = [];

  data.forEach((string) => {
    const encoded = bcrypt.hashSync(string, SALT_ROUNDS);
    encodedList.push(encoded);
  });

  return encodedList;
};

const compare = (data = [], hash = []) => {
  const isDataEqual = [];

  data.forEach((string, _index) => {
    const isEqual = bcrypt.compareSync(string, hash[_index]);
    isDataEqual.push(isEqual);
  });

  return isDataEqual;
};

export { hash, compare };
