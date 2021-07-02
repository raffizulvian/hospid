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

const validateRole = (role) => {
  const acceptedRole = ['admin', 'patient'];
  return acceptedRole.includes(role);
};

/* model validator */
const validate = async (args) => {
  const output = new Promise((resolve, reject) => {
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

const validator = (args, apiId, method) => {
  switch (apiId) {
    case 'users_signup': {
      const isEmailValid = validateEmail(args.email);

      if (!isEmailValid) {
        throw AppError.BadRequest();
      }

      return validate(args);
    }

    case 'users_login': {
      const isRoleValid = validateRole(args.role);

      if (!isRoleValid) {
        throw AppError.BadRequest();
      }

      return validate(args);
    }

    case 'users_logout':
      return validate(args);

    case 'users_get':
      return validate(args);

    case 'appointment_create':
      if (method === 'GET') {
        return true;
      }
      return validate(args);

    case 'appointment_update_delete_apply':
      return validate(args);

    default:
      return false;
  }
};

export default validator;
