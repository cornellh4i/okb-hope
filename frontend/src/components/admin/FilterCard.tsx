import { useState, useEffect } from "react";
import WarningCircle from "@/assets/warning_circle.svg";
import Check from "@/assets/green_check.svg";
import { fetchAllUsers, fetchDocumentId, fetchPatientDetails, fetchProfessionalData } from '../../../firebase/fetchData';
import { useRouter } from 'next/router';


const FilterCard = ({ user, name, username, id, created, active, isChecked, onCheckChange }) => {
  const router = useRouter();
  const [savedPsychiatrists, setSavedPsychiatrists] = useState<string[]>([]);

  const handleOnChange = () => {
    onCheckChange(!isChecked);
  };

  // Redirects to a professional's profile page and passes their uid as query parameter
  function handleGoToProfProfile(psych_uid: string) {
    router.push({
      pathname: `/admin/${user.uid}/admin_prof_profile`,
      query: { psych_uid: psych_uid as string }
    });
  }

  const cardStyle = {
    backgroundColor: isChecked ? '#D0DBEA' : 'transparent',
    border: isChecked ? 'sky-700' : 'gray-300'
  };

  const Icon = name.toLowerCase() === "brianna liu" ? Check : WarningCircle;

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
              <div className="basis-1/5"><Icon /></div>
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