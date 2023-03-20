// Import the functions you need from the SDKs you need
import { FirebaseApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, TwitterAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { addDoc, collection, getDocs, getFirestore, query, where } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyAWCKEkLBpYgN_dIJl6ncEHPngL21j3kz4",
  authDomain: "okb-hope.firebaseapp.com",
  projectId: "okb-hope",
  storageBucket: "okb-hope.appspot.com",
  messagingSenderId: "321787147976",
  appId: "1:321787147976:web:faae136e03900bd47b97fd",
  measurementId: "G-V7SV4XK6GC"
};

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
    const q = query(collection(db, "User + Admin + Volunteer"), where("uid", "==", user.uid));
    const docs = await getDocs(q);

    if (docs.docs.length === 0) {
      await addDoc(collection(db, "User + Admin + Volunteer"), {
        user_id: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  }
  catch (err) {
    console.error(err);
    if (err instanceof Error) {
      alert("An error occurred while signing in with Google: " + err.message);
    }
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, app, analytics, signInWithGoogle, logout };
