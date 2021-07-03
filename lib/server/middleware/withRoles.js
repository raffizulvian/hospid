import jwt from 'jsonwebtoken';

const withRoles = (next) => async (req, res) => {
  if (req.permittedRoles[req.method] && !req.permittedRoles[req.method].includes('all')) {
    const accessToken = req.cookies.token;
    const { role } = jwt.decode(accessToken);

    if (!req.permittedRoles[req.method].includes(role)) {
      return res.status(403).end();
    }
  }

  return next(req, res);
};

export default withRoles;
