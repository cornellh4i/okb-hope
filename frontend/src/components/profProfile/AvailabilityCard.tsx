import React from 'react';

interface AvailabilityCardProps {
  day: string;
  // Assuming comma separated time ranges e.g. "8am-10am, 2pm-4pm"
  times: string;
}

const AvailabilityCard = ({ day, times }: AvailabilityCardProps) => {
  const timeList = times.split(',').map(time => time.trim());

  const isAvailable = timeList.length > 0 && timeList[0] !== '';
  //TODO:
  //      Scale for more times
  //      Add hover animation 

  // Conditional class names for styling based on availability
  const borderColorClass = isAvailable ? 'border-light-blue hover:bg-gray-200 transition cursor-pointer' : 'border-opacity-95 border-blue-200';
  const textColorClass = isAvailable ? 'text-okb-blue' : 'text-opacity-95 text-blue-200';

  return (
    <div className={`min-h-[8rem] w-32 p-4 border-2 rounded-[20px] space-y-2 flex flex-col ${borderColorClass}`}>
      <div className={`text-xl font-semibold font-montserrat text-center ${textColorClass}`}>{day}</div>
      <div>
        {isAvailable ? (
          timeList.map((time, index) => (
            <div key={index} className="text-sm/[16px] font-[400] font-montserrat text-center pb-1">{time}</div>
          ))
        ) : (
          <div className={`text-sm/[16px] font-[400] font-montserrat text-center text-med-grey`}>No Times Available</div>
        )}
      </div>
    </div>
  );
};

export default AvailabilityCard;
