import { useState } from "react";
import WarningCircle from "@/assets/warning_circle.svg";
import Check from "@/assets/green_check.svg";


const FilterCard = ({ name, username, created, active, isChecked, onCheckChange }) => {


  const handleOnChange = () => {
    onCheckChange(!isChecked);
  };

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
          <div className="flex items-start w-full">
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