import { db } from './firebase';
import { getDoc, where, getDocs, collection, addDoc, updateDoc, deleteDoc, doc, QueryConstraint, query } from "firebase/firestore";
import { IPsychiatrist } from '@/schema';

// export interface IPsychiatrist {
//     uid: string;
//     firstName: string;
//     lastName: string;
//     position: string;
//     profile_pic: null;
//     availability: IAvailability[];
//     gender: Gender;
//     location: string;
//     language: string[];
//     specialty: string[];
//     description: string;
//     website: string;
// }

const PYSCHIATRIST = "psychiatrists"

const createPsychiatrist = async (psychiatrist: IPsychiatrist): Promise<void> => {
  try {
    await addDoc(collection(db, PYSCHIATRIST), psychiatrist);
} catch (error) {
    console.error("Error adding psychiatrist entry: ", error);
}
}

/** To fetch a specific psychiatrist based on name;  
 * the below can technically do same but similar method currently in fetch data so wanted to stay consistent*/
const fetchPsychiatrist = async (firstName: string, lastName: string)=> {
// const fetchPsychiatrist = async (constraints: QueryConstraint[])=> {
    try {
        const baseQuery = collection(db, PYSCHIATRIST);
        const q = query(
          baseQuery,
          where("first_name", "==", firstName),
          where("last_name", "==", lastName)
        );
        // const q = query(
        //   baseQuery,
        //   ...constraints
        // );
        
        
        const querySnapshot= await getDocs(q);
        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0].data();
          const psychiatrist = docData as IPsychiatrist;
          return psychiatrist;
        } else {
          throw new Error(`No psychiatrist found with the name: ${firstName} ${lastName}`);
        }
      } catch (error) {
        console.error("Error fetching professional data:", error);
        return null;
      }
}
/** To fetch all psychiatrists that meet a specified parameter if provided
 *  Can technically do the same as the above*/
const fetchAllPsychiatrist = async (constraints: QueryConstraint[]): Promise<IPsychiatrist[] | null> => {
    try {
      const baseQuery = collection(db, PYSCHIATRIST);
      const q = query(baseQuery, ...constraints);
      const querySnapshot = await getDocs(q)
      
      const fetchedPsychiatrists: IPsychiatrist[] = [];
      querySnapshot.forEach(doc => {
        fetchedPsychiatrists.push(doc.data() as IPsychiatrist)
      });

      return fetchedPsychiatrists;
    } catch (err: any) {
      console.error("Error fetching all professionals: ", err.message);
      return null;
    }
  }

const updatePsychiatrist = async (id: string | undefined , updatedPsychiatrist: Partial<IPsychiatrist>): Promise<void> => {
  try {
    if (id){
      const psychiatristRef = doc(db, PYSCHIATRIST, id);
    await updateDoc(psychiatristRef, updatedPsychiatrist);
    }
  } catch (error) {
    console.error("Error updating psychiatrist entry: ", error);
  }
  }


  const deletePsychiatrist = async (id: string | undefined): Promise<void> => {
    try {
      if (id){
        const psychiatristRef =doc(db, PYSCHIATRIST, id);
        await deleteDoc(psychiatristRef);
      }
    } catch (error) {
        console.error("Error deleting psychiatrist entry: ", error);
    }
}



  
export { createPsychiatrist, fetchPsychiatrist, fetchAllPsychiatrist, updatePsychiatrist, deletePsychiatrist };