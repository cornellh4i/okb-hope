import { useState } from 'react'
// import tailwindconfig from '../../../tailwind.config.js'
import okb_colors from '../../colors'

const AppointmentCard = ({p_name, time_start, time_end} : {p_name:string, time_start:string, time_end:string}) => {
  const [isShown, setIsShown] = useState(false);
  const handleClick = event => {
    setIsShown(!isShown);
  };

  return (
    <div className="flex flex-col w-[806px] h-[67px] rounded-[10px] items-center py-2 px-10 shadow m-6 mb-0 gap-2.5 inline-flex justify-center">
      <div className="flex justify-between items-center self-stretch ">
        <div className="justify-center items-center gap-6 flex">
          <div className="text-black font-montserrat text-xs font-normal">{time_start} - {time_end}</div>
          <div className="text-black font-montserrat text-base font-semibold">{p_name}</div>
        </div>

        {/* appointment details button */}
        <div className={`flex py-1 px-2 justify-center items-center gap-4 rounded-[15px] border border-solid`} style={{borderColor:okb_colors.light_blue}}>
          <div className="card-actions flex py-0.5 px-2 flex-col items-start gap-2.5 justify-start rounded">
            <p className="font-montserrat text-xs font-normal">Appointment Details</p>
          </div>
        </div>
      </div>
    </div>
  )
};

export default AppointmentCard;