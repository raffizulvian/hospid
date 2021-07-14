/* Middleware */
import withValidator from '../../../lib/server/middleware/withValidator';

/* Models */
import User from '../../../lib/server/models/userModel';

async function handler(req, res) {
  switch (req.method) {
    case 'POST': {
      const { uid, firstName, lastName, age, email, password } = req.body;

      try {
        const user = await User.create({ uid, firstName, lastName, age, email, password });
        res.status(200).json({ user });
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

const API_ID = 'users_signup';

export default withValidator(handler, API_ID);
