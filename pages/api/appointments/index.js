const db = require('../../../lib/server/db');
const FieldValue = require('../../../lib/server/db/value');

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST': {
      const { doctorName, description, capacity } = req.body;

      const data = {
        capacity: capacity,
        description: description,
        doctor_name: doctorName,
        created_at: FieldValue.serverTimestamp(),
      };

      try {
        const id = db.collection('appointments').doc().id;
        db.collection('appointments').doc(id).set(data);

        res.status(200).json({ id: id });
      } catch (err) {
        res.status(500).end();
      }
      break;
    }

    case 'GET': {
      try {
        const appointments = await db.collection('appointments').get();

        if (appointments.empty) {
          res.status(404).end();
          return;
        }

        let data = [];
        appointments.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });

        res.status(200).json(data);
      } catch (err) {
        res.status(500).end();
      }
      break;
    }

    default:
      res.status(405).end();
  }
}
