import { setToken, clearToken } from '../utils/token';

const withToken = (next) => async (req, res) => {
  res.token = (accessToken, refreshToken) => {
    const cookies = setToken(accessToken, refreshToken);
    res.cookies(cookies);
  };

  res.clearToken = () => {
    const cookies = clearToken();
    res.cookies(cookies);
  };

  return next(req, res);
};

export default withToken;
