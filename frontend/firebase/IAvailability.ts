import { db } from './firebase';
import { getDocs, collection, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { IAvailability } from '@/schema';

const AVAILABILITY_COLLECTION = "Availability";

const createAvailability = async (availability: IAvailability): Promise<void> => {
    try {
        await addDoc(collection(db, AVAILABILITY_COLLECTION), availability);
    } catch (error) {
        console.error("Error adding availability entry: ", error);
    }
}

const fetchAvailability = async (queryFunction: (q: any) => any): Promise<IAvailability[] | null> => {
    try {
        const q = queryFunction(collection(db, AVAILABILITY_COLLECTION));
        const querySnapshot = await getDocs(q);
        const availabilities: IAvailability[] = [];
        querySnapshot.forEach(doc => {
            availabilities.push(doc.data() as IAvailability);
        });
        return availabilities;
    } catch (error) {
        console.error("Error fetching availability entry: ", error);
        return null;
    }
}

const updateAvailability = async (id: string, updatedAvailability: Partial<IAvailability>): Promise<void> => {
    try {
        const availabilityRef = doc(db, AVAILABILITY_COLLECTION, id);
        await updateDoc(availabilityRef, updatedAvailability);
    } catch (error) {
        console.error("Error updating availability entry: ", error);
    }
}

const deleteAvailability = async (id: string): Promise<void> => {
    try {
        const availabilityRef = doc(db, AVAILABILITY_COLLECTION, id);
        await deleteDoc(availabilityRef);
    } catch (error) {
        console.error("Error deleting availability entry: ", error);
    }
}

export { createAvailability, fetchAvailability, updateAvailability, deleteAvailability };