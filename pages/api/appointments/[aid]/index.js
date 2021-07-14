/* Middleware */
import withAuth from '../../../../lib/server/middleware/withAuth';
import withRoles from '../../../../lib/server/middleware/withRoles';
import withValidator from '../../../../lib/server/middleware/withValidator';

/* Model */
import Appointment from '../../../../lib/server/models/appointmentModel';

async function handler(req, res) {
  switch (req.method) {
    case 'PUT': {
      const { aid } = req.query;
      const { doctorName, description, capacity } = req.body;

      try {
        const appointment = await Appointment.update({ aid, doctorName, description, capacity });
        res.status(201).json({ appointment });
      } catch (err) {
        res.status(err.code || 500).json({ message: err.message });
      }
      break;
    }

    case 'DELETE': {
      const { aid } = req.query;

      try {
        const deletedId = await Appointment.delete({ aid });
        res.status(200).json({ aid: deletedId });
      } catch (err) {
        res.status(err.code || 500).json({ message: err.message });
      }
      break;
    }

    case 'POST': {
      const { aid } = req.query;
      const { uid } = req.body;

      try {
        const appointment = await Appointment.apply({ uid, aid });
        res.status(201).json({ appointment });
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

const API_ID = 'appointment_update_delete_apply';
const ROLES = { POST: ['patient'], DELETE: ['admin'], PUT: ['admin'] };

export default withAuth(withRoles(withValidator(handler, API_ID), ROLES));
