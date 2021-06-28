import User from '../../lib/server/models/userModel';

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST': {
      const { username, password } = req.body;

      try {
        const loginTime = await User.login(username, password);

        res.status(200).json({ login_time: loginTime });
      } catch (err) {
        res.status(err.code).json({ message: err.message });
      }
      break;
    }

    default:
      res.status(405).end();
      break;
  }
}
