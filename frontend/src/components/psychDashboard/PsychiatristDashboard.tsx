import React, { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import AppointmentCard from './AppointmentCard';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { IAppointment } from '@/schema';
import { useRouter } from 'next/router';
import { useAuth } from '../../../contexts/AuthContext';
import { fetchApptDetails } from '../../../firebase/fetchData';
import okb_colors from '@/colors';


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
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Check if user is available and navigate to dashboard if so
        if (user && user.userType == "psychiatrist") {
            router.push(`/psychiatrist/${user.uid}/psych_dashboard`);
        }
    }, [user]);

    // Handler for the next week button click
    const goToNextWeek = () => {
        const nextWeek = currentDate.add(7, 'day');
        setCurrentDate(nextWeek);
        // createAppointments();
    };

    // Handler for the previous week button click
    const goToPreviousWeek = () => {
        const previousWeek = currentDate.subtract(7, 'day');
        setCurrentDate(previousWeek);
    };

    const [appointments, setAppointments] = useState<IAppointment[]>([]); // State to store appointments

    // Fetch the psychiatrist's appointments
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

    const aptsByDay = {};
    appointments.forEach((apt) => {
        const time_start = dayjs(apt.startTime.toDate());
        const timeStartDateString = time_start.format('YYYY-MM-DD');

        if (time_start.isAfter(startOfWeek) && time_start.isBefore(endOfWeek)) {
            if (!aptsByDay[timeStartDateString]) {
                aptsByDay[timeStartDateString] = [];
            }
            aptsByDay[timeStartDateString].push(apt);
        }
    });

    const aptsForTheWeek = appointments.filter(apt => {
        const time_start = dayjs(apt.startTime.toDate());
        return (time_start.isAfter(currentDate) || time_start.isSame(currentDate, 'day')) && time_start.isBefore(currentDate.add(7, 'day'));
    });

    const todaysAppointments = aptsForTheWeek.filter(apt => dayjs(apt.startTime.toDate()).isSame(currentDate, 'day')).map((apt) => (
        <AppointmentCard
            patientId={apt.patientId}
            startTime={dayjs(apt.startTime.toDate())}
            endTime={dayjs(apt.endTime.toDate())}
        />
    ));

    const otherAppointments = Object.keys(aptsByDay).sort().map(dateKey => {
        const dayHeader = dayjs(dateKey).format('dddd, MMMM D');
        const dailyApts = aptsByDay[dateKey].map(apt => {
            const patientId = apt.patientId;
            const time_start = dayjs(apt.startTime.toDate());
            const time_end = dayjs(apt.endTime.toDate());
            return (
                <AppointmentCard
                    key={apt.id}
                    patientId={patientId}
                    startTime={time_start}
                    endTime={time_end}
                />
            );
        });

        return (
            <div key={dateKey}>
                <div className="text-black text-xl font-semibold font-montserrat mt-5">{dayHeader}</div>
                {dailyApts}
            </div>
        );
    });


    return (
        <div className="w-full h-full flex flex-col justify-center items-center content-center pt-8">
            {/* the header part of dashboard, containing week */}
            <div className="flex flex-col justify-center items-center w-full md:w-4/5">
                <div id="blueheader" className={`flex w-full h-[53px] py-3 bg-[${okb_colors.okb_blue}] rounded-[10px] justify-center items-center inline-flex`}>
                    <div className="flex flex-row gap-4 xs:gap-5 sm:gap-8">
                        <button onClick={goToPreviousWeek} className='flex items-center'>
                            <svg width="10" height="20" viewBox="0 0 10 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_2452_9242)">
                                    <path d="M7.5 18C7.14844 18 6.83594 17.8828 6.60156 17.6484L0.351562 11.3984C-0.15625 10.9297 -0.15625 10.1094 0.351562 9.64062L6.60156 3.39062C7.07031 2.88281 7.89062 2.88281 8.35938 3.39062C8.86719 3.85938 8.86719 4.67969 8.35938 5.14844L3.00781 10.5L8.35938 15.8906C8.86719 16.3594 8.86719 17.1797 8.35938 17.6484C8.125 17.8828 7.8125 18 7.5 18Z" fill="#FFFDFD" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_2452_9242">
                                        <rect width="10" height="20" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </button>
                        <div className="flex h-[29px] top-0 justify-center items-center">
                            <div className="text-white text-2xl font-semibold font-montserrat">Week of {dateHeaderString}</div>
                        </div>
                        <button onClick={goToNextWeek} className="flex items-center">
                            <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.5 18C2.14844 18 1.83594 17.8828 1.60156 17.6484C1.09375 17.1797 1.09375 16.3594 1.60156 15.8906L6.95312 10.5L1.60156 5.14844C1.09375 4.67969 1.09375 3.85938 1.60156 3.39062C2.07031 2.88281 2.89062 2.88281 3.35938 3.39062L9.60938 9.64062C10.1172 10.1094 10.1172 10.9297 9.60938 11.3984L3.35938 17.6484C3.125 17.8828 2.8125 18 2.5 18Z" fill="#FFFDFD" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center pt-10 w-4/5">
                {/* <div className="bg-white h-[330px] rounded-[10px] shadow" >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar value={currentDate} onChange={(newValue: dayjs.Dayjs | null) => { setCurrentDate(newValue ?? dayjs()); }} />
                    </LocalizationProvider>
                </div> */}
                <div className="bg-white h-[330px] rounded-[10px] shadow flex items-center justify-center">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <div className="scale-85 md:scale-md-100">
                            <DateCalendar
                                value={currentDate}
                                onChange={(newValue: dayjs.Dayjs | null) => {
                                    setCurrentDate(newValue ?? dayjs());
                                }}
                            />
                        </div>
                    </LocalizationProvider>
                </div>
                <div className="md:ml-10 mb-10 w-full h-[630px] h-full flex-col justify-center md:justify-start items-center md:items-start gap-9 inline-flex">
                    {
                        todaysAppointments.length > 0 ?
                            (
                                <div className="relative mb-5 w-full pt-5 md:pt-0">
                                    <div className="text-black text-2xl font-semibold font-montserrat">Today's Appointments</div>
                                    {todaysAppointments}
                                </div>
                            ) : (
                                <div className="relative mb-5 w-full pt-5 md:pt-0">
                                    <div className="text-black text-2xl font-semibold font-montserrat">Today's Appointments</div>
                                    <div className="text-black text-xl font-montserrat mt-5">{"No appointments booked for " + currentDate.format('dddd, MMMM D')}</div>
                                </div>
                            )
                    }
                    {
                        otherAppointments.length > 0 ?
                            (
                                <div className="relative mb-5 w-full">
                                    <div className="text-black text-2xl font-semibold font-montserrat">This Week's Appointments</div>
                                    {otherAppointments}
                                </div>
                            ) : (
                                <div className="relative mb-5 w-full">
                                    <div className="text-black text-2xl font-semibold font-montserrat">This Week's Appointments</div>
                                    <div className="text-black text-xl font-montserrat mt-5">{"No appointments booked for the week of " + currentDate.format('dddd, MMMM D')}</div>
                                </div>
                            )
                    }
                </div>
            </div>
        </div>
    )
}

export default PsychiatristDashboard;