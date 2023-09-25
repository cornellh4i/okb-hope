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
        className="btn btn-delete"
        onClick={openPopup}
        style={{
          display: 'flex',
          width: '92px',
          height: '40px',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '10px',
          background: 'var(--light-grey, #DEDEDE)',
          color: 'var(--OKB-Blue, #195BA5)',
          fontFamily: 'Montserrat',
          fontSize: '20px',
          fontStyle: 'normal',
          fontWeight: '600',
          lineHeight: 'normal',
        }}
      >
        Delete
      </button>

      {isPopupOpen && (
        <div
          className="popup"
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
          <h2 style={{
                ...popupTextStyle,
                marginTop: '36px', /* 36px from the top */
                marginRight: '36px', /* 36px from the right */
                marginLeft: '36px', /* 36px from the left */
              }}>
            Are you sure you want to delete this user?
          </h2>
          <p style={{
            ...popupTextStyleTwo,
            marginBottom: '24px', /* 24px from the bottom of <h2> */
            marginLeft: '36px', /* 36px from the right of the popup */
            marginRight: '36px', /* 36px from the right of the popup */
          }}>
            You will not be able to recover deleted profiles.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={closePopup}
              style={{
                display: 'flex',
                padding: '12px 16px',
                alignItems: 'flex-start',
                gap: '10.453px',
                borderRadius: '10px',
                background: 'var(--Light-blue, #519AEB)',
                color: 'var(--white, #FFFDFD)',
                fontFamily: 'Montserrat',
                fontSize: '20px',
                fontStyle: 'normal',
                fontWeight: '600',
                lineHeight: 'normal',
                width: '68px',
                height: '24px',
                position: 'relative',
                marginRight: '36px', /* 36px from the right of the popup */
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}


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