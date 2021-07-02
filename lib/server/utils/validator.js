/* EXTERNAL */
import is from '@sindresorhus/is';

/* INTERNAL */
import AppError from './appError';

/* type checker */
const type = {
  firstName: [is.string, is.nonEmptyString],
  lastName: [is.string, is.nonEmptyString],
  age: [is.integer, is.numericString],
  email: [is.string, is.nonEmptyString, is.urlString],
  username: [is.string, is.nonEmptyString],
  password: [is.string, is.nonEmptyString],
  role: [is.string, is.nonEmptyString],
  uid: [is.string, is.nonEmptyString],
};

/* field validator */
const validateEmail = (email) => {
  const re = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  return re.test(email);
};

const validateRole = (role) => {
  const acceptedRole = ['admin', 'patient'];
  return acceptedRole.includes(role);
};

/* model validator */
const validateSignup = async (args) => {
  const output = new Promise((resolve, reject) => {
    const isEmailValid = validateEmail(args.email);
    if (!isEmailValid) {
      throw AppError.BadRequest();
    }

    Object.keys(type).forEach((field) => {
      const isValid = is.all(type[field], args[field]);
      if (!isValid) {
        reject(AppError.BadRequest());
      }
    });

    resolve(true);
  });

  return output;
};

const validateLogin = async (args) => {
  const output = new Promise((resolve, reject) => {
    const isRoleValid = validateRole(args.role);
    if (!isRoleValid) {
      reject(AppError.BadRequest());
    }

    Object.keys(args).forEach((field) => {
      const isValid = is.all(type[field], args[field]);
      if (!isValid) {
        reject(AppError.BadRequest());
      }
    });

    resolve(true);
  });

  return output;
};

const validateLogout = async (args) => {
  const output = new Promise((resolve, reject) => {
    Object.keys(args).forEach((field) => {
      const isValid = is.all(type[field], args[field]);
      if (!isValid) {
        reject(AppError.BadRequest());
      }
    });

    resolve(true);
  });

  return output;
};

const validator = (args, apiId) => {
  switch (apiId) {
    case 'signup':
      return validateSignup(args);

    case 'login':
      return validateLogin(args);

    case 'logout':
      return validateLogout(args);

    default:
      return false;
  }
};

export default validator;
