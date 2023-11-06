import React, {useState, useEffect} from 'react';
import AppointmentCard from './AppointmentCard';
import results from '@/temp_data/appointments.json'; // appointment info 
import { db,auth } from '../../../firebase/firebase';
import { collection, DocumentData, query, where, getDocs, doc } from 'firebase/firestore';
import { fetchPatientDetails, fetchApptDetails } from '../../../firebase/fetchData';
// import NoUpcomingAppointments from './NoUpcomingAppointments';
import savedPsych from '@/temp_data/savedpsych.json';

const AppointmentList = () => {
  const uid = auth.currentUser?.uid;
  const [appointments, setAppointments] = useState<(DocumentData | null)[]>([]);
  
  useEffect(() => {
    const fetchAppts = async () => {
      if (uid) {
        const apptData = await fetchApptDetails(uid);
        console.log(apptData);
        if (apptData){
          const filteredApptData = apptData.filter((data) => data !== null);
          console.log(filteredApptData);
          setAppointments(filteredApptData);
        }
      }
    }
    fetchAppts();
  }, [uid]);

  const appointmentCards = (() => {
    if (appointments?.length) {
      // const appointmentElements : JSX.Element[] = [];
      // for (const appointment in appointments) {
      //   const profId = (appointment as any)?.profId;
      //   const psychRef = collection(db, 'psychiatrists');
      //   const q = query(psychRef, where('profId', '==', profId));
      //   const querySnapshot = await getDocs(q);
      //   if (!querySnapshot.empty) {
      //     querySnapshot.forEach((doc) => {
      //       const psychData = doc.data();
      //       const appointmentElement = (
      //         <div key={(appointment as any)?.appointId.toString()} className="appointment">
      //           <AppointmentCard
      //             p_name={psychData.firstName + " " + psychData.lastName} 
      //             start={(appointment as any)?.startTime.toDate()}
      //             end={(appointment as any)?.endTime.toDate()}
      //           />
      //         </div>
      //       );
      //       appointmentElements.push(appointmentElement);
  
      //     });
      //   } 
      // }
      // return appointmentElements;
      return appointments.map(appointment => (
        <div key={appointment?.appointId.toString()} className="appointment"> 
          <AppointmentCard
            p_name={appointment?.profId}
            start={appointment?.startTime.toDate()}
            end={appointment?.endTime.toDate()}
          />
        </div>
      ));
    } else {
      return <div>You have no upcoming appointments.</div>
    }
  })();

  return (
    // renders a card containing all of the AppointmentCards 
    <React.Fragment>
      <div className="card w-full bg-base-100">
        <div className="card-body">
          <h1 className="card-title pt-1/15 text-[32px]">Appointments</h1>
          <div className="grid grid-row-4 gap-4 items-center pt-1/12 shrink">
            {appointmentCards}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AppointmentList;
