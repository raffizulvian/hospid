import Token from '../../lib/server/models/tokenModel';

async function handler(req, res) {
  switch (req.method) {
    case 'POST': {
      const refreshToken = req.cookies.RFSTKN;
      if (typeof refreshToken === 'undefined') {
        res.status(401).end();
        break;
      }

      try {
        const token = Token.refresh(refreshToken);
        res.status(200).json(token);
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

export default handler;
