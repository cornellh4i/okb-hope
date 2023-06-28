import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
const db = admin.firestore();

export const createUserRecord = functions.auth.
  user().
  onCreate((user, context) => {
    const userRef = db.doc(`users/${user.uid}`);

    return userRef.set({
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
    });
  });
