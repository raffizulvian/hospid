import { hash, compare } from '../encrypt';

describe('encrypt utils', () => {
  describe('hash', () => {
    const data = ['Bambang Sukojo', 5, 'Coblong'];

    it('should support string or number data type', async () => {
      const encrypted = await hash(data);

      expect(encrypted).toBeInstanceOf(Array);
      expect(encrypted).toHaveLength(3);
    });

    it('should create array of ecrypted arguments', async () => {
      const encrypted = await hash(data);

      encrypted.forEach((encr, index) => {
        expect(typeof encr).toBe('string');
        expect(encr).not.toEqual(data[index]);
      });
    });

    it('should throw error if data provided is not supported', async () => {
      const wrongData = ['Bambang Sukojo', { anak: 5 }, undefined];

      const encrypt = hash(wrongData);

      await expect(encrypt).rejects.toHaveProperty('code');
      await expect(encrypt).rejects.toHaveProperty('message');

      await expect(encrypt).rejects.toMatchObject({ code: 400 });
    });
  });

  describe('compare', () => {
    const input = ['Bambang Sukojo', 5, 'Coblong'];
    let hashData;

    beforeEach(async () => {
      hashData = await hash(input);
    });

    afterEach(() => {
      hashData = [];
    });

    it('should support string or number data type', async () => {
      const isValid = await compare(input, hashData);

      expect(isValid).toBeInstanceOf(Array);
      expect(isValid).toHaveLength(3);
    });

    it('should create array with every element is true', async () => {
      const isValid = await compare(input, hashData);
      const expected = [true, true, true];

      expect(isValid).toEqual(expected);
    });

    it('should create array with some element is false', async () => {
      const falseInput = ['Bambang Sukojo', 5, 'Oblong'];
      const expected = [true, true, false];

      const isValid = await compare(falseInput, hashData);

      expect(isValid).toEqual(expected);
    });

    it('should throw error if data provided is not supported', async () => {
      const wrongData = ['Bambang Sukojo', { anak: 5 }, 'Oblong'];

      const compared = compare(wrongData, hashData);

      await expect(compared).rejects.toHaveProperty('code');
      await expect(compared).rejects.toHaveProperty('message');

      await expect(compared).rejects.toMatchObject({ code: 400 });
    });

    it('should throw error if hash provided is not supported', async () => {
      const wrongHash = [90, { anak: 5 }, 'Oblong'];

      const compared = compare(input, wrongHash);

      await expect(compared).rejects.toHaveProperty('code');
      await expect(compared).rejects.toHaveProperty('message');

      await expect(compared).rejects.toMatchObject({ code: 400 });
    });
  });
});
