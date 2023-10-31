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


  return (
    <div className="overflow-x-auto">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-blue font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
        onClick={handleDeleteUsers}
        style={{ marginBottom: '10px' }}
      >
        Delete
      </button>

      <div className="w-full">
        <div className="grid grid-cols-1 gap-4">
          {currentRecords && currentRecords.map((user, index) => {
            const name = user.name;
            const username = user.email;
            return (
              <div>
                <FilterCard key={index} name={name} username={username} created={"N/A"} active={"N/A"} />
              </div>
            );
          })}
        </div>
      </div>

      <table className="table w-full rounded-lg">
        <tbody>
          {currentRecords && currentRecords.map((user, index) => (

            <tr className={`hover border`} key={user.id}>
              <td>
                <label>
                  <input
                    type="checkbox"
                    className="checkbox"
                    value={user.id}
                    onChange={handleCheck}
                  />
                </label>
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{"N/A"}</td>
              <td>{"N/A"}</td>
            </tr>

          ))}
        </tbody>
      </table>


    </div>
  )
}

export default FilterUserTable;