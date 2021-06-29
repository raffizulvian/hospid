import jwt from 'jsonwebtoken';

const signAccessToken = (claim) => {
  const accessOptions = { expiresIn: '15m', audience: 'HIS', subject: claim.username };
  const accessToken = jwt.sign(claim, process.env.ACCESS_TOKEN_SECRET, accessOptions);

  const refreshOptions = { expiresIn: '4w', audience: 'HIS', subject: claim.username };
  const refreshToken = jwt.sign(claim, process.env.ACCESS_TOKEN_SECRET, refreshOptions);

  return { accessToken, refreshToken };
};

const verifyAccessToken = () => {}; // TODO: Implement later

export { signAccessToken, verifyAccessToken };
