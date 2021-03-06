/* Middleware */
import withAuth from '../../lib/server/middleware/withAuth';
import withRoles from '../../lib/server/middleware/withRoles';
import withValidator from '../../lib/server/middleware/withValidator';

/* Model */
import Appointment from '../../lib/server/models/appointmentModel';

async function handler(req, res) {
  switch (req.method) {
    case 'POST': {
      const { doctorName, description, capacity } = req.body;

      try {
        const appointment = await Appointment.create({ doctorName, description, capacity });
        res.status(200).json({ appointment });
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
const ROLES = { POST: ['admin'] };

export default withAuth(withRoles(withValidator(handler, API_ID), ROLES));
