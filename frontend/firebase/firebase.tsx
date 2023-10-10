// Import the functions you need from the SDKs you need
import { FirebaseApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, TwitterAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
// import firebaseConfig from "../serviceAccount.json";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_SERVICE_ACCOUNT!);
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = app.name && typeof window !== 'undefined' ? getAnalytics(app) : null;

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore through Firebase
const db = getFirestore(app);

const providers = {
  google: new GoogleAuthProvider(),
  facebook: new FacebookAuthProvider(),
  twitter: new TwitterAuthProvider(),
};

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, providers.google);
    const user = res.user;
    const userRef = doc(db, "users", user.uid);

    // Check if the user already exists in the Firestore
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      // If the user doesn't exist, create a new user in Firestore
      await setDoc(userRef, {
        user_id: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        isNewUser: true, // Add this line
      });
    }
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      alert("An error occurred while signing in with Google: " + err.message);
    }
  }
};

const saveResponses = async (userId: string, responses: any) => {
  const responsesRef = doc(db, "responses", userId);
  await setDoc(responsesRef, { userId, responses });
};

const fetchRole = async (userId: string) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().role;
  } else {
    console.log("No such document!");
  }
};

const fetchUser = async (userId: string) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
};

const updateUser = async (userId: string, data: any) => {
  const userRef = doc(db, "users", userId);
  await setDoc(userRef, data, { merge: true });
};

const logout = () => signOut(auth);


export { auth, db, app, analytics, signInWithGoogle, logout, fetchRole, fetchUser, updateUser, saveResponses };
