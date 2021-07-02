/* Middleware */
import withAuth from '../../../lib/server/middleware/withAuth';
import withRoles from '../../../lib/server/middleware/withRoles';
import withValidator from '../../../lib/server/middleware/withValidator';

/* Model */
import User from '../../../lib/server/models/userModel';

async function handler(req, res) {
  switch (req.method) {
    case 'GET': {
      const { userId } = req.query;

      try {
        const data = await User.get({ userId });
        res.status(200).json(data);
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

const API_ID = 'users_get';
const ROLES = { GET: ['patient'] };

export default withAuth(withRoles(withValidator(handler, API_ID), ROLES));
