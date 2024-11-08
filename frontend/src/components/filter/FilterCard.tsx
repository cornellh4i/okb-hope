import { useState, useEffect } from "react";
import StatusIcon from './StatusIcon';
import { useRouter } from 'next/navigation';
import router from 'next/router';
import { useAuth } from '../../../contexts/AuthContext';
import { fetchPsychiatrist } from "../../../firebase/IPsychiatrist";

const FilterCard = ({ name, username, created, active, isChecked, onCheckChange, user_id, status}) => {
  const {user} = useAuth();
  const handleOnChange = () => {
    onCheckChange(!isChecked);
  };

  const cardStyle = {
    backgroundColor: isChecked ? '#D0DBEA' : 'transparent',
    border: isChecked ? 'sky-700' : 'gray-300'
  };

  function handleGoToProfProfile(psych_uid: string) {
    router.push({
      pathname: `/${user?.userType}/${user?.uid}/admin_view`,
      query: { psych_uid: psych_uid }
    })
  }

  return (

      <div className="flex items-center mx-36">
        <div className='flex justify-between items-center w-full border-solid border-2 rounded-lg py-5 px-6' style={cardStyle}>
          {/* <div className="flex items center">
            <input type="checkbox" className="checkbox" checked={isChecked} onChange={handleOnChange} />
            <div className="ml-12 flex items-center">{name}</div>
          </div>
          <div className="">{username}</div>
          <div className="">{created}</div>
          <div className="pr-40">{active}</div> */}
          <div className="flex items-center">
            <div style={{ width: "40px", marginLeft: "10px" }}>
              <input type="checkbox" className="checkbox" checked={isChecked} onChange={handleOnChange} />
            </div>
            <div style={{ width: "135px", marginLeft: "20px" }}>{name}</div>
            <div style={{ width: "300px", marginLeft: "10px" }}>
            {status && <StatusIcon status={status} />} {/* Only render if status is not empty */}
            {status !== "" && <button 
              onClick={() => {
                handleGoToProfProfile(user_id)
                }} 
              className="btn w-9/12 bg-okb-blue border-transparent">
              View Profile
          </button>}
          </div>
            <div style={{ width: "150px", marginLeft: "180px" }}>{username}</div>
            <div style={{ width: "150px", marginLeft: "520px" }}>{created}</div>
            <div style={{ width: "150px", marginLeft: "560px" }}>{active}</div>
          </div>
        </div>
      </div>
  )
}

export default FilterCard
