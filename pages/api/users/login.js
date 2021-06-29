import User from '../../../lib/server/models/userModel';
import { setToken } from '../../../lib/server/utils/cookies';

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST': {
      const { type } = req.query;
      const { username, password } = req.body;

      try {
        const user = await User.login({ username, password, type });

        const cookies = setToken(user.token.accessToken, user.token.refreshToken);
        res.setHeader('Set-Cookie', cookies);

        res.status(200).json(user.data);
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
