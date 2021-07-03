/* Middleware */
import withAuth from '../../../../../lib/server/middleware/withAuth';
import withRoles from '../../../../../lib/server/middleware/withRoles';

/* Model */
import Appointment from '../../../../../lib/server/models/appointmentModel';

async function handler(req, res) {
  switch (req.method) {
    case 'GET': {
      const { aid } = req.query;

      try {
        const registrants = await Appointment.getRegistrants({ aid });
        res.status(200).json({ registrants });
      } catch (err) {
        res.status(err.code || 500).json({ message: err.message });
      }
      break;
    }

    default:
      res.status(405).end();
  }
}

const ROLES = { GET: ['admin'] };

export default withAuth(withRoles(handler, ROLES));
