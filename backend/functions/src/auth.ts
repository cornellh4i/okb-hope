import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore();

export const createUserRecord = functions.auth.
    user().
    onCreate((user, context) => {
        const userRef = db.doc(`users/${user.uid}`);

        return userRef.set({
            id: user.uid,
            name: user.displayName,
            address: null,
            gender: null,
            phone_number: user.phoneNumber,
            email: user.email,
            username: null,
            password: null,
            specialties: null,
            url: user.photoURL,
            age: user.age,
        });
    });