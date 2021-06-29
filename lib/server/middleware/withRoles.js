import jwt from 'jsonwebtoken';

const withRoles = (next, permittedRoles) => async (req, res) => {
  if (!permittedRoles[req.method].includes('all')) {
    const accessToken = req.cookies.token;
    const decoded = jwt.decode(accessToken);

    if (!permittedRoles[req.method].includes(decoded.role)) {
      return res.status(403).end();
    }
  }

  return next(req, res);
};

export default withRoles;
