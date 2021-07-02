/* Middleware */
import withAuth from '../../../lib/server/middleware/withAuth';
import withRoles from '../../../lib/server/middleware/withRoles';
import withValidator from '../../../lib/server/middleware/withValidator';

/* Model */
import Appointment from '../../../lib/server/models/appointmentModel';

async function handler(req, res) {
  switch (req.method) {
    case 'POST': {
      const { doctor, description, capacity } = req.body;

      try {
        const appointment = await Appointment.create({ doctor, description, capacity });
        res.status(200).json({ appointment });
      } catch (err) {
        res.status(err.code || 500).json({ message: err.message });
      }
      break;
    }

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

const API_ID = 'appointment_create';
const ROLES = { POST: ['admin'], GET: ['all'] };

export default withAuth(withRoles(withValidator(handler, API_ID), ROLES));
