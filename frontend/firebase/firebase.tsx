import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { addDoc, collection, getDocs, getFirestore, query, where, doc, getDoc, setDoc } from "firebase/firestore";
import { FacebookAuthProvider, TwitterAuthProvider } from "firebase/auth";
import { Gender } from "@/schema";


const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_SERVICE_ACCOUNT!);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore through Firebase
const db = getFirestore(app);

const providerG = new GoogleAuthProvider();
// facebook: new FacebookAuthProvider(),
// twitter: new TwitterAuthProvider(),

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth();

type GenderOrUndefined = Gender | undefined;

const signInWithGoogle = async (
  role: string,
  firstName: string,
  lastName: string,
  position: string,
  profile_pic: string,
  availability: string[],
  gender: GenderOrUndefined,
  location: string,
  language: string[],
  specialty: string[],
  description: string,
  website: string,
  concerns: string,
  previousTherapyExperience: string,
  lastTherapyTimeframe: string,
  ageRange: string,
  prefLanguages: string[],
  genderPref: GenderOrUndefined,
  savedPsychiatrists: string[],
) => {
  try {
    const res = await signInWithPopup(auth, providerG)
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);

    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
    if (role === "psychiatrist")
      await addDoc(collection(db, "psychiatrists"), {
        uid: user.uid,
        firstName: firstName,
        lastName: lastName,
        position: position,
        profile_pic: profile_pic,
        availability: availability,
        gender: gender,
        location: location,
        language: language,
        specialty: specialty,
        description: description,
        website: website,
      })
    else if (role === "patient") {
      await addDoc(collection(db, "patients"), {
        uid: user.uid,
        email: user.email,
        firstName: firstName,
        lastName: lastName,
        concerns: concerns,
        previousTherapyExperience: previousTherapyExperience,
        lastTherapyTimeframe: lastTherapyTimeframe,
        ageRange: ageRange,
        prefLanguages: prefLanguages,
        genderPref: genderPref,
        savedPsychiatrists: savedPsychiatrists
      })
    }
  } catch (err) {
    if (err instanceof Error) {
      alert("An error occurred while signing in with Google: " + err.message);
    }
  }
};
// const user = res.user;
// const q = query(collection(db, "users"), where("uid", "==", user.uid));
// const signIn = await fetchSignInMethodsForEmail(auth, user.uid)

// if (signIn.length > 0) {
//   await addDoc(collection(db, "users"), {
//     uid: user.uid,
//     name: user.displayName,
//     authProvider: "google",
//     email: user.email,
//   });
// } else {
//   throw new Error()
// }
// catch (err) {
//   if (err instanceof Error) {
//     alert("An error occurred while signing in with Google: " + err.message);
//   }
// }

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


export { auth, db, app, signInWithGoogle, logout, fetchRole, fetchUser, updateUser, saveResponses };

