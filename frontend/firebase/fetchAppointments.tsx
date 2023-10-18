import { db } from "./firebase";
import { collection,getDocs } from "firebase/firestore";

export interface AppointmentType {
  id:string;
  date:string;
  patient: string;
  start_time: string;
  end_time: string;
}

const appointmentRef = collection(db, "temp_appointments");

async function fetchAppointments() : Promise<AppointmentType[]> {
  try{
  const userSnapshot = await getDocs(appointmentRef);
  const users: AppointmentType[] = userSnapshot.docs.map((doc) => (
      { ...doc.data(), id: doc.id } as AppointmentType)
  );
  console.log(users);
  return users;
  }
  catch(err:any){
    console.log(err);
    return[];
  }
}

export default fetchAppointments