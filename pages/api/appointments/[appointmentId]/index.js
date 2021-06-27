import AppointmentModel from '../../../../lib/server/models/appointmentModel';

export default async function handler(req, res) {
  switch (req.method) {
    case 'PUT': {
      const { appointmentId } = req.query;
      const { doctorName, description, capacity } = req.body;

      try {
        const id = await AppointmentModel.update(appointmentId, doctorName, description, capacity);
        res.status(201).json({ id });
      } catch (err) {
        console.log(err);
        res.status(err.code).json({ message: err.message });
      }
      break;
    }

    case 'DELETE': {
      const { appointmentId } = req.query;

      try {
        const id = await AppointmentModel.delete(appointmentId);
        res.status(200).json({ id });
      } catch (err) {
        res.status(err.code).json({ message: err.message });
      }
      break;
    }

    default:
      res.status(405).end();
      break;
  }
}
