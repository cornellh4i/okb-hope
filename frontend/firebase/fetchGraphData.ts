import { db } from './firebase';
import { IPatient } from '@/schema';
import { getDocs, collection, QueryConstraint, query } from "firebase/firestore";

const PATIENT = "patients";

// const fetchPatient = async (constraints: QueryConstraint[]): Promise<IPatient[] | null> => {
//     try {
//         const baseQuery = collection(db, PATIENT);
//         const q = query(baseQuery, ...constraints);
//         const querySnapshot = await getDocs(q);

//         const patients: IPatient[] = [];
//         querySnapshot.forEach(doc => {
//             patients.push(doc.data() as IPatient);
//         });
//         console.log(patients)
//         return patients;
//     } catch (error) {
//         console.error("Error fetching patient entry: ", error);
//         return null;
//     }
// }

const fetchAllPatients = async () => {
    try {
        console.log("hello");
        const patientRef = collection(db, 'patients');
        const snapshot = await getDocs(patientRef);
        const fetchedPatients: IPatient[] = snapshot.docs.map((doc) => doc.data() as IPatient);
        return fetchedPatients;
    } catch (err: any) {
        console.error(err.message);
        throw err;
    }
}

export { fetchAllPatients };

