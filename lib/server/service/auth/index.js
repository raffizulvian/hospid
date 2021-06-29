import jwt from 'jsonwebtoken';

const signAccessToken = (claim) => {
  const accessOptions = { expiresIn: '15m', audience: 'HIS', subject: claim.username };
  const accessToken = jwt.sign(claim, process.env.ACCESS_TOKEN_SECRET, accessOptions);

  const refreshOptions = { expiresIn: '4w', audience: 'HIS', subject: claim.username };
  const refreshToken = jwt.sign(claim, process.env.REFRESH_TOKEN_SECRET, refreshOptions);

  return { accessToken, refreshToken };
};

const verifyAccessToken = (accessToken) => {
  let isValid = true;

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, { audience: 'HIS' }, (err, decoded) => {
    if (err) {
      isValid = false;
      return;
    }

    const now = Math.round(new Date().getTime() / 1000);
    if (decoded.exp < now) {
      isValid = false;
    }
  });

  return isValid;
};

export { signAccessToken, verifyAccessToken };
