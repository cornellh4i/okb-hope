import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { addDoc, updateDoc, collection, getDocs, getFirestore, query, where, doc, getDoc, setDoc } from "firebase/firestore";
import { FacebookAuthProvider, TwitterAuthProvider } from "firebase/auth";
import { Gender, IUser } from "@/schema";
import router, { useRouter } from 'next/router';
import { fetchDocumentId } from './fetchData';
import React, { useState, useRef } from 'react'; // Import useState from React
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getStorage } from 'firebase/storage';
import { getApp } from "firebase/app";



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

const logout = () => {
  signOut(auth);
}

type GenderOrUndefined = Gender | undefined;

const logInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, new GoogleAuthProvider());
    const user = res.user;
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      alert("An account with this email does not yet exist. Please sign up for an account first.");
      logout();
    } else {
      router.push('/');
    }
  }
  catch (err) {
    if (err instanceof Error) {
      alert('An error occurred while signing in with Google: ' + err.message);
    }
  }
};


const signUpWithGoogle = async (
  role: string,
  firstName: string,
  lastName: string,
  position: string,
  profile_pic: string,
  gender: GenderOrUndefined,
  location: string,
  language: string[],
  weeklyAvailability: string[],
  workingHours: { [key: string]: { start: string, end: string } },
  specialty: string[],
  description: string,
  concerns: string[],
  ageRange: string,
  lastTherapyTimeframe: string,
  previousTherapyExperience: string,
  prefLanguages: string[],
  genderPref: GenderOrUndefined,
  savedPsychiatrists: string[],
  calendly: string
) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const res = await signInWithPopup(auth, providerG);
      console.log("res:", res); // Log the value of 'res'
      const user = res.user;
      console.log("user:", user);
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);

      if (docs.docs.length === 0) {
        console.log("not yet exists")
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
          userType: role
        });
        console.log("Added user")
        if (role === "psychiatrist") {
          await addDoc(collection(db, "psychiatrists"), {
            uid: user.uid,
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            profile_pic: profile_pic,
            position: position,
            location: location,
            description: description,
            language: language,
            weeklyAvailability: weeklyAvailability,
            workingHours: workingHours,
            specialty: specialty,
            status: "pending",
            calendly: calendly
          });
          console.log("Added psych")
        }
        else if (role === "patient") {
          await addDoc(collection(db, "patients"), {
            uid: user.uid,
            email: user.email,
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            profile_pic: profile_pic,
            ageRange: ageRange,
            prefLanguages: prefLanguages,
            previousTherapyExperience: previousTherapyExperience,
            lastTherapyTimeframe: lastTherapyTimeframe,
            concerns: concerns,
            genderPref: genderPref,
            savedPsychiatrists: savedPsychiatrists
          });
          console.log("Added patient")
        }
        console.log("Updated database");
      }
      else {
        throw new Error("user already exists");
      }
      resolve(); // Resolve the promise once sign-in is complete
    } catch (err) {
      if (err instanceof Error) {
        reject(err); // Reject the promise if an error occurs during sign-in
        alert("this email is already in use by an existing account");
        logout();
        return;
      }
    }
  });
};

const saveResponses = async (userId: string, responses: any) => {
  const responsesRef = doc(db, "responses", userId);
  await setDoc(responsesRef, { userId, responses });
};

const fetchRole = async (uid: string) => {
  try {
    const q = query(
      collection(db, "users"),
      where("uid", "==", uid)
    );
    const response = await getDocs(q);
    if (!response.empty) {
      const doc = response.docs[0];
      const docId = doc.id;
      const docData = response.docs[0].data();
      const user = docData as IUser;
      return user.userType;
    } else {
      throw new Error(`No user found with the uid: ${uid}`)
    }
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
}

// const fetchRole = async (userId: string) => {
//   try {
//     console.log("fetching role")
//     const q = query(
//       collection(db, "users"),
//       where("uid", "==", userId)
//     );

//     const response = await getDocs(q);
//     console.log(response)
//     console.log(response.docs[0])
//     if (!response.empty && response.docs[0]) {
//       const docData = response.docs[0].data();
//       const user = docData as IUser;
//       console.log(user.userType);
//       return user.userType;
//     } else {
//       throw new Error(`No user found with the uid: ${userId}`);
//     }
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//     throw error;
//   }
// };

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

const getUidByName = async (firstName: string, lastName: string) => {
  const q = query(
    collection(db, "users"),
    where("name", "==", firstName + " " + lastName)
  );
  const response = await getDocs(q);
  if (!response.empty) {
    const doc = response.docs[0];
    const docData = response.docs[0].data();
    return docData.uid;
  } else {
    throw new Error(`No psychiatrist found with the name: ${firstName} ${lastName}`);
  }
}


const firebaseApp = getApp();
const storage = getStorage(firebaseApp, "gs://okb-hope.appspot.com");

const uploadProfilePic = async (file: File, uID: string, is_psychiatrist: boolean): Promise<string> => {
  const db = getFirestore(); // Ensure Firestore is initialized

  try {
    let psychiatrist_or_patient: string = is_psychiatrist ? "psychiatrists" : "patients";

    const storageRef = ref(storage, `profile_pictures/${uID}.png`);

    await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(storageRef);

    const documentId = await fetchDocumentId(psychiatrist_or_patient, uID);
    const docRef = doc(db, psychiatrist_or_patient, documentId ?? "");

    await updateDoc(docRef, {
      profile_pic: downloadURL
    });

    return downloadURL;
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    throw new Error("Error uploading profile picture.");
  }
};

export async function fetchProfilePic(uid: string): Promise<string | null> {
  const collections = ['psychiatrists', 'patients'];

  for (const collectionName of collections) {
    try {
      const documentId = await fetchDocumentId(collectionName, uid)
      const userDocRef = doc(db, collectionName, documentId ?? ""); // Reference to the user document
      const userDoc = await getDoc(userDocRef); // Fetch the document

      if (userDoc.exists()) {
        // Retrieve the profile_pic field
        const profilePicUrl = userDoc.data().profile_pic;
        return profilePicUrl || null; // Return the URL if it exists, otherwise null
      }
    } catch (error) {
      console.error(`Error fetching from ${collectionName} collection:`, error);
    }
  }

  console.warn(`No document found for UID: ${uid} in either collection.`);
  return null; // If no document found in either collection
}

const uploadPsychiatristFile = async (files: File[], uID: string): Promise<string []> => {
  const db = getFirestore(); // Ensure Firestore is initialized
  const user = getAuth(app);
  const filenames : string[] = [];
  try {
    if(user == null){
      throw Error('User not Authenticated');
    }
    for (const file of files) {
      const storageRef = ref(storage, `resume_files/${uID}.pdf`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      filenames.push(downloadURL);

    }
    return filenames;

  } catch (error) {
    console.error("Error Uploading Psychiatrist files:", error);
    throw new Error("Error Uploading Psychiatrist files.");
  }
 };

export { auth, db, app, logInWithGoogle, signUpWithGoogle, logout, fetchRole, fetchUser, updateUser, saveResponses, uploadProfilePic, uploadPsychiatristFile, getUidByName };

