import React from 'react';
import Delete from '../../assets/delete.svg';
import Cancel from '../../assets/cancel.svg';

const DeleteModal = ({ isOpen, onClose, onDelete }) => {
  const handleCancel = () => {
    onClose(); // Call the onClose function to close the modal
  };

  return (
    <>
      {isOpen && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto h-2/3 my-6 mx-auto max-w-3xl z-50">
            {/* Modal content */}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/* Modal header */}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-bold">Are you sure you want to delete this message thread?</h3>
              </div>
              {/* Modal body */}
              <div className="relative p-6 flex-auto">
                <p>You will not be able to recover it.</p>
                <div className="flex justify-end mt-6">
                  <button onClick={handleCancel}>
                    <Cancel className="w-30 h-20 mr-2" />
                  </button>
                  <button onClick={onDelete}>
                    <Delete className="w-30 h-20 mr-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Overlay */}
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      )}
    </>
  );
};

export default DeleteModal;
