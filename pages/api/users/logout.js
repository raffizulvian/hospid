import withAuth from '../../../lib/server/middleware/withAuth';
import withCookie from '../../../lib/server/middleware/withCookie';
import withRoles from '../../../lib/server/middleware/withRoles';
import withToken from '../../../lib/server/middleware/withToken';
import User from '../../../lib/server/models/userModel';

async function handler(req, res) {
  switch (req.method) {
    case 'POST': {
      const { uid } = req.body;

      try {
        const id = await User.logout(uid);

        res.clearToken();
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

const permittedRoles = { POST: ['admin', 'patient'] };

export default withAuth(withRoles(withCookie(withToken(handler)), permittedRoles));
