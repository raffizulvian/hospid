/* EXTERNAL */
import bcrypt from 'bcryptjs';

/* INTERNAL */
import AppError from './appError';

const SALT_ROUNDS = 8;

const hash = (data = []) => {
  const encodedList = [];

  data.forEach((field) => {
    if (typeof field !== 'string' && typeof field !== 'number') {
      throw new AppError('Data type not supported. Only accept string or number', 400);
    }

    let s = field;
    if (typeof field === 'number') {
      s = String(field);
    }

    const encoded = bcrypt.hash(s, SALT_ROUNDS);
    encodedList.push(encoded);
  });

  return Promise.all(encodedList);
};

const compare = (data = [], hashes = []) => {
  const isDataEqual = [];

  data.forEach((field, index) => {
    if (typeof field !== 'string' && typeof field !== 'number') {
      throw new AppError('Data type not supported. Only accept string or number', 400);
    }

    if (typeof hashes[index] !== 'string' && typeof hashes[index] !== 'number') {
      throw new AppError('Data type not supported. Only accept string or number', 400);
    }

    let s = field;
    if (typeof field === 'number') {
      s = String(field);
    }

    const isEqual = bcrypt.compare(s, hashes[index]);
    isDataEqual.push(isEqual);
  });

  return Promise.all(isDataEqual);
};

export { hash, compare };
