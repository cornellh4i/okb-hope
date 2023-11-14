import { db } from './firebase';
import { getDocs, query, where, collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { IPsychiatrist, IUser } from '@/schema';
import { IAppointment, IPatient, IPsychiatrist } from '@/schema';
import { useAuth } from '../contexts/AuthContext';

/**
 * Fetches professional data from the Firestore based on first and last name.
 * 
 * @param firstName - The first name of the professional.
 * @param lastName - The last name of the professional.
 * @returns The professional data, or null if not found.
 */
const fetchProfessionalData = async (firstName: string, lastName: string) => {
  try {
    const q = query(
      collection(db, "psychiatrists"),
      where("firstName", "==", firstName),
      where("lastName", "==", lastName)
    );

    const response = await getDocs(q);
    if (!response.empty) {
      const docData = response.docs[0].data();
      const psychiatrist = docData as IPsychiatrist;
      return psychiatrist;
    } else {
      throw new Error(`No psychiatrist found with the name: ${firstName} ${lastName}`);
    }
  } catch (error) {
    console.error("Error fetching professional data:", error);
    throw error;
  }
};

const fetchAllProfessionals = async () => {
  try {
    const psychRef = collection(db, 'psychiatrists');
    const snapshot = await getDocs(psychRef);
    const fetchedPsychiatrists: IPsychiatrist[] = snapshot.docs.map((doc) => doc.data() as IPsychiatrist);
    return fetchedPsychiatrists;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
}

const fetchAllUsers = async () => {
  try {
    const userRef = collection(db, 'User');
    const snapshot = await getDocs(userRef);
    const fetchedUsers: IUser[] = snapshot.docs.map((doc) => doc.data() as IUser);
    return fetchedUsers;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
}


const updateUser = async (userId: string, savedPsychiatrists: string[]) => {
  try {
    console.log("hi")
    const userDocRef = doc(db, 'User', userId);
    console.log(userDocRef)

    // Update only the savedPsychiatrists field
    const updateUserPayload: Partial<IUser> = {
      savedPsychiatrists: savedPsychiatrists,
    };

    await updateDoc(userDocRef, updateUserPayload);
    console.log(`User with ID ${userId} updated successfully`);
  } catch (error) {
    console.error(`Error updating user with ID ${userId}:`, error);
    throw error;
  }
};

const fetchPatientDetails = async (uid: string) => {
  try {
    const q = query(
      collection(db, "patients"),
      where("uid", "==", uid)
    );
    const response = await getDocs(q);
    if (!response.empty) {
      const doc = response.docs[0];
      const docId = doc.id;
      const docData = response.docs[0].data();
      const patient = docData as IPatient;
      return patient;
    } else {
      throw new Error(`No patient found with the uid: ${uid}`)
    }
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
}

const fetchApptDetails = async (uid: string) => {
  try{
    const apptRef = collection(db, "appointments");
    const q = query(apptRef, where("patientId", "==", uid)); 
    const response = await getDocs(q);
    if(!response.empty){
      const docData: IAppointment[] = response.docs.map((doc) => doc.data() as IAppointment);
      return docData
    } else {
      throw new Error(`No appointment found for patient with the uid: ${uid}`);
    }


  } catch (error: any) {
    console.error(error.message);
  }
}

function fetchUserChats(setMessages) {
  // const userId = auth.currentUser?.uid;
  const { user } = useAuth();
  const userId = user?.uid
  // const userId = "123"

  if (!userId) {
    console.error("No user is authenticated.");
    return () => { }; // Return an empty function for consistent return type
  }

  const conversationsRef = collection(db, "conversations");
  const q = query(conversationsRef, where("participants", "array-contains", userId));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const userConversations = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    }));
    setMessages(userConversations);
  });
  return unsubscribe;
}

const fetchDocumentId = async (type: string, uid: string)  => {
  try {
    const q = query(
      collection(db, type),
      where("uid", "==", uid)
    );

    const response = await getDocs(q);
    if (!response.empty) {
      const doc = response.docs[0];
      const docId = doc.id;
      return docId;
    }
  } catch (error: any) {
    console.error(error.message);
  }
}

export { fetchProfessionalData, fetchAllProfessionals, fetchPatientDetails, fetchUserChats, fetchDocumentId, fetchApptDetails, fetchAllUsers, updateUser };


