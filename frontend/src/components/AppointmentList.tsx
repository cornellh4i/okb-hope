import React from 'react';
import AppointmentCard from './AppointmentCard';
import results from '../../appointments.json'; // appointment info 

const AppointmentList = () => {
  // Convert the results object into an array
  const appointmentsArray = Object.values(results);

  return (
    // renders a card containing all of the AppointmentCards 
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <h1 className="card-title pt-1/15">Upcoming Appointments</h1>
        <div className="grid grid-cols-4 gap-4 items-center pb-1/12 shrink">
          {/* map each JSON object to each individual AppointmentCard*/}
          {appointmentsArray.map(appointment => (
            <div key={appointment.id.toString()} className="appointment">
              <AppointmentCard p_name={appointment.name} start={new Date(appointment.start)} end={new Date(appointment.end)} description={appointment.description}></AppointmentCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppointmentList;
