import React from 'react';
import AvailabilityCard from './AvailabilityCard';

interface AvailabilityProps {
    availability: string[];
}

const Availability = ({ availability = [] }: AvailabilityProps) => {
    const days = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];

    // Calculate the maximum number of time slots among all days
    const maxTimeSlots = availability.reduce((max, times) => {
        const timeList = times.split(',').map(time => time.trim());
        return Math.max(max, timeList.length);
    }, 0);

    return (
        <div className="h-fit">
            <div className={`grid grid-cols-7 gap-8`}>
                {days.map((day, index) => {
                    const times = availability[index] || ''; // Ensure times are available or an empty string
                    const timeList = times.split(',').map(time => time.trim());
                    const hasTimes = timeList.length > 0;

                    return (
                        <AvailabilityCard
                            key={day}
                            day={day}
                            times={hasTimes ? times : '\u00A0'.repeat(maxTimeSlots)} // Use non-breaking spaces for empty slots
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Availability;
