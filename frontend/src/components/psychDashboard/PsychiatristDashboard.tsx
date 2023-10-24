import React, { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
// import AppointmentList from './AppointmentList';
import AppointmentCard from './AppointmentCard';
import PsychiatristList from '../psychiatrists/PsychiatristCardsListing';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { sizing } from '@mui/system';
import { db } from "../../../firebase/firebase";
import App from '@/pages/_app';
import results from '../../temp_data/appointments.json'; // appointment info
import fetchAppointments, { AppointmentType } from '../../../firebase/fetchAppointments';
import { IAppointment } from '@/schema';


const PsychiatristDashboard = () => {
    const [currentDate, setCurrentDate] = useState<dayjs.Dayjs>(dayjs());
    const year = currentDate.year();
    const month = currentDate.format('MMMM');
    const monthNum = currentDate.format('M');

    const dayOfMonth = currentDate.date();
    const dayOfWeek = currentDate.format('dddd');
    const dateHeaderString = `${month} ${dayOfMonth}, ${year}`;
    const dateString = `${dayOfWeek}, ${month} ${dayOfMonth}`;
    const dateMDY = `${year}-${monthNum}-${dayOfMonth}`;
    const startOfWeek = currentDate.startOf('week');
    const endOfWeek = currentDate.endOf('week');

    // Handler for the next week button click
    const goToNextWeek = () => {
        const nextWeek = currentDate.add(7, 'day');
        setCurrentDate(nextWeek);
      };
    
    // Handler for the previous week button click
    const goToPreviousWeek = () => {
        const previousWeek = currentDate.subtract(7, 'day');
        setCurrentDate(previousWeek);
      };
    
    const [appointments, setAppointments] = useState<AppointmentType[]>([]); // State to store appointments
    useEffect(()=>{
        fetchAppointments().then( (data) => {
        setAppointments(data);
        })
        .catch((error) => {
        console.error("Error fetching appointments:", error);
        });
    },[]);

    const apts: IAppointment[] = Object.values(results);

    // const appointmentCards = apts.map((apt: IAppointment) => {

    //     const p_name = apt.name; 
    //     const time_start = dayjs(apt.start);
    //     const time_end = dayjs(apt.end);
    //     const timeStartDateString = time_start.format('YYYY-MM-DD');
    //     // returning the AppointmentCard for each appointment
    //     if (timeStartDateString === dateMDY) {
    //         return (
    //             <AppointmentCard 
    //                 p_name={p_name} 
    //                 time_start={time_start.format('HH:mm')} 
    //                 time_end={time_end.format('HH:mm')} 
    //             />
    //         );
    //     }
    // });

    const aptsByDay: { [key: string]: IAppointment[] } = {};
    apts.forEach((apt: IAppointment) => {
        const time_start = dayjs(apt.start);
        const timeStartDateString = time_start.format('YYYY-MM-DD');

        if (time_start.isAfter(startOfWeek) && time_start.isBefore(endOfWeek)) {
            if (!aptsByDay[timeStartDateString]) {
                aptsByDay[timeStartDateString] = [];
            }
            aptsByDay[timeStartDateString].push(apt);
        }
    });

    const sortedDates = Object.keys(aptsByDay).sort((a, b) => {
        if (a === dateMDY) return -1;
        if (b === dateMDY) return 1;
        return dayjs(a).isBefore(dayjs(b)) ? -1 : 1;
    });

    const appointmentSections = sortedDates.map(dateString => {
        const aptForDay = aptsByDay[dateString];
        return (
            <div key={dateString} className="relative mb-5">
                <div className="flex w-[px] ml-10 top-0 absolute text-black text-2xl font-semibold font-montserrat">
                    {dayjs(dateString).format('dddd, MMMM D')}
                </div>
                <div className="mt-10">
                    {aptForDay.map(apt => (
                        <AppointmentCard
                            key={apt.id}
                            p_name={apt.name}
                            time_start={dayjs(apt.start).format('HH:mm')}
                            time_end={dayjs(apt.end).format('HH:mm')}
                        />
                    ))}
                </div>
            </div>
        );
    });


    return (
        <div className="w-full h-[full]">
            {/* the header part of dashboard, containing week */}
            {/* Fix width */}
            <div className="flex flex-col justify-center items-center">
                <div id="blueheader" className="flex w-[1114px] h-[53px] py-3 bg-sky-700 rounded-[10px] justify-center items-center inline-flex">  
                    <div className="relative">
                        <div className="flex w-[362px] h-[29px] top-0 justify-center items-center gap-4 inline-flex">
                            <div className="text-white text-2xl font-semibold font-montserrat">Week of {dateHeaderString}</div>
                        </div>
                        <div className="w-2.5 h-5 left-0 top-[4px] absolute flex-col justify-start items-start gap-2.5 inline-flex">
                                        
                        <button onClick={goToPreviousWeek}>
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
                        </button>

                        </div>
                        <div className="w-2.5 h-5 left-[352px] top-[4px] absolute flex-col justify-start items-start gap-2.5 inline-flex">
                        <button onClick={goToNextWeek}>
                        <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.5 18C2.14844 18 1.83594 17.8828 1.60156 17.6484C1.09375 17.1797 1.09375 16.3594 1.60156 15.8906L6.95312 10.5L1.60156 5.14844C1.09375 4.67969 1.09375 3.85938 1.60156 3.39062C2.07031 2.88281 2.89062 2.88281 3.35938 3.39062L9.60938 9.64062C10.1172 10.1094 10.1172 10.9297 9.60938 11.3984L3.35938 17.6484C3.125 17.8828 2.8125 18 2.5 18Z" fill="#FFFDFD"/>
                        </svg>
                        </button>
                        </div>
                    </div>    
                </div>
            </div> 
            <div className="flex flex-row justify-center pt-10">
                {/* the side-bar part of dashboard, containing calendar */}
                <div className="w-[320px] h-[300px] bg-white rounded-[10px] shadow" >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar value={currentDate} onChange={(newValue: dayjs.Dayjs | null) => {setCurrentDate(newValue ?? dayjs());}}  />
                    </LocalizationProvider>   
                </div>    
        
                {/* the main body of dashboard, containing appointments */}
                <div className="ml-40px mt-40px w-[806px] flex-col justify-start items-start gap-6 inline-flex overflow-y-auto h-[825px]">
                    {appointmentSections}
                </div>
            </div>
        </div>            
    )
  }
  
export default PsychiatristDashboard;