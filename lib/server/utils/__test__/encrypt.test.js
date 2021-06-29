import { hash, compare } from '../encrypt';

describe('encrypt utils', () => {
  describe('hash', () => {
    const data = ['Bambang Sukojo', 5, 'Coblong'];

    it('should support string or number data type', () => {
      const encrypted = hash(data);

      expect(encrypted).toBeInstanceOf(Array);
      expect(encrypted).toHaveLength(3);
    });

    it('should create array of ecrypted arguments', () => {
      const encrypted = hash(data);

      encrypted.forEach((encr, index) => {
        expect(typeof encr).toBe('string');
        expect(encr).not.toEqual(data[index]);
      });
    });

    it('should throw error if data provided is not supported', () => {
      const wrongData = ['Bambang Sukojo', { anak: 5 }, undefined];

      expect(() => hash(wrongData)).toThrow('Data type not supported. Only accept string or number');
    });
  });

  describe('compare', () => {
    const input = ['Bambang Sukojo', 5, 'Coblong'];
    let hashData;

    beforeEach(() => {
      hashData = hash(input);
    });

    afterEach(() => {
      hashData = [];
    });

    it('should support string or number data type', () => {
      const isValid = compare(input, hashData);

      expect(isValid).toBeInstanceOf(Array);
      expect(isValid).toHaveLength(3);
    });

    it('should create array with every element is true', () => {
      const isValid = compare(input, hashData);
      const expected = [true, true, true];

      expect(isValid).toEqual(expected);
    });

    it('should create array with some element is false', () => {
      const falseInput = ['Bambang Sukojo', 5, 'Oblong'];
      const expected = [true, true, false];

      const isValid = compare(falseInput, hashData);

      expect(isValid).toEqual(expected);
    });

    it('should throw error if data provided is not supported', () => {
      const wrongData = ['Bambang Sukojo', { anak: 5 }, 'Oblong'];

      expect(() => compare(wrongData, hashData)).toThrow('Data type not supported. Only accept string or number');
    });
  });
});
