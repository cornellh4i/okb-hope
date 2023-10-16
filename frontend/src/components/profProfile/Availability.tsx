import React from 'react';
import AvailabilityCard from './AvailabilityCard';

interface AvailabilityProps {
    availability: string[]
  }

const Availability = ({ availability = [] }: AvailabilityProps) => {
    const days = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];

    return (
        <div className={`h-fit flex flex-row space-x-8 items-start`}>
            {days.map((day, index) => (
                <AvailabilityCard key={day} day={day} times={availability[index]} />
            ))}
        </div>
    );
};

export default Availability;