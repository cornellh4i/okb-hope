import React, {useState, useEffect} from 'react';
import AppointmentCard from './AppointmentCard';
import { db,auth } from '../../../firebase/firebase';
import {  getDoc, doc } from 'firebase/firestore';
import {  fetchApptDetails } from '../../../firebase/fetchData';
import { IAppointment } from '@/schema';
// import NoUpcomingAppointments from './NoUpcomingAppointments';

const AppointmentList = () => {
  const uid = auth.currentUser?.uid;
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [psychiatristNames, setPsychiatristNames] = useState<string[]>([]);
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

  // connect to 'psychiatrists' collection to find psychiatrist's name. Match appointment's profId with psychiatrist's document id
  useEffect(() => {
    const fetchPsychNames = async () => {
      if(appointments.length>0) {
        const names : string[] = []
        for (const appointment of appointments){
          const psychiatristDocRef = doc(db, 'psychiatrists', appointment.profId);
          const psychiatristDocSnap = await getDoc(psychiatristDocRef);
          const psychiatristName : string = psychiatristDocSnap.data()?.position + " " + psychiatristDocSnap.data()?.firstName + " " + psychiatristDocSnap.data()?.lastName || '';
          names.push(psychiatristName);
        }
        setPsychiatristNames(names)
      }
    };
    fetchPsychNames();
  },[appointments]);

  const appointmentCards = () => {
    if (appointments.length > 0) {
      return appointments.map((appointment, index) => (
        <div key={appointment.appointId.toString()} className="appointment">
          <AppointmentCard
            p_name={psychiatristNames[index]}
            start={appointment.startTime.toDate()}
            end={appointment.endTime.toDate()}
          />
        </div>
      ));
    } else {
      return <div>You have no upcoming appointments.</div>;
    }
  };
      

  return (
    // renders a card containing all of the AppointmentCards 
    <React.Fragment>
      <div className="card w-full bg-base-100">
        <div className="card-body">
          <h1 className="card-title pt-1/15 text-[32px]">Appointments</h1>
          <div className="grid grid-row-4 gap-4 items-center pt-1/12 shrink">
            {appointmentCards()}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AppointmentList;
