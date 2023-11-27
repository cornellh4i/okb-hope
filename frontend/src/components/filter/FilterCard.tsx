import { useState } from "react";

const FilterCard = ({ name, username, created, active, isChecked, onCheckChange }) => {


  const handleOnChange = () => {
    onCheckChange(!isChecked);
  };

  const cardStyle = {
    backgroundColor: isChecked ? '#D0DBEA' : 'transparent',
    border: isChecked ? 'sky-700' : 'gray-300'
  };


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
            <div style={{ width: "150px", marginLeft: "20px" }}>{name}</div>
            <div style={{ width: "150px", marginLeft: "180px" }}>{username}</div>
            <div style={{ width: "150px", marginLeft: "310px" }}>{created}</div>
            <div style={{ width: "150px", marginLeft: "320px" }}>{active}</div>
          </div>
        </div>
      </div>
  )
}

export default FilterCard