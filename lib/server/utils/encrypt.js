import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 8;

const hash = (data = []) => {
  const encodedList = [];

  data.forEach((field) => {
    if (typeof field !== 'string' && typeof field !== 'number') {
      throw new Error('Data type not supported. Only accept string or number');
    }

    let s = field;
    if (typeof field === 'number') {
      s = String(field);
    }

    const encoded = bcrypt.hashSync(s, SALT_ROUNDS);
    encodedList.push(encoded);
  });

  return encodedList;
};

const compare = (data = [], hashes = []) => {
  const isDataEqual = [];

  data.forEach((field, index) => {
    if (typeof field !== 'string' && typeof field !== 'number') {
      throw new Error('Data type not supported. Only accept string or number');
    }

    if (typeof hashes[index] !== 'string' && typeof hashes[index] !== 'number') {
      throw new Error('Data type not supported. Only accept string or number');
    }

    let s = field;
    if (typeof field === 'number') {
      s = String(field);
    }

    const isEqual = bcrypt.compareSync(s, hashes[index]);
    isDataEqual.push(isEqual);
  });

  return isDataEqual;
};

export { hash, compare };
