import { verifyAccessToken } from '../service/auth';

const withAuth = (next) => async (req, res) => {
  const accessToken = req.cookies.token;
  if (typeof accessToken === 'undefined') {
    return res.status(401).end();
  }

  const isValid = verifyAccessToken(accessToken);
  if (!isValid) {
    return res.status(401).end();
  }

  return next(req, res);
};

export default withAuth;
