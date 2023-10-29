import { db } from './firebase';
import { getDocs, collection, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { IAppointment } from '@/schema';

const APPOINTMENT_COLLECTION = "Appointments";

const createAppointment = async (appointment: IAppointment): Promise<void> => {
    try {
        await addDoc(collection(db, APPOINTMENT_COLLECTION), appointment);
    } catch (error) {
        console.error("Error adding appointment entry: ", error);
    }
}

const fetchAppointment = async (queryFunction: (q: any) => any): Promise<IAppointment[] | null> => {
    try {
        const q = queryFunction(collection(db, APPOINTMENT_COLLECTION));
        const querySnapshot = await getDocs(q);
        const appointments: IAppointment[] = [];
        querySnapshot.forEach(doc => {
            appointments.push(doc.data() as IAppointment);
        });
        return appointments;
    } catch (error) {
        console.error("Error fetching appointment entry: ", error);
        return null;
    }
}

const updateAppointment = async (id: string, updatedAppointment: Partial<IAppointment>): Promise<void> => {
    try {
        const appointmentRef = doc(db, APPOINTMENT_COLLECTION, id);
        await updateDoc(appointmentRef, updatedAppointment);
    } catch (error) {
        console.error("Error updating appointment entry: ", error);
    }
}

const deleteAppointment = async (id: string): Promise<void> => {
    try {
        const appointmentRef = doc(db, APPOINTMENT_COLLECTION, id);
        await deleteDoc(appointmentRef);
    } catch (error) {
        console.error("Error deleting appointment entry: ", error);
    }
}

export { createAppointment, fetchAppointment, updateAppointment, deleteAppointment };
