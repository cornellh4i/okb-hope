import { useEffect, useState } from 'react'
import okb_colors from '../../colors'
import { Timestamp } from 'firebase/firestore';
import { fetchPatientDetails } from '../../../firebase/fetchData';
import { IPatient } from '@/schema';

const AppointmentCard = ({ patientId, startTime, endTime }: { patientId: string, startTime: string, endTime: string }) => {
  const [isShown, setIsShown] = useState(false);
  const [patient, setPatient] = useState<IPatient>();;
  const handleClick = event => {
    setIsShown(!isShown);
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (patientId) {
        const data = await fetchPatientDetails(patientId);
        setPatient(data);
      }
    }
    fetchUser();
  }, []);

  return (
    patient ?
      <div className="flex w-full h-[67px] rounded-[10px] items-center py-2 px-10 shadow mt-6 mb-0 gap-2.5 inline-flex justify-center">
        <div className="flex flex-row sm:flex-row md:flex-col lg:flex-row justify-between items-start w-full">
          <div className="justify-center items-center gap-6 flex">
            <div className="text-black font-montserrat text-xs font-normal">{startTime} - {endTime}</div>
            <div className="text-black font-montserrat text-base font-semibold">{patient?.firstName + " " + patient?.lastName}</div>
          </div>

          {/* appointment details button */}
          <div className={`flex py-1 px-2 justify-center items-center gap-4 rounded-[15px] border border-solid`} style={{ borderColor: okb_colors.light_blue }}>
            <div className="card-actions flex py-0.5 px-2 flex-col items-start gap-2.5 justify-start rounded">
              <p className="font-montserrat text-xs font-normal">Appointment Details</p>
            </div>
          </div>
        </div>
      </div>
      : null
  )
};

export default AppointmentCard;