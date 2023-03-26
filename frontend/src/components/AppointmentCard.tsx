import Image from 'next/image'
import CalendarIcon from '../assets/calendar.svg'
import ClockIcon from '../assets/clock.svg'
import React, { ReactNode , useState} from 'react'
import {StyleSheet, View} from 'react-native'
import Flex from 'typescript-styled-flex'

interface AppointmentCard {
  p_name : string,
  start : Date,
  end : Date
}



const AppointmentCard = ({children, p_name, start, end} : {children: ReactNode, p_name : string, start: Date, end: Date}) => {
  const [isShown, setIsShown] = useState(false);

  const handleClick = event => {
    setIsShown(true);
  };

  const daysTo = Math.floor((start.getTime() - new Date().getTime()) / (1000*60*60*24))
  const month = start.toLocaleString('default', { month: 'long' });
  const day = start.toLocaleString('default', { weekday: 'long' });
  return (
      <div className="card w-11/12 bg-base-100 shadow-xl">
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
            <button className="btn w-7/12" onClick ={handleClick}>More Info</button>

            {isShown && <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Card title!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div> }
          </div>
        </div>
      </div>
  ); 
};



export default AppointmentCard;