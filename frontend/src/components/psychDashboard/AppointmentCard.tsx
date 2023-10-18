import { useState } from 'react'
// import tailwindconfig from '../../../tailwind.config.js'
import okb_colors from '../../colors'

const AppointmentCard = ({p_name, time_start, time_end} : {p_name:string, time_start:string, time_end:string}) => {
  const [isShown, setIsShown] = useState(false);
  const handleClick = event => {
    setIsShown(!isShown);
  };

  return (
    <div className="card flex flex-col w-[806px] h-[67px] items-center py-2 px-10 bg-base-100 shadow-[0_0_5px_0_rgba(0,0,0,0.15)] m-6 border-[10px] gap-2.5 self-stretch">
      <div className="flex justify-between items-center self-stretch">
        <div className="flex justify-cnter items-center gap-6">
          <p className="text-black font-montserrat text-xs font-normal">{time_start} - {time_end}</p>
          <h3 className="text-black font-montserrat text-base font-semibold">{p_name}</h3>
        </div>

        {/* appointment details button */}
        <div className={`flex py-1 px-2 justify-center items-center gap-4 rounded-[15px] border border-solid`} style={{borderColor:okb_colors.light_blue}}>
          <div className="card-actions flex py-0.5 px-2 flex-col items-start gap-2.5 rounded">
            <p className="font-montserrat text-xs font-normal">Appointment Details</p>
          </div>
        </div>
      </div>
    </div>
  )
};

export default AppointmentCard;