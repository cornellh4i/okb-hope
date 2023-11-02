import { db } from './firebase';
import { getDoc, getDocs, collection, addDoc, updateDoc, deleteDoc, doc, QueryConstraint, query } from "firebase/firestore";
import { IPatient } from '@/schema';

const PATIENT = "patients";

const createPatient = async (patient: IPatient): Promise<void> => {
    try {
        await addDoc(collection(db, PATIENT), patient);
    } catch (error) {
        console.error("Error adding patient entry: ", error);
    }
}

  
  const fetchPatient = async (constraints: QueryConstraint[]): Promise<IPatient[] | null> => {
    try {
        const baseQuery = collection(db, PATIENT);
        const q = query(baseQuery, ...constraints);
        const querySnapshot = await getDocs(q);

        const patients: IPatient[] = [];
        querySnapshot.forEach(doc => {
            patients.push(doc.data() as IPatient);
        });

        return patients;
    } catch (error) {
        console.error("Error fetching patient entry: ", error);
        return null;
    }
}


const updatePatient = async (id: string | undefined, updatedPatient: Partial<IPatient>): Promise<void> => {
    try {
        if (id) {
            const patientRef = doc(db, PATIENT, id);
            await updateDoc(patientRef, updatedPatient);
        }
        
    } catch (error) {
        console.error("Error updating patient entry: ", error);
    }
}

const deletePatient = async (id: string | undefined): Promise<void> => {
    try {
        if (id){
            const patientRef = doc(db, PATIENT, id);
            await deleteDoc(patientRef);
        }
        
    } catch (error) {
        console.error("Error deleting patient entry: ", error);
    }
}

export { createPatient, fetchPatient, updatePatient, deletePatient };