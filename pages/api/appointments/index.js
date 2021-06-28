import Appointment from '../../../lib/server/models/appointmentModel';

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST': {
      const { doctorName, description, capacity } = req.body;

      try {
        const id = await Appointment.create(doctorName, description, capacity);
        res.status(200).json({ id });
      } catch (err) {
        console.log(err);
        res.status(err.code).json({ message: err.message });
      }
      break;
    }

    case 'GET': {
      try {
        const data = await Appointment.get();
        res.status(200).json(data);
      } catch (err) {
        res.status(err.code).json({ message: err.message });
      }
      break;
    }

    default:
      res.status(405).end();
  }
}
