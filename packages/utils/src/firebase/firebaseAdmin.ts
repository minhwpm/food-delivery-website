import admin from "firebase-admin"

if (!admin.apps.length) {
  const firebaseAdminCredential = process.env.FIREBASE_ADMIN_CREDENTIAL;

  if (!firebaseAdminCredential) {
    throw new Error('Firebase admin credential is not defined.');
  }

  const serviceAccount = JSON.parse(
    Buffer.from(firebaseAdminCredential, 'base64').toString('utf-8')
  );

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`,
  });
}

export const firestoreAdmin = admin.firestore();