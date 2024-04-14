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
              <div className="rounded-lg shadow-lg relative flex flex-col w-full h-full bg-white outline-none focus:outline-none">
                {/* Modal header */}
                <div className="flex items-center p-5" style={{ paddingBottom: '0.5rem' }}>
                  <h3 className="text-xl font-semibold"
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 600,
                      fontSize: '24px',
                      lineHeight: '29.26px'
                    }}>
                    Are you sure you want to delete this message thread?
                  </h3>
                </div>
                {/* Modal body */}
                <div className="flex-grow p-6" style={{ paddingTop: '0.5rem' }}>
                  <p className="text-slate-600 text-left"
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 400,
                      fontSize: '20px',
                      lineHeight: '24.38px',
                      margin: '0'
                    }}>
                    You will not be able to recover it.
                  </p>
                </div>
                {/* Modal footer */}
                <div className="flex items-center justify-end p-6">
                  <button
                    className="text-red-500 background-transparent outline-none focus:outline-none mr-4" // Added right margin to the cancel button
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