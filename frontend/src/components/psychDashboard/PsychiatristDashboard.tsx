import React, { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
// import AppointmentList from './AppointmentList';
import AppointmentCard from './AppointmentCard';
import PsychiatristList from '../psychiatrists/PsychiatristCardsListing';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { db } from "../../../firebase/firebase";
import App from '@/pages/_app';

import fetchAppointments, { AppointmentType } from '../../../firebase/fetchAppointments';

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.toLocaleString('default', { month: 'long' }); // Full month name
const dayOfMonth = currentDate.getDate();
const dayOfWeek = currentDate.toLocaleString('default', { weekday: 'long' }); // Full day of the week name
const dateHeaderString = `${month} ${dayOfMonth}, ${year}`;
const dateString = `${dayOfWeek}, ${month} ${dayOfMonth}`;

const PsychiatristDashboard = () => {
  const [defaultValue, setValue] = React.useState<Dayjs | null>(dayjs(currentDate));

  const [appointments, setAppointments] = useState<AppointmentType[]>([]); // State to store appointments
  useEffect(()=>{
    fetchAppointments().then( (data) => {
      setAppointments(data);
    })
    .catch((error) => {
      console.error("Error fetching appointments:", error);
    });
  },[]);

    return <React.Fragment>
        <div className=" w-full h-[1141px] relative bg-neutral-100">
            {/* the header part of dashboard, containing week */}
            <div className="flex flex-col justify-center items-center">
            <div id="blueheader" className="flex w-[1114px] h-[53px] py-3 bg-sky-700 rounded-[10px] justify-center items-center inline-flex">  
                <div className="relative">
                    <div className="flex w-[362px] h-[29px] top-0 justify-center items-center gap-4 inline-flex">
                        <div className="text-white text-2xl font-semibold font-montserrat">Week of {dateHeaderString}</div>
                    </div>
                    <div className="w-2.5 h-5 left-0 top-[4px] absolute flex-col justify-start items-start gap-2.5 inline-flex">
                      <svg width="10" height="20" viewBox="0 0 10 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_2452_9242)">
                        <path d="M7.5 18C7.14844 18 6.83594 17.8828 6.60156 17.6484L0.351562 11.3984C-0.15625 10.9297 -0.15625 10.1094 0.351562 9.64062L6.60156 3.39062C7.07031 2.88281 7.89062 2.88281 8.35938 3.39062C8.86719 3.85938 8.86719 4.67969 8.35938 5.14844L3.00781 10.5L8.35938 15.8906C8.86719 16.3594 8.86719 17.1797 8.35938 17.6484C8.125 17.8828 7.8125 18 7.5 18Z" fill="#FFFDFD"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_2452_9242">
                        <rect width="10" height="20" fill="white"/>
                        </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className="w-2.5 h-5 left-[352px] top-[4px] absolute flex-col justify-start items-start gap-2.5 inline-flex">
                      <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.5 18C2.14844 18 1.83594 17.8828 1.60156 17.6484C1.09375 17.1797 1.09375 16.3594 1.60156 15.8906L6.95312 10.5L1.60156 5.14844C1.09375 4.67969 1.09375 3.85938 1.60156 3.39062C2.07031 2.88281 2.89062 2.88281 3.35938 3.39062L9.60938 9.64062C10.1172 10.1094 10.1172 10.9297 9.60938 11.3984L3.35938 17.6484C3.125 17.8828 2.8125 18 2.5 18Z" fill="#FFFDFD"/>
                      </svg>
                    </div>
                </div>    
            </div>
            </div> 

            {/* the side-bar part of dashboard, containing calendar */}
            <div className="w-[264px] h-[274px] bg-white rounded-[10px] shadow" >
                <div className="w-[216px] h-[226px] relative">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar value={defaultValue} onChange={(newValue) => setValue(newValue)} />
                    </LocalizationProvider>   
                </div>
            </div>


            {/* the main body of dashboard, containing appointments */}
            <div className="inline-flex flex-col flex-start gap-9">
              <div className="w-[806px] h-[278px]">
                <div className="flex flex-col justify-start items-start gap-3 inline-flex">
                    <div className="left-[467px] top-[193px] absolute flex-col justify-start items-start gap-9 inline-flex">    
                        <div className="relative">
                            <div className="flex w-[327.76px] left-0 top-0 absolute text-black text-2xl font-semibold font-['Montserrat']">{dateString}</div>
                            {/* <AppointmentCard /> */}
                            {AppointmentCard({p_name:"JC",time_start:"10",time_end:"11"})}
                        </div>
                    </div>
                </div>
              </div>
            </div>
        </div>            
    </React.Fragment>
  }
  
export default PsychiatristDashboard;