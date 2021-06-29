import { setToken, clearToken } from '../token';

describe('Token utility', () => {
  describe('setToken', () => {
    it('should return array of two cookie with token', () => {
      const cookies = setToken('val1', 'val2');

      expect(cookies).toBeInstanceOf(Array);
      expect(cookies).toHaveLength(2);

      expect(cookies[0]).toContain('token=val1');
      expect(cookies[1]).toContain('RFSTKN=val2');

      expect(cookies[0]).toContain('Max-Age=900');
      expect(cookies[1]).toContain('Max-Age=2419200');

      expect(cookies[0]).toContain('HttpOnly');
      expect(cookies[1]).toContain('HttpOnly');

      expect(cookies[0]).toContain('SameSite=Strict');
      expect(cookies[1]).toContain('SameSite=Strict');
    });
  });

  describe('clearToken', () => {
    it('should return array of two expires cookie', () => {
      const cookies = clearToken();

      expect(cookies).toBeInstanceOf(Array);
      expect(cookies).toHaveLength(2);

      expect(cookies[0]).toContain('token=%20');
      expect(cookies[1]).toContain('RFSTKN=%20');

      expect(cookies[0]).toContain('Expires=Thu, 01 Jan 1970 00:00:00 GMT');
      expect(cookies[1]).toContain('Expires=Thu, 01 Jan 1970 00:00:00 GMT');
    });
  });
});
