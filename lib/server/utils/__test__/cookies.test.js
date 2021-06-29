import { multipleCookie } from '../cookies';

describe('cookies utils', () => {
  describe('multipleCookie', () => {
    it('should return array of cookies string with given parameters', () => {
      const args = [
        { key: 'cookie1', val: 'value 1', opt: {} },
        { key: 'cookie2', val: 'value 2', opt: {} },
        { key: 'cookie3', val: 'value 3', opt: {} },
      ];

      const cookies = multipleCookie(args);

      expect(cookies).toBeInstanceOf(Array);
      expect(cookies).toHaveLength(3);
    });

    it('should return array of cookies with maxAge 1h', () => {
      const args = [{ key: 'cookie1', val: 'value 1', opt: { maxAge: 3600 } }];

      const cookies = multipleCookie(args);

      expect(cookies).toBeInstanceOf(Array);
      expect(cookies).toHaveLength(1);
      expect(cookies[0]).toContain('Max-Age=3600');
    });

    it('should throw error when value is undefined', () => {
      const args = [{ key: 'cookie1', val: undefined, opt: { maxAge: 3600 } }];

      expect(() => multipleCookie(args)).toThrow('Invalid value passed. Value can not be undefined.');
    });
  });
});
