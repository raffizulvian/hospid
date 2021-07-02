/* Middleware */
import withAuth from '../../../lib/server/middleware/withAuth';
import withCookie from '../../../lib/server/middleware/withCookie';
import withRoles from '../../../lib/server/middleware/withRoles';
import withToken from '../../../lib/server/middleware/withToken';
import withValidator from '../../../lib/server/middleware/withValidator';

/* Model */
import Token from '../../../lib/server/models/tokenModel';

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
        const token = await Token.revoke({ uid, refreshToken });

        res.clearToken();
        res.status(200).json({ token });
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

const API_ID = 'users_logout';
const ROLES = { POST: ['admin', 'patient'] };

export default withAuth(withRoles(withValidator(withCookie(withToken(handler)), API_ID), ROLES));
