import { db } from './firebase';
import { getDocs, query, where, collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { IPsychiatrist, IUser } from '@/schema';

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
      where("first_name", "==", firstName),
      where("last_name", "==", lastName)
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


function fetchUserChats(setMessages) {
  // const userId = auth.currentUser?.uid;
  const userId = "123"

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

export { fetchProfessionalData, fetchAllProfessionals, fetchUserChats, fetchAllUsers, updateUser };

