import { db } from './firebase';
import { getDocs, collection, addDoc, updateDoc, deleteDoc, doc, query, QueryConstraint, setDoc } from "firebase/firestore";
import { IAvailability } from '@/schema';

const AVAILABILITY_COLLECTION = "availabilities";

const createAvailability = async (availability: IAvailability): Promise<IAvailability> => {
    try {
        const newDocRef = doc(collection(db, AVAILABILITY_COLLECTION));
        availability.availId = newDocRef.id;
        await setDoc(newDocRef, availability);
    } catch (error) {
        console.error("Error adding availability entry: ", error);
    }
    return availability;
}

const fetchAvailability = async (constraints: QueryConstraint[]): Promise<IAvailability[] | null> => {
    try {
        const baseQuery = collection(db, AVAILABILITY_COLLECTION);
        const q = query(baseQuery, ...constraints);
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

const updateAvailability = async (updatedAvailability: IAvailability): Promise<void> => {
    try {
        const availabilityRef = doc(db, AVAILABILITY_COLLECTION, updatedAvailability.availId);
        await setDoc(availabilityRef, updatedAvailability);
    } catch (error) {
        console.error("Error updating availability entry: ", error);
    }
}

const deleteAvailability = async (toBeDeletedAvailability: IAvailability): Promise<void> => {
    try {
        const availabilityRef = doc(db, AVAILABILITY_COLLECTION, toBeDeletedAvailability.availId);
        await deleteDoc(availabilityRef);
    } catch (error) {
        console.error("Error deleting availability entry: ", error);
    }
}

export { createAvailability, fetchAvailability, updateAvailability, deleteAvailability };