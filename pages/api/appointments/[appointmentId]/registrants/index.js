import Appointment from '../../../../../lib/server/models/appointmentModel';

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET': {
      const { appointmentId } = req.query;

      try {
        const data = await Appointment.getRegistrants(appointmentId);
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
