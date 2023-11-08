import { useState } from "react";

const FilterCard = ({ name, username, created, active, isChecked, onCheckChange }) => {


  const handleOnChange = () => {
    onCheckChange(!isChecked);
  };


  return (
    <div className="flex items-center mx-36">
      <div className='flex justify-between items-center w-full border-solid border-gray-300 border-2 rounded-lg py-5 px-6'>
        <div className="flex items center">
          <input type="checkbox" className="checkbox ml-5 mr-20" checked={isChecked} onChange={handleOnChange} />
          <div className="">{name}</div>
        </div>
        <div className="">{username}</div>
        <div className="">{created}</div>
        <div className="">{active}</div>
      </div>
    </div>
  )
}

export default FilterCard