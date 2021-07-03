import AppError from '../appError';
import validator, { validateEmail } from '../validator';

describe('Validator Utility', () => {
  describe('validateEmail', () => {
    it('should return true given input bambang@email.com', () => {
      const isValid = validateEmail('bambang@email.com');

      expect(isValid).toBe(true);
    });

    it('should return false given input momon#email.co', () => {
      const isValid = validateEmail('momon#email.co');

      expect(isValid).toBe(false);
    });

    it('should return false given input ridwanemail.co', () => {
      const isValid = validateEmail('ridwanemail.co');

      expect(isValid).toBe(false);
    });

    it('should return false given input @asepemail.co', () => {
      const isValid = validateEmail('@asepemail.co');

      expect(isValid).toBe(false);
    });

    it('should return false given input meimei@emailco', () => {
      const isValid = validateEmail('meimei@emailco');

      expect(isValid).toBe(false);
    });

    it('should return false given input yos@email.*', () => {
      const isValid = validateEmail('yos@email.*');

      expect(isValid).toBe(false);
    });
  });

  describe('validator', () => {
    describe('Users Signup', () => {
      it('should return true for valid signup args', async () => {
        const args = {
          email: 'bambang@email.com',
          uid: 'bambang',
          firstName: 'Bambang',
          lastName: 'Sukojo',
          age: 24,
          password: 'bambangunyu',
        };

        const isValid = validator(args, 'users_signup', 'POST');

        await expect(isValid).resolves.toBe(true);
      });

      it('should throw error with status code 400 for invalid email', async () => {
        const args = {
          email: 'bambang%email.com',
          uid: 'bambang',
          firstName: 'Bambang',
          lastName: 'Sukojo',
          age: 24,
          password: 'bambangunyu',
        };

        const isValid = validator(args, 'users_signup', 'POST');

        await expect(isValid).rejects.toMatchObject(AppError.BadRequest());
      });

      it('should throw error with status code 400 for invalid field type', async () => {
        const args = {
          email: 'bambang%email.com',
          uid: 24,
          firstName: 'Bambang',
          lastName: 'Sukojo',
          age: '16',
          password: 1234,
        };

        const isValid = validator(args, 'users_signup', 'POST');

        await expect(isValid).rejects.toMatchObject(AppError.BadRequest());
      });
    });

    describe('Create Appointments', () => {
      it('should return true for valid create args', async () => {
        const args = {
          doctor: 'Mydylo Mynycolysto',
          description: 'Ini deskripsi yang benar',
          capacity: 8,
        };

        const isValid = validator(args, 'appointment_create', 'POST');

        await expect(isValid).resolves.toBe(true);
      });

      it('should throw error with status code 400 for invalid field type', async () => {
        const args = {
          doctor: 'Mydylo Mynycolysto',
          description: 444444,
          capacity: '8',
        };

        const isValid = validator(args, 'appointment_create', 'POST');

        await expect(isValid).rejects.toMatchObject(AppError.BadRequest());
      });

      it('should return true for GET method', async () => {
        const args = {};

        const isValid = validator(args, 'appointment_create', 'GET');

        await expect(isValid).resolves.toBe(true);
      });
    });

    describe('Other API', () => {
      it('should return true if field type match', async () => {
        const args = {
          uid: 'qwert',
          firstName: 'Qwerda',
          lastName: 'Tiara',
          age: 12,
          email: 'cole@yeehaw.co.id',
          password: 'qwerty1234',
          role: 'admin',
          aid: 'dtdheh3735bgr7',
          doctor: 'Strange',
          description: 'Sebuah pengobatan yang memiliki banyak khasiat',
          capacity: 4,
        };

        const isValid = validator(args, '', 'POST');

        await expect(isValid).resolves.toBe(true);
      });

      it('should return throw error if field type did not match', async () => {
        const args = {
          uid: 'qwert',
          firstName: 'Qwerda',
          lastName: 'Tiara',
          age: '12',
          email: '',
          password: 'qwerty1234',
          role: 'admin',
          aid: 'dtdheh3735bgr7',
          doctor: 'Strange',
          description: 'Sebuah pengobatan yang memiliki banyak khasiat',
          capacity: '4',
        };

        const isValid = validator(args, '', 'POST');

        await expect(isValid).rejects.toMatchObject(AppError.BadRequest());
      });
    });
  });
});
