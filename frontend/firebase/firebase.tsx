import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { addDoc, updateDoc, collection, getDocs, getFirestore, query, where, doc, getDoc, setDoc } from "firebase/firestore";
import { FacebookAuthProvider, TwitterAuthProvider } from "firebase/auth";
import { Gender, IUser } from "@/schema";
import router, { useRouter } from 'next/router';
import React, { useState } from 'react'; // Import useState from React

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
            status: "pending"
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


import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getStorage } from 'firebase/storage';
import { getApp } from "firebase/app";

const firebaseApp = getApp();
const storage = getStorage(firebaseApp, "gs://okb-hope.appspot.com");

const ImageUpload: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>(null);
    const [downloadURL, setDownloadURL] = useState<string | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(selectedFile);
            setFile(selectedFile);
        }
    };

    const handleUpload = async () => {
        if (file) {
            setUploading(true);
            setMessage(null); // Reset message
            try {
                const storageRef = ref(storage, `images/${file.name}`); 
                await uploadBytes(storageRef, file);
                const url = await getDownloadURL(storageRef);
                setDownloadURL(url);
                setMessage('Upload successful!');
            } catch (error) {
                console.error('Upload failed:', error);
                setMessage('Upload failed. Please try again.');
            } finally {
                setUploading(false);
            }
        }
    };

    return (
        <div>
            <label htmlFor="file-upload">Upload Image:</label>
            <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
            />
            {selectedImage && (
                <div>
                    <h3>Preview:</h3>
                    <img src={selectedImage} alt="Selected" style={{ maxWidth: '300px', maxHeight: '300px' }} />
                </div>
            )}
            <button onClick={handleUpload} disabled={!file || uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
            {message && <p>{message}</p>} {/* Display upload message */}
            {downloadURL && (
                <div>
                    <h3>Download URL:</h3>
                    <a href={downloadURL} target="_blank" rel="noopener noreferrer">
                        {downloadURL}
                    </a>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;

const uploadPsychiatristProfilePic = async (file: File, psychiatristUID: string) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User is not authenticated.");
  }
 
  try {
    const storageRef = ref(storage, `psychiatrists/${psychiatristUID}.png`);
   
    await uploadBytes(storageRef, file);
   
    const downloadURL = await getDownloadURL(storageRef);
   
    const psychiatristDocRef = doc(db, "psychiatrists", psychiatristUID);
   
    await updateDoc(psychiatristDocRef, {
      profile_pic: downloadURL
    });
    console.log("Profile picture uploaded successfully!");
    return downloadURL;  // Return the URL for further use if needed
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    throw new Error("Error uploading profile picture.");
  }
 };
 
export { auth, db, app, logInWithGoogle, signUpWithGoogle, logout, fetchRole, fetchUser, updateUser, saveResponses, ImageUpload, uploadPsychiatristProfilePic };