import User from '../../lib/server/models/userModel';

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST': {
      const { type } = req.query;
      const { firstName, lastName, age, email, username, password } = req.body;

      try {
        const data = await User.signup(firstName, lastName, age, email, username, password, type);

        res.status(200).json(data);
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
