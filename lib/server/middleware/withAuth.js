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
      return res.status(403).end();
    }

    const now = Math.round(new Date().getTime() / 1000);

    if (decoded.exp < now) {
      error = true;
      return res.status(403).end();
    }
  });

  if (!error) {
    return handler(req, res);
  }
};

export default withAuth;
