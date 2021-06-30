/* Middleware */
import withAuth from '../../../lib/server/middleware/withAuth';
import withRoles from '../../../lib/server/middleware/withRoles';

/* Model */
import Appointment from '../../../lib/server/models/appointmentModel';

async function handler(req, res) {
  switch (req.method) {
    case 'POST': {
      const { doctorName, description, capacity } = req.body;

      try {
        const id = await Appointment.create(doctorName, description, capacity);
        res.status(200).json({ id });
      } catch (err) {
        res.status(err.code || 500).json({ message: err.message });
      }
      break;
    }

    case 'GET': {
      try {
        const data = await Appointment.get();
        res.status(200).json(data);
      } catch (err) {
        res.status(err.code || 500).json({ message: err.message });
      }
      break;
    }

    default:
      res.status(405).end();
  }
}

const permittedRoles = { POST: ['admin'], GET: ['all'] };

export default withAuth(withRoles(handler, permittedRoles));
