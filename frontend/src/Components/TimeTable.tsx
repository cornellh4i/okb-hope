import React from "react";

interface Props {
  times: Record<string, [number, number][]>;
}

const TimeTable: React.FC<Props> = ({ times }) => {
  const days = Object.keys(times);

  const daysList: JSX.Element[] = days.map((day) => {
    const dayTimes = times[day];
    let timesList: JSX.Element[] | JSX.Element = (
      <div className="text-[#9A9A9A]">No Times Available</div>
    );

    if (dayTimes.length > 0) {
      timesList = dayTimes.map(([start, end]) => {
        const formattedStart = `${String(start).padStart(2, '0')}:00`;
        const formattedEnd = `${String(end).padStart(2, '0')}:00`;
        return (
          <div key={`${day}-${start}-${end}`} className="">
            {formattedStart} - {formattedEnd}
          </div>
        );
      });
    }

    return (
        <div key={day} className="inline-block card shadow-xl rounded-3xl">
          <div className="card-body">
            <h2 className={`card-title ${dayTimes.length === 0 ? 'text-[#9A9A9A]' : ''}`}>
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </h2>
              <div>{timesList}</div>
          </div>
        </div>
    );
  });

  return <div className="inline-block">{daysList}</div>;
};

export default TimeTable;
