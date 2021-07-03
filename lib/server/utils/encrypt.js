/* EXTERNAL */
import bcrypt from 'bcryptjs';

/* INTERNAL */
import AppError from './appError';

const SALT_ROUNDS = 8;

const hash = async (data = []) => {
  const encodedList = [];

  data.forEach((field) => {
    if (typeof field !== 'string' && typeof field !== 'number') {
      throw AppError.BadRequest('Data type not supported. Only accept string or number.');
    }

    const s = String(field);

    const encoded = bcrypt.hash(s, SALT_ROUNDS).catch(() => {
      throw AppError.InternalServerError('Failed to hash data.');
    });

    encodedList.push(encoded);
  });

  return Promise.all(encodedList);
};

const compare = async (data = [], hashes = []) => {
  const isDataEqual = [];

  data.forEach((field, index) => {
    if (typeof field !== 'string' && typeof field !== 'number') {
      throw AppError.BadRequest(`${field} data type not supported. Only accept string or number.`);
    }

    if (typeof hashes[index] !== 'string' && typeof hashes[index] !== 'number') {
      throw AppError.BadRequest(`${field} data type not supported. Only accept string or number.`);
    }

    const s = String(field);
    const h = String(hashes[index]);

    const isEqual = bcrypt.compare(s, h).catch(() => {
      throw AppError.InternalServerError('Failed to compare hased data');
    });

    isDataEqual.push(isEqual);
  });

  return Promise.all(isDataEqual);
};

export { hash, compare };
