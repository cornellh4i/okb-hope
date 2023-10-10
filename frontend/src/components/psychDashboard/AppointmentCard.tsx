import { useState } from 'react'

const AppointmentCard = ({p_name, time_start, time_end} : {p_name:string, time_start:string, time_end:string}) => {
  const [isShown, setIsShown] = useState(false);
  const handleClick = event => {
    setIsShown(!isShown);
  };

  return (
    <div className="card flex flex-col w-full bg-base-100 shadow-xl m-6 border-[10px]">
      <div className="card-body items-center py-2 px-10">
        <h2 className="card-title">{p_name}</h2>
        <h2 className="font-[400]">{time_start} {time_end}</h2>

        {/* appointment details button */}
        <div className="card-actions flex">
          <button>

          </button>
        </div>
      </div>
    </div>
  )
};

export default AppointmentCard;