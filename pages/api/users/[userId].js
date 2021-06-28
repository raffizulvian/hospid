import User from '../../../lib/server/models/userModel';

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET': {
      const { userId } = req.query;

      try {
        const data = await User.get(userId);
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