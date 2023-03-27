import Image from 'next/image'
import CalendarIcon from '../assets/calendar.svg'
import ClockIcon from '../assets/clock.svg'
import ArrowIcon from '../assets/arrow.svg'
import React, { ReactNode, useState } from 'react'
// import { StyleSheet, View } from 'react-native'
// import Flex from 'typescript-styled-flex'

interface AppointmentCard {
  p_name: string,
  start: Date,
  end: Date
}



const AppointmentCard = ({ children, p_name, start, end, description }: { children: ReactNode, p_name: string, start: Date, end: Date, description: string }) => {
  const [isShown, setIsShown] = useState(false);

  const handleClick = event => {
    setIsShown(!isShown);
  };

  const daysTo = Math.floor((start.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
  const month = start.toLocaleString('default', { month: 'long' });
  const day = start.toLocaleString('default', { weekday: 'long' });
  return (
    <div>
      {!isShown && <div className="card w-11/12 bg-base-100 shadow-xl">
        <div className="card-body">
          <p>In {daysTo} days</p>
          <h2 className="card-title">Meeting with {p_name}</h2>

          <div className="grid grid-cols-5 grid-rows-2 gap-4 items-center pb-1/12">
            <div className="col-span-1 shrink"><CalendarIcon></CalendarIcon></div>
            <div className="col-span-4"><p>{day}, {month} {start.getDay()}</p></div>
            <div className="col-span-1 shrink"><ClockIcon></ClockIcon></div>
            <div className="col-span-4"><p>{start.getHours()}:{start.getMinutes()} - {end.getHours()}:{end.getMinutes()}</p></div>
          </div>

          <div className="card-actions justify-center">
            <button className="btn w-7/12" onClick={handleClick}>More Info</button>


          </div>
        </div>
      </div>}
      {isShown &&
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <button className="btn btn-square btn-sm" onClick={handleClick}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <h1 className="text-2xl font-bold"> Meeting with {p_name}</h1>
              <div className="grid grid-cols-5 grid-rows-2 gap-4 items-center pb-1/12">
                <div className="col-span-1 shrink"><CalendarIcon></CalendarIcon></div>
                <div className="col-span-4"><p>{day}, {month} {start.getDay()}, {start.getUTCFullYear()}</p></div>
                <div className="col-span-1 shrink"><ClockIcon></ClockIcon></div>
                <div className="col-span-4"><p>{start.getHours()}:{start.getMinutes()} - {end.getHours()}:{end.getMinutes()}</p></div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>

  );
};



export default AppointmentCard;