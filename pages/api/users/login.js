/* Middleware */
import withCookie from '../../../lib/server/middleware/withCookie';
import withToken from '../../../lib/server/middleware/withToken';
import withValidator from '../../../lib/server/middleware/withValidator';

/* Model */
import Token from '../../../lib/server/models/tokenModel';
import User from '../../../lib/server/models/userModel';

async function handler(req, res) {
  switch (req.method) {
    case 'POST': {
      const { type } = req.query;
      const { username, password } = req.body;

      try {
        const user = await User.login({ username, password, type });
        const token = await Token.create({ user });

        res.token(token.accessToken, token.refreshToken);
        res.status(200).json(user);
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

const API_ID = 'users_login';

export default withValidator(withCookie(withToken(handler)), API_ID);
