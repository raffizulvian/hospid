import Appointment from '../../../../../lib/server/models/appointmentModel';

export default async function handler(req, res) {
  switch (req.method) {
    case 'DELETE': {
      const { appointmentId, registrantId } = req.query;

      try {
        const id = await Appointment.cancel(registrantId, appointmentId);
        res.status(200).json({ id });
      } catch (err) {
        res.status(err.code || 500).json({ message: err.message });
      }
      break;
    }

    default:
      res.status(405).end();
  }
}
