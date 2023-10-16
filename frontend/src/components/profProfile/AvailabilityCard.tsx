import React from 'react';

interface AvailabilityCardProps {
  day: string;
  // Assuming comma separated time ranges e.g. "8am-10am, 2pm-4pm"
  times: string;
}

const AvailabilityCard = ({ day, times }: AvailabilityCardProps) => {
  const timeList = times.split(',').map(time => time.trim());

  //TODO: Make "no times available" card style
  //      Scale for more times
  //      Add hover animation 

  return (
    <div className="w-32 h-32 p-4 border-2 border-okb-blue rounded-lg space-y-2">
      <h2 className="text-xl font-semibold font-montserrat text-center text-okb-blue">{day}</h2>
      <div>
        {timeList.map((time, index) => (
          <div key={index} className="text-sm/[16px] font-[400] font-montserrat text-center">{time}</div>
        ))}
      </div>
    </div>
  );
};

export default AvailabilityCard;
