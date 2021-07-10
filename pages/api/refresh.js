/* Middleware */
import withCookie from '../../lib/server/middleware/withCookie';
import withToken from '../../lib/server/middleware/withToken';

/* Model */
import Token from '../../lib/server/models/tokenModel';

async function handler(req, res) {
  switch (req.method) {
    case 'POST': {
      const { uid } = req.body;
      const refreshToken = req.cookies.RFSTKN;

      if (typeof refreshToken === 'undefined') {
        res.status(401).end();
        break;
      }

      try {
        const token = await Token.refresh({ uid, token: refreshToken });

        res.token(token.accessToken, token.refreshToken);
        res.status(200).json({ status: 'ok', token });
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
