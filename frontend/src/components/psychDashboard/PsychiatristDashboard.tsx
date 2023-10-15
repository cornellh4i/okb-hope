import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import AppointmentList from '../dashboard/AppointmentList';
import PsychiatristList from '../psychiatrists/PsychiatristCardsListing';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { db } from "../../../firebase/firebase";

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.toLocaleString('default', { month: 'long' }); // Full month name
const dayOfMonth = currentDate.getDate();
const dayOfWeek = currentDate.toLocaleString('default', { weekday: 'long' }); // Full day of the week name
const dateHeaderString = `${month} ${dayOfMonth}, ${year}`;
const dateString = `${dayOfWeek}, ${month} ${dayOfMonth}`;


const PsychiatristDashboard = () => {
    return <React.Fragment>
        <div className="w-[1440px] h-[1141px] relative bg-neutral-100">
            {/* the side-bar part of dashboard, containing calendar */}
            <div className="w-[264px] h-[274px] bg-white rounded-[10px] shadow" >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar defaultValue={dayjs(currentDate)} />
                </LocalizationProvider>   
            </div>

            {/* the header part of dashboard, containing week */}
            <div className="w-[1114px] h-[53px] py-3 bg-sky-700 rounded-[10px] justify-center items-center inline-flex">  
                <div className="w-[271px] h-[29px] left-[45.50px] top-0 absolute justify-start items-center gap-4 inline-flex">
                    <div className="text-white text-2xl font-semibold font-['Montserrat']">Week of ${dateHeaderString}</div>
                </div>
            </div>  
                
            {/* the main body of dashboard, containing appointments */}
            <div className="w-[806px] h-[906px] flex-col justify-start items-start gap-9 inline-flex">
                <div className="left-[467px] top-[193px] absolute flex-col justify-start items-start gap-9 inline-flex">    
                    <div className="relative">
                        <div className="w-[327.76px] left-0 top-0 absolute text-black text-2xl font-semibold font-['Montserrat']">${dateString}</div>
                    </div>
                </div>
            </div>
            
        </div>            
    </React.Fragment>
  }
  
export default PsychiatristDashboard;