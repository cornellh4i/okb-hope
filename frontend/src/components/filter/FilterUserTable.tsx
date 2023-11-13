// FilterUserTable.tsx
import { useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import FilterCard from "./FilterCard";
import { IUser } from "../../../src/schema";


const FilterUserTable = ({ currentRecords, onDelete, selectedUsers }) => {
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  const handleCheckChange = (userId, isChecked) => {
    if (isChecked) {
      setSelectedUserIds((prevSelectedUserIds) => [...prevSelectedUserIds, userId]);
      selectedUsers((prevSelectedUserIds) => [...prevSelectedUserIds, userId])
    } else {
      setSelectedUserIds((prevSelectedUserIds) => prevSelectedUserIds.filter((id) => id !== userId));
      selectedUsers((prevSelectedUserIds) => prevSelectedUserIds.filter((id) => id !== userId))
    }
  };




  return (
    <div className="overflow-x-auto">
      <div className=" flex items-center mx-36">
        <div className=' flex justify-between items-center w-full'>
          <h2 className="text-2xl font-bold pl-24 mb-4">Name</h2>
          <h2 className="text-2xl font-bold mb-4">Email</h2>
          <h2 className="text-2xl font-bold mb-4">Date Created</h2>
          <h2 className="text-2xl font-bold pr-24 mb-4">Last Active</h2>
        </div>
      </div>
      <div className="bg-black h-2 rounded-lg mx-36 "></div>


      <div className="w-full mt-5">
        <div className="grid grid-cols-1 gap-4">
          {currentRecords && currentRecords.map((user, index) => {
            const name = user.name;
            const username = user.email;
            return (
              <div>
                <FilterCard key={index} name={name} username={username} created={"N/A"} active={"N/A"} isChecked={selectedUserIds.includes(user.id)}
                  onCheckChange={(isChecked) => handleCheckChange(user.id, isChecked)} />
              </div>
            );
          })}
        </div>
      </div>

    </div>
  )
}

export default FilterUserTable;