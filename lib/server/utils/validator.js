/* EXTERNAL */
import is from '@sindresorhus/is';

/* INTERNAL */
import AppError from './appError';

/* type checker */
const type = {
  uid: [is.string, is.nonEmptyString],
  firstName: [is.string, is.nonEmptyString],
  lastName: [is.string, is.nonEmptyString],
  age: [is.integer, is.numericString],
  email: [is.string, is.nonEmptyString, is.urlString],
  password: [is.string, is.nonEmptyString],
  role: [is.string, is.nonEmptyString],
  aid: [is.string, is.nonEmptyString],
  doctor: [is.string, is.nonEmptyString],
  description: [is.string, is.nonEmptyString],
  capacity: [is.integer],
};

/* field validator */
const validateEmail = (email) => {
  const re = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  return re.test(email);
};

/* model validator */
const validate = (args, resolve) => {
  Object.keys(args).forEach((field) => {
    const isValid = is.any(type[field], args[field]);
    if (!isValid) {
      const m = `${field} not follow requested format. Please input data with valid format.`;
      throw AppError.BadRequest(m);
    }
  });

  resolve(true);
};

const validator = (args, apiId, method) => {
  switch (apiId) {
    case 'users_signup':
      return new Promise((resolve, reject) => {
        const isEmailValid = validateEmail(args.email);

        if (!isEmailValid) {
          const m = 'Email is not valid. Please re-submit valid email.';
          reject(AppError.BadRequest(m));
        }

        validate(args, resolve).catch(reject);
      });

    case 'appointment_create':
      return new Promise((resolve, reject) => {
        if (method === 'GET') {
          resolve(true);
        }

        validate(args, resolve).catch(reject);
      });

    default:
      return new Promise((resolve, reject) => {
        validate(args, resolve).catch(reject);
      });
  }
};

export { validateEmail };
export default validator;
