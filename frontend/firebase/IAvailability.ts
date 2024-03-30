import { db } from './firebase';
import { getDocs, collection, addDoc, updateDoc, deleteDoc, doc, query, QueryConstraint, setDoc } from "firebase/firestore";
import { IAppointment, IAvailability } from '@/schema';
import axios from 'axios';


const AVAILABILITY_COLLECTION = "availabilities";
const APPOINTMENT_COLLECTION = "appointments";

const rescheduleCalendlyAppointment = async (uuid, reason) => {
    const options = {
      method: 'POST',
      url: `https://api.calendly.com/scheduled_events/${uuid}/cancellation`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer YOUR_ACCESS_TOKEN'
      },
      data: { reason }
    };
  
    try {
      const response = await axios.request(options);
      console.log("Calendly cancellation successful:", response.data);
      return true; // Indicate success
    } catch (error) {
      console.error("Calendly cancellation failed:", error);
      throw new Error("Failed to cancel the Calendly appointment."); // Propagate error
    }
  };

  const deleteCalendlyAppointment = async (uuid, reason) => {
    const options = {
      method: 'POST',
      url: `https://api.calendly.com/scheduled_events/${uuid}/cancellation`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer YOUR_ACCESS_TOKEN'
      },
      data: { reason }
    };
  
      await axios.request(options).then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        console.error(error);
      });
  };


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
};

const deleteAppointment = async (toBeDeletedAppointed : IAppointment): Promise<void> => {
    try {
        await deleteCalendlyAppointment(toBeDeletedAppointed.appointId, "Deleting");

        const appointmentRef = doc(db, APPOINTMENT_COLLECTION, toBeDeletedAppointed.availId);
        await deleteDoc(appointmentRef);
    } catch (error) {
        console.error("Error deleting appointment entry: ", error);
    }
}

const rescheduleAppointment = async (updatedAppointment : IAppointment) => {
    try {
      await rescheduleCalendlyAppointment(updatedAppointment.appointId, "Rescheduling");
      
      const appointmentRef = doc(db, APPOINTMENT_COLLECTION, updatedAppointment.availId);
      await setDoc(appointmentRef, updatedAppointment);
  
      console.log("Appointment rescheduled successfully.");
    } catch (error) {
      console.error("Error updating availability entry: ", error);
    }
  };

export { createAvailability, fetchAvailability, updateAvailability, deleteAvailability, deleteAppointment, rescheduleAppointment };
