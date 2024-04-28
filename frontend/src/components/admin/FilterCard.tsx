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

    <div className="flex items-center mx-36">
      <div className='flex justify-between items-center w-full border-solid border-2 rounded-lg py-5 px-6' style={cardStyle}>
        <div className="flex items-center justify-between w-full">
          <div style={{ width: "40px", marginLeft: "10px" }}>
            <input type="checkbox" className="checkbox" checked={isChecked} onChange={handleOnChange} />
          </div>
          <div className="flex items-start w-full" onClick={() => handleGoToProfProfile(id)}>
            <div className="flex flex-row mr-28" style={{ width: "180px", marginLeft: "20px" }}>
              <div className="basis-4/5">{name}</div>
              <div className={`basis-1/5 ${visibility}`}><CircleWarningHover approved={Icon}/></div>
            </div>
            <div style={{ width: "180px", marginLeft: "0px" }}>{username}</div>
            <div style={{ width: "100px", marginLeft: "110px" }}>{created}</div>
            <div style={{ width: "100px", marginLeft: "240px" }}>{active}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterCard