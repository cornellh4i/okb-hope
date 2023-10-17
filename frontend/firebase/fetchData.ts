import { IPsychiatrist } from "@/schema";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export default async function fetchAllProfessionals(): Promise<IPsychiatrist[]> {
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