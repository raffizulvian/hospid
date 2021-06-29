import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 8;

const hash = (data = []) => {
  const encodedList = [];

  data.forEach((string) => {
    const encoded = bcrypt.hashSync(string, SALT_ROUNDS);
    encodedList.push(encoded);
  });

  return encodedList;
};

const compare = (data = [], hashes = []) => {
  const isDataEqual = [];

  data.forEach((string, index) => {
    const isEqual = bcrypt.compareSync(string, hashes[index]);
    isDataEqual.push(isEqual);
  });

  return isDataEqual;
};

export { hash, compare };
