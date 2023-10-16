import React from 'react';
import AvailabilityCard from './AvailabilityCard';

const Availability = () => {
  return (
    <div className="flex flex-row space-x-6">
      <AvailabilityCard day="Mon" times="8am-10am, 1pm-3pm" />
      <AvailabilityCard day="Tues" times="9am-11am, 2pm-5pm" />
      <AvailabilityCard day="Wed" times="8am-10am, 1pm-3pm" />
      <AvailabilityCard day="Thurs" times="9am-11am, 2pm-5pm" />
      <AvailabilityCard day="Fri" times="8am-10am, 1pm-3pm" />
      <AvailabilityCard day="Sat" times="9am-11am, 2pm-5pm" />
      <AvailabilityCard day="Sun" times="9am-11am, 2pm-5pm" />
    </div>
  );
};

export default Availability;