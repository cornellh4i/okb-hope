import { db } from './firebase';
import { getDocs, query, where, collection } from "firebase/firestore";

/**
 * Fetches professional data from the Firestore based on first and last name.
 * 
 * @param firstName - The first name of the professional.
 * @param lastName - The last name of the professional.
 * @returns The professional data, or null if not found.
 */
const fetchProfessionalData = async (firstName: string, lastName: string) => {
  try {
    const name = firstName + " " + lastName
    const q = query(
      collection(db, "psychiatrist"),
      where("first_name", "==", firstName),
      where("last_name", "==", lastName)
    );
    const snapshot = await getDocs(collection(db, "psychiatrist"));

    // no data returned from the collection
    console.log(snapshot)
    
    const response = await getDocs(q);
    let professionalData = {};

    response.forEach((doc) => {
      professionalData = { id: doc.id, ...doc.data() };
    });

    return professionalData;

  } catch (error) {
    console.error("Error fetching professional data: ", error);
    return null;
  }
};

export { fetchProfessionalData };
