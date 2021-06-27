const admin = require('firebase-admin');

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
  } catch (error) {
    console.log('Firebase admin initialization error\n', error.stack);
  }
}

module.exports = {
  db: admin.firestore(),
  FieldValue: admin.firestore.FieldValue,
};
