import admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
      }),
    });
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
