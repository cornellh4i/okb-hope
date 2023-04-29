import CalendarIcon from '../../assets/calendar.svg'
import ClockIcon from '../../assets/clock.svg'
import React from 'react'

interface AppointmentCard {
  p_name: string,
  start: Date,
  end: Date
}


const AppointmentCard = ({ p_name, start, end, description }: { p_name: string, start: Date, end: Date, description: string }) => {

  // calculation of # days remaining until appt
  const daysTo = Math.floor((start.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
  const month = start.toLocaleString('default', { month: 'long' });
  const day = start.toLocaleString('default', { weekday: 'long' });
  return (
    <div>
      <div className="card w-11/12 bg-base-100 shadow-xl">
        <div className="card-body">
          <p>In {daysTo} days</p>
          <h2 className="card-title">Meeting with {p_name}</h2>
          <div className="grid grid-cols-5 grid-rows-2 gap-4 items-center pb-1/12">
            {/* row 1: day, date of appointment */}
            <div className="col-span-1 shrink"><CalendarIcon></CalendarIcon></div>
            <div className="col-span-4"><p>{day}, {month} {start.getDay()}</p></div>
            {/* row 2: time of appointment */}
            <div className="col-span-1 shrink"><ClockIcon></ClockIcon></div>
            {/* calculation of appointment time */}
            <div className="col-span-4"><p>{start.getHours()}:{start.getMinutes()} - {end.getHours()}:{end.getMinutes()}</p></div>
          </div>
          <div className="card-actions justify-center">
            <button className="btn w-7/12" >More Info</button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default AppointmentCard;