import React, { useState, useEffect } from 'react';
import AppointmentCard from './AppointmentCard';
import { db, auth } from '../../../firebase/firebase';
import { getDoc, doc, query, collection, where, getDocs } from 'firebase/firestore';
import { fetchApptDetails } from '../../../firebase/fetchData';
import { IAppointment, IPsychiatrist } from '@/schema';
import { useAuth } from '../../../contexts/AuthContext';

const AppointmentList = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [psychiatristNames, setPsychiatristNames] = useState<string[]>([]);
  useEffect(() => {
    const fetchAppts = async () => {
      if (user) {
        const apptData = await fetchApptDetails(user.uid, user?.userType);
        if (apptData) {
          const currTime = new Date().getTime()
          const filteredApptData = apptData.filter((data) => data !== null && Math.floor((data.startTime.toDate().getTime() - currTime) / (1000 * 60 * 60 * 24)) >= 0);
          setAppointments(filteredApptData);
        }
      }
    }
    fetchAppts();
  }, [user]);

  useEffect(() => {
    console.log(appointments)
  }, [appointments])

  // connect to 'psychiatrists' collection to find psychiatrist's name. Match appointment's profId with psychiatrist's document id
  useEffect(() => {
    const fetchPsychNames = async () => {
      if (appointments.length > 0) {
        const names: string[] = []
        for (const appointment of appointments) {
          const q = query(
            collection(db, "psychiatrists"),
            where("uid", "==", appointment.profId)
          );
          const response = await getDocs(q);
          if (!response.empty) {
            const docData = response.docs[0].data();
            const psychiatrist = docData as IPsychiatrist;
            const psychiatristName: string = psychiatrist.firstName + " " + psychiatrist.lastName || '';
            names.push(psychiatristName);
          } else {
            throw new Error(`No psychiatrist found with the uid: ${appointment.profId}`);
          }
        }
        setPsychiatristNames(names)
      }
    };
    fetchPsychNames();
  }, [appointments]);

  const appointmentCards = () => {
    if (appointments.length > 0) {
      const sortedAppointments = appointments.slice().sort((a, b) => {
        return a.startTime.toDate().getTime() - b.startTime.toDate().getTime();
      });

      return sortedAppointments.map((appointment, index) => (
        <div key={appointment.appointId.toString()} className="appointment flex items-center justify-center w-full">
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
          <h1 className="card-title pt-1/15 text-[32px] md:items-start items-center md:justify-start justify-center font-montserrat">Appointments</h1>
          <div className="grid grid-row-4 gap-4 justify-center items-center pt-1/12 w-full">
            {appointmentCards()}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AppointmentList;
