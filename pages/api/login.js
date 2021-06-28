import { serialize } from 'cookie';
import User from '../../lib/server/models/userModel';

const fifteenMinutes = 15 * 60;
const oneMonth = 4 * 7 * 24 * 60 * 60;

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST': {
      const { type } = req.query;
      const { username, password } = req.body;

      const accessOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: fifteenMinutes,
        path: '/',
      };

      const refreshOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: oneMonth,
        path: '/',
      };

      try {
        const response = await User.login(username, password, type);

        res.setHeader('Set-Cookie', serialize('token', response.token.accessToken, accessOptions));
        res.setHeader('Set-Cookie', serialize('RFSTKN', response.token.refreshToken, refreshOptions));

        res.status(200).json(response.data);
      } catch (err) {
        res.status(err.code || 500).json({ message: err.message });
      }
      break;
    }

    default:
      res.status(405).end();
      break;
  }
}
