import jwt from 'jsonwebtoken';

const withAuth = (handler) => (req, res) => {
  const accessToken = req.cookies.token;

  let error = false;

  if (typeof accessToken === 'undefined') {
    return res.status(401).end();
  }

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, { audience: 'HIS' }, (err, decoded) => {
    if (err) {
      error = true;
      return;
    }

    const now = Math.round(new Date().getTime() / 1000);
    if (decoded.exp < now) {
      error = true;
    }
  });

  if (error) {
    return res.status(403).end();
  }

  return handler(req, res);
};

export default withAuth;
