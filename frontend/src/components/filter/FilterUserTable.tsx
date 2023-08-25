import { useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";

const FilterUserTable = ({ currentRecords }) => {

  // Contains all the selected Users (checked users)
  const [isSelected, setIsSelected] = useState<string[]>([]);

  /**
   * handleCheck handles when users are checked/unchecked and keeps track of 
   * the checked users.
   * @param event The checkbox event
   */
  const handleCheck = (event) => {
    var updatedList = [...isSelected];
    if (event.target.checked) {
      updatedList = [...isSelected, event.target.value];
    } else {
      updatedList.splice(isSelected.indexOf(event.target.value), 1);
    }
    setIsSelected(updatedList);
  };

  /**
   * This function removes selected users from the database.
   * @param users An array of users to delete from the firebase collection
   */
  async function deleteUsers(userids: string[]) {
    for (const uid of userids) {
      await deleteDoc(doc(db, "users", uid));
    }
  }

  return (
    <div className="overflow-x-auto">
      <button className="btn" onClick={() => deleteUsers(isSelected)}>Delete</button>
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Username</th>
            <th>Last Active</th>
            <th>Date Created</th>
          </tr>
        </thead>
        <tbody>
          {/* map rows */}
          {currentRecords && currentRecords.map((user) => (
            <tr className='hover' key={user.id}>
              <th>
                <label>
                  <input
                    type="checkbox"
                    className="checkbox"
                    value={user.id}
                    onChange={handleCheck}
                  />
                </label>
              </th>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.created.toDate().toDateString()}</td>
              <td>{user.active.toDate().toDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default FilterUserTable;