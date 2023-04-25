import { useEffect, useState } from "react";
import { UserType } from "./FilterUser2";

export default function FilterUserTable({ currentRecords }) {
  const [checkedState, setCheckedState] = useState<boolean[]>(
    new Array(currentRecords.length).fill(false)
  );

  useEffect(() => {
    console.log(checkedState)
  }, [checkedState])

  // Contains all the selected Users (checked users)
  const [isSelected, setIsSelected] = useState<UserType[]>([]);

  const handleOnChange = (position: number, user: UserType) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);

    console.log(updatedCheckedState[position]);

    if (updatedCheckedState[position] === true) setIsSelected([...isSelected, user])
    if (updatedCheckedState[position] === false && isSelected.includes(user)) {
      setIsSelected(isSelected.filter(function (this_user) {
        return user.id != this_user.id;
      }));
    }
  };

  return (
    <div className="overflow-x-auto">
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
          {currentRecords && currentRecords.map((user, index) => (
            <tr className='hover' key={index}>
              <th>
                <label>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={checkedState[index]}
                    onChange={() => handleOnChange(index, user)} />
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