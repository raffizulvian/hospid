import { multipleCookie, setToken, clearToken } from '../cookies';

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
      const args = [{ key: 'cookie1', val: 'value 1', opt: { maxAge: '1h' } }];

      const cookies = multipleCookie(args);

      expect(cookies).toBeInstanceOf(Array);
      expect(cookies).toHaveLength(1);
      expect(cookies[0]).toContain('maxAge');
    });

    it('should return throw error when value is undefined', () => {
      const args = [{ key: 'cookie1', val: undefined, opt: { maxAge: '1h' } }];

      expect(multipleCookie(args)).toThrow('Invalid value passed. Value can not be undefined.');
    });
  });

  describe('setToken', () => {
    it('should return array of two cookie with token', () => {
      const cookies = setToken('val1', 'val2');

      expect(cookies).toBeInstanceOf(Array);
      expect(cookies).toHaveLength(2);

      expect(cookies[0]).toContain('token=val1');
      expect(cookies[1]).toContain('RFSTKN=val2');

      expect(cookies[0]).toContain('Expires');
      expect(cookies[1]).toContain('Expires');

      expect(cookies[0]).toContain('HttpOnly');
      expect(cookies[1]).toContain('HttpOnly');
    });
  });

  describe('clearToken', () => {
    it('should return array of two expires cookie', () => {
      const cookies = clearToken();

      expect(cookies).toBeInstanceOf(Array);
      expect(cookies).toHaveLength(2);

      expect(cookies[0]).toContain('token= ');
      expect(cookies[1]).toContain('RFSTKN= ');

      expect(cookies[0]).toContain('Expires');
      expect(cookies[1]).toContain('Expires');
    });
  });
});