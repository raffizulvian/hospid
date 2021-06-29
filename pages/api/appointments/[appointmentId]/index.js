import withAuth from '../../../../lib/server/middleware/withAuth';
import withRoles from '../../../../lib/server/middleware/withRoles';
import Appointment from '../../../../lib/server/models/appointmentModel';

async function handler(req, res) {
  switch (req.method) {
    case 'PUT': {
      const { appointmentId } = req.query;
      const { doctorName, description, capacity } = req.body;

      try {
        const id = await Appointment.update(appointmentId, doctorName, description, capacity);
        res.status(201).json({ id });
      } catch (err) {
        res.status(err.code || 500).json({ message: err.message });
      }
      break;
    }

    case 'DELETE': {
      const { appointmentId } = req.query;

      try {
        const id = await Appointment.delete(appointmentId);
        res.status(200).json({ id });
      } catch (err) {
        res.status(err.code || 500).json({ message: err.message });
      }
      break;
    }

    case 'POST': {
      const { uid, username, aid } = req.body;

      try {
        const id = await Appointment.apply(uid, username, aid);
        res.status(201).json({ id });
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

const permittedRoles = { POST: ['patient'], DELETE: ['admin'], PUT: ['admin'] };

export default withAuth(withRoles(handler, permittedRoles));
