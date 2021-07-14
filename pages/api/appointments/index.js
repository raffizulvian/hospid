/* Model */
import Appointment from '../../../lib/server/models/appointmentModel';

async function handler(req, res) {
  switch (req.method) {
    case 'GET': {
      try {
        const appointments = await Appointment.get();
        res.status(200).json({ appointments });
      } catch (err) {
        res.status(err.code || 500).json({ message: err.message });
      }
      break;
    }

    default:
      res.status(405).end();
  }
}

export default handler;
