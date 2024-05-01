import { useState, useEffect } from "react";
import CircleWarningHover  from "./CircleWarningHover";
import { fetchAllUsers, fetchDocumentId, fetchPatientDetails, fetchProfessionalData } from '../../../firebase/fetchData';
import { useRouter } from 'next/router';
import { IPsychiatrist } from '../../schema'


const FilterCard = ({ user, name, username, id, created, active, isChecked, onCheckChange }) => {
  const router = useRouter();
  const [savedPsychiatrists, setSavedPsychiatrists] = useState<string[]>([]);
  const [professional, setProfessional] = useState<IPsychiatrist | null>(null);

  
  const handleOnChange = () => {
    onCheckChange(!isChecked);
  };

  // Redirects to a professional's profile page and passes their uid as query parameter
  function handleGoToProfProfile(psych_uid: string) {
    if (user.userType === 'psychiatrist') {
      router.push({
        pathname: `/admin/${user.uid}/admin_prof_profile`,
        query: { psych_uid: psych_uid as string }
      });
    }
  }

  useEffect(() => {
    const fetchProfessional = async () => {
      // Extract the first name and last name from the router query parameters
      if (user.userType === 'psychiatrist') {
        const psych_uid = id;
        // Check if both first name and last name are defined
      if (psych_uid) {
        // Fetch professional data based on first name and last name
        const data = await fetchProfessionalData(psych_uid);
        setProfessional(data);
      }
      }
    };
    fetchProfessional();
  }, [id]);



  const cardStyle = {
    backgroundColor: isChecked ? '#D0DBEA' : 'transparent',
    border: isChecked ? 'sky-700' : 'gray-300'
  };

  // if approved is true then Icon is check mark, else warning circle
  const Icon = professional?.status == "approved" ? true : false;
  const visibility = (user.userType === 'psychiatrist') ? 'visible' : 'invisible';

  return (
    <div className="flex flex-row items-center mx-10 md:mx-24 lg:mx-36">
      <div className='flex flex-row items-center w-full border-solid border-2 rounded-lg py-3.5 px-3 md:px-5 md:py-5 lg:py-5 lg:px-6' style={cardStyle}>
          <div className = 'flex flex-col justify-center pr-2 md:pr-4 lg:pr-4'>
            <input type="checkbox" className="checkbox" checked={isChecked} onChange={handleOnChange} />
          </div>
        <div className="flex-container flex-row items-center justify-between w-full">
          
          <div className="flex justify-between items-center w-full" onClick={() => handleGoToProfProfile(id)}>
            <div className="flex flex-row justify-evenly w-auto md:pr-2">
              <div className="text-balance w-20 md:w-20 lg:w-28">{name}</div>
              <div className={`${visibility}`}><CircleWarningHover approved={Icon}/></div>
            </div>
            <div className="w-24 md:w-44 lg:w-64 truncate ...">{username}</div>
            <div className="pr-0 md:pr-40 lg:pr-44">{created}</div>
            <div className="pr-0 md:pr-24 lg:pr-28">{active}</div>
          </div>
        </div>
      </div>
      </div>
  )
}

export default FilterCard