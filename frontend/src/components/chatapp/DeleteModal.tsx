import React from 'react';
import DeleteIcon from '../../assets/delete.svg';
import CancelIcon from '../../assets/cancel.svg';

const DeleteModal = ({ isOpen, onClose, onDelete }) => {
  const handleCancel = () => {
    onClose(); // Call the onClose function to close the modal
  };

  return (
    <>
      {isOpen && (
        <>
          {/* Overlay */}
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          {/* Modal content */}
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-6 mx-auto" style={{ width: '531px', height: '250px' }}>
              {/* Modal box */}
              <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none p-6 sm:p-9 gap-y-6 md:gap-y-6">
                {/* Modal header */}
                <div className="flex items-center">
                  <h3 className="text-xl font-semibold text-sm md:text-2xl"
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 600,
                    }}>
                    Are you sure you want to delete this message thread?
                  </h3>
                </div>
                {/* Modal body */}
                <div className="">
                  <p className="text-slate-600 text-left text-base md:text-xl"
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 400,
                      // fontSize: '20px',
                      lineHeight: '24.38px',
                      margin: '0'
                    }}>
                    You will not be able to recover it.
                  </p>
                </div>
                {/* Modal footer */}
                <div className="flex items-center justify-end">
                  <button
                    className="text-red-500 background-transparent outline-none focus:outline-none mr-4"
                    type="button"
                    onClick={handleCancel}
                  >
                    <CancelIcon />
                  </button>
                  <button
                    className="text-blue-500 background-transparent outline-none focus:outline-none"
                    type="button"
                    onClick={onDelete}
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DeleteModal;
