import { app, db } from './firebase';
import { getDocs, collection, addDoc, updateDoc, deleteDoc, doc, QueryConstraint, query, setDoc } from "firebase/firestore";
import { IAppointment } from '@/schema';

const APPOINTMENT_COLLECTION = "appointments";

const createAppointment = async (appointment: IAppointment): Promise<IAppointment> => {
    try {
        const newDocRef = doc(collection(db, APPOINTMENT_COLLECTION));
        appointment.appointId = newDocRef.id
        await setDoc(newDocRef, appointment)
    } catch (error) {
        console.error("Error adding appointment entry: ", error);
    }
    return appointment
}

const fetchAppointment = async (constraints: QueryConstraint[]): Promise<IAppointment[] | null> => {
    try {
        const baseQuery = collection(db, APPOINTMENT_COLLECTION);
        const q = query(baseQuery, ...constraints);
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

const updateAppointment = async (updatedAppointment: IAppointment): Promise<void> => {
    try {
        const appointmentRef = doc(db, APPOINTMENT_COLLECTION, updatedAppointment.appointId);
        await setDoc(appointmentRef, updatedAppointment);
    } catch (error) {
        console.error("Error updating appointment entry: ", error);
    }
}

const deleteAppointment = async (updatedAppointment: IAppointment): Promise<void> => {
    try {
        const appointmentRef = doc(db, APPOINTMENT_COLLECTION, updatedAppointment.appointId);
        await deleteDoc(appointmentRef);
    } catch (error) {
        console.error("Error deleting appointment entry: ", error);
    }
}

export { createAppointment, fetchAppointment, updateAppointment, deleteAppointment };
