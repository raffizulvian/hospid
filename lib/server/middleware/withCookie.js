import { multipleCookie } from '../utils/cookies';

const withCookie = (next) => async (req, res) => {
  res.cookie = (key, val, opt) => {
    const cookies = multipleCookie([{ key, val, opt }]);
    res.setHeader('Set-Cookie', cookies);
  };

  res.cookies = (cookies) => {
    res.setHeader('Set-Cookie', cookies);
  };

  return next(req, res);
};

export default withCookie;
