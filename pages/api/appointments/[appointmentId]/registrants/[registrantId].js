/* Middleware */
import withAuth from '../../../../../lib/server/middleware/withAuth';
import withRoles from '../../../../../lib/server/middleware/withRoles';

/* Model */
import Appointment from '../../../../../lib/server/models/appointmentModel';

async function handler(req, res) {
  switch (req.method) {
    case 'POST': {
      const { uid, aid } = req.query;

      try {
        const deletedId = await Appointment.cancel({ uid, aid });
        res.status(200).json({ id: deletedId });
      } catch (err) {
        res.status(err.code || 500).json({ message: err.message });
      }
      break;
    }

    default:
      res.status(405).end();
  }
}

const permittedRoles = { POST: ['patient'] };

export default withAuth(withRoles(handler, permittedRoles));
