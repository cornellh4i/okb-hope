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
      <div className=" flex items-center mx-10 md:mx-24 lg:mx-36">
        <div className=' flex justify-between items-center w-full'>
          <h2 className="text-2l font-bold pr-10 md:pr-0 pl-12 md:pl-16 lg:pl-20 mb-1">Name</h2>
          <h2 className="text-2l font-bold pr-0 md:pr-4 lg:pr-28 mb-1">Email</h2>
          <h2 className="text-2l text-balance w-5 md:w-max font-bold mb-1">Date Created</h2>
          <h2 className="text-2l text-balance w-5 pl-3 md:pl-0 md:w-max font-bold pr-12 md:pr-16 lg:pr-20 mb-1">Last Active</h2>
        </div>
      </div>
      <div className="bg-black h-0.5 rounded-lg mx-10 md:mx-24 lg:mx-36 "></div>


      <div className="w-full mt-5">
        <div className="grid grid-cols-1 gap-4 sm:table-fixed">
          {currentRecords && currentRecords.map((user, index) => {
            const name = user.name;
            const id = user.uid;
            const username = user.email;
            const user2 = user;
            return (
              <div>
                <FilterCard key={index} user={user2} name={name} username={username} id={id} created={"N/A"} active={"N/A"} isChecked={selectedUserIds.includes(user.id)}
                  onCheckChange={(isChecked) => handleCheckChange(user.id, isChecked)}/>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  )
}

export default FilterUserTable;