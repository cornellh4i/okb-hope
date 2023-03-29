import React from 'react';
import AppointmentCard from './AppointmentCard';
import results from '../../appointments.json';


// { results }
const AppointmentList = () => {

  // const arr = Array.from(Array(results.length).keys)
  return (

    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <h1 className="card-title pt-1/15">Upcoming Appointments</h1>
        <div className="grid grid-cols-4 gap-4 items-center pb-1/12 shrink">
          {[results].map(appointment => (
            <div key={appointment.id.toString()} className="appointment">
              <AppointmentCard p_name={appointment.name} start={new Date(appointment.start)} end={new Date(appointment.end)} description={appointment.description}></AppointmentCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  )


  //   <div className="appointment-list">
  //     {results.map(appointment => (
  //       <div key={appointment.id} className="appointment">
  //         <AppointmentCard p_name={appointment.name[0]} start={new Date(appointment.start)} end={new Date(appointment.end)} description={appointment.description}></AppointmentCard>
  //       </div>
  //     ))}
  //   </div>
  // );
};


export default AppointmentList;