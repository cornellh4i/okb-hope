import React from 'react';
import AvailabilityCard from './AvailabilityCard';

interface AvailabilityProps {
    weeklyAvailability: string[];
    workingHours
}

const dayMapping = {
    Monday: 'Mon',
    Tuesday: 'Tues',
    Wednesday: 'Wed',
    Thursday: 'Thurs',
    Friday: 'Fri',
    Saturday: 'Sat',
    Sunday: 'Sun',
};

const Availability = ({ weeklyAvailability = [], workingHours }: AvailabilityProps) => {
    const fullDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return (
        <div className="h-fit flex justify-center">
            <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-8`}>
                {fullDays.map((day) => {
                    const dayAvailability = weeklyAvailability.includes(day) ? workingHours[day] : null;

                    let times = '';
                    if (dayAvailability) {
                        times = `${dayAvailability.start}-${dayAvailability.end}`;
                    }

                    return (
                        <AvailabilityCard
                            key={day}
                            day={dayMapping[day]} // Display the shorthand version of the day
                            times={times}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Availability;
