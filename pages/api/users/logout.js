import User from '../../../lib/server/models/userModel';
import { clearToken } from '../../../lib/server/utils/cookies';

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST': {
      const { uid } = req.body;

      try {
        const id = await User.logout(uid);

        const cookies = clearToken();
        res.setHeader('Set-Cookie', cookies);

        res.status(200).json({ id });
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
