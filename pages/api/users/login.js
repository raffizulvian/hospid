import withCookie from '../../../lib/server/middleware/withCookie';
import withToken from '../../../lib/server/middleware/withToken';
import User from '../../../lib/server/models/userModel';

async function handler(req, res) {
  switch (req.method) {
    case 'POST': {
      const { type } = req.query;
      const { username, password } = req.body;

      try {
        const user = await User.login({ username, password, type });

        res.token(user.token.accessToken, user.token.refreshToken);
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

export default withCookie(withToken(handler));
