import React from 'react';
import AppointmentCard from './AppointmentCard';
import results from '@/temp_data/appointments.json'; // appointment info 
// import NoUpcomingAppointments from './NoUpcomingAppointments';
import savedPsych from '@/temp_data/savedpsych.json';

const AppointmentList = () => {
  // Convert the results object into an array
  const appointmentsArray = Object.values(results);

  // let psychNamesArray = savedPsych;
  appointmentsArray.length = 0;

  const appointmentCards = (() => {
    if (appointmentsArray?.length) {
      return appointmentsArray.map(appointment => (
        <div key={appointment.id.toString()} className="appointment">
          <AppointmentCard
            p_name={appointment.name}
            start={new Date(appointment.start)}
            end={new Date(appointment.end)}
            description={appointment.description}
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
