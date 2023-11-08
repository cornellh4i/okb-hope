// FilterUserTable.tsx
import { useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import FilterCard from "./FilterCard";

const FilterUserTable = ({ currentRecords, onDelete }) => {
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  const handleCheck = (event) => {
    const userId = event.target.value;
    setSelectedUserIds((prevSelectedUserIds) => {
      if (event.target.checked) {
        return [...prevSelectedUserIds, userId];
      } else {
        return prevSelectedUserIds.filter((id) => id !== userId);
      }
    });
  };

  async function deleteUsers(userIds: string[]) {
    for (const uid of userIds) {
      await deleteDoc(doc(db, "users", uid));
    }
  }

  const handleDeleteUsers = async () => {
    try {
      await deleteUsers(selectedUserIds);
      onDelete(selectedUserIds);
      setSelectedUserIds([]);
    } catch (error) {
      console.error("Error deleting users:", error);
    }
  };
  const handleCheckChange = (userId, isChecked) => {
    if (isChecked) {
      setSelectedUserIds((prevSelectedUserIds) => [...prevSelectedUserIds, userId]);
    } else {
      setSelectedUserIds((prevSelectedUserIds) => prevSelectedUserIds.filter((id) => id !== userId));
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


      <div className="w-full">
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
      <button
        className="bg-blue-500 hover:bg-blue-600 text-blue font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
        onClick={handleDeleteUsers}
        style={{ marginBottom: '10px' }}
      >
        Delete
      </button>

    </div>
  )
}

export default FilterUserTable;