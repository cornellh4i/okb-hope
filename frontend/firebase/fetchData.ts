import { db } from './firebase';
import { getDocs, query, where, collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { IAppointment, IAvailability, IPatient, IPsychiatrist, IReport, IUser } from '@/schema';
import { useAuth } from '../contexts/AuthContext';

/**
 * Fetches professional data from the Firestore based on psych_uid.
 * 
 * @param psych_uid - The uid of the professional.
 * @returns The professional data, or null if not found.
 */
const fetchProfessionalData = async (psych_uid: string) => {
  try {
    const q = query(
      collection(db, "psychiatrists"),
      where("uid", "==", psych_uid)
    );

    const response = await getDocs(q);
    if (!response.empty) {
      const docData = response.docs[0].data();
      const psychiatrist = docData as IPsychiatrist;
      return psychiatrist;
    } else {
      throw new Error(`No psychiatrist found with the name: ${psych_uid}`);
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

const fetchUnreportedProfessionals = async (patient_id: string): Promise<IPsychiatrist[]> => {
  try {
    const fetchedReports = await fetchPatientReports(patient_id);
    const reportedPsychIds = new Set(
      fetchedReports.map((report) => report.psych_id)
    );
    const psychRef = collection(db, "psychiatrists");
    const snapshot = await getDocs(psychRef);
    const fetchedPsychiatrists: IPsychiatrist[] = snapshot.docs.map(
      (doc) => doc.data() as IPsychiatrist
    );
    const unreportedPsychiatrists = fetchedPsychiatrists.filter(
      (psychiatrist) => !reportedPsychIds.has(psychiatrist.uid)
    );
    return unreportedPsychiatrists;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
};




const fetchPatientReports = async (patient_id) => {
  try {
    const reportCollectionRef = collection(db, 'reports');
    const q = query(reportCollectionRef, where('patient_id', '==', patient_id), where('reporter_type', '==', 'patient'));
    const querySnapshot = await getDocs(q);
    const fetchedReports: IReport[] = querySnapshot.docs.map(doc => ({
      ...doc.data() as IReport,
      id: doc.id // Include the document ID
    }));
    return fetchedReports;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
};

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

const fetchApptDetails = async (uid: string, userType: string) => {
  try {
    const apptRef = collection(db, "appointments");
    const q = userType == "patient" ? query(apptRef, where("patientId", "==", uid)) : query(apptRef, where("profId", "==", uid));
    const response = await getDocs(q);
    if (!response.empty) {
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

const fetchDocumentId = async (type: string, uid: string) => {
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

const fetchAvailability = async (availId: string) => {
  try {
    const q = query(
      collection(db, "availabilities"),
      where("availId", "==", availId)
    );
    const response = await getDocs(q);
    if (!response.empty) {
      const docData = response.docs[0].data();
      const availability = docData as IAvailability;
      return availability;
    } else {
      throw new Error(`No availability found with the availId: ${availId}`)
    }
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
}
export { fetchProfessionalData, fetchAllProfessionals, fetchUnreportedProfessionals, fetchPatientDetails, fetchPatientReports, fetchUserChats, fetchDocumentId, fetchApptDetails, fetchAvailability, fetchAllUsers };


