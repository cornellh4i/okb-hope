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
    let updatedList = [...isSelected];
    if (event.target.checked) {
      updatedList = [...isSelected, event.target.value];
    } else {
      updatedList.splice(isSelected.indexOf(event.target.value), 1);
    }
    setIsSelected(updatedList);
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const popupTextStyle = {
    color: 'var(--black, #000)',
    fontFamily: 'Montserrat',
    fontSize: '24.668px',
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 'normal',
  };

  const popupTextStyleTwo = {
    color: 'var(--black, #000)',
    fontFamily: 'Inter',
    fontSize: '20.998px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 'normal',
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
      <button
        className="btn px-3 py-2 bg-neutral-200 rounded-[10px] justify-start items-start flex"
        onClick={openPopup}
      >
        <div className="text-sky-700 text-xl font-semibold font-['Montserrat']">Delete</div>
      </button>

      {isPopupOpen && (
        <div
          className="popup w-[531px] h-[250px] p-9 bg-white rounded-2xl shadow flex-col justify-center items-start gap-6 inline-flex"
          style={{
            display: 'flex',
            width: '531px',
            height: '250px',
            padding: '36px',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: '24px',
            flexShrink: '0',
            borderRadius: '15.418px',
            background: 'var(--white, #FFFDFD)',
            boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.25)',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: '999',
          }}
        >
            {/* Content of the popup */}
          <div className="w-[472px] text-black text-2xl font-semibold font-['Montserrat']">Are you sure you want to delete this user?</div>
          <div className="text-black text-[21px] font-normal font-['Inter']">You will not be able to recover deleted profiles. </div>
          <div className="self-stretch justify-end items-end gap-4 inline-flex">
            <button className="px-4 py-3 rounded-[10px] border-4 border-blue-400 justify-start items-start gap-[10.45px] flex" onClick={closePopup}>
              <div className="text-zinc-600 text-xl font-semibold font-['Montserrat']">Cancel </div>
            </button>
            <button className="px-4 py-3 bg-blue-400 rounded-[10px] justify-start items-start gap-[10.45px] flex" onClick={closePopup}>
              <div className="text-white text-xl font-semibold font-['Montserrat']">Delete</div>
            </button>
          </div>
        </div>
      )}


      <table className="table w-full">
        {/* head */}
        <thead>
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