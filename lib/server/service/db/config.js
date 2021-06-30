import admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    admin.initializeApp({ credential: admin.credential.applicationDefault() });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Firebase admin initialization error\n', error.stack);
  }
}

const config = {
  db: admin.firestore(),
  FieldValue: admin.firestore.FieldValue,
};

export default config;
