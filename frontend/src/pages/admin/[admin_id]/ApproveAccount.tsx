import React from 'react';

const Approval: React.FC = () => {
  const handleApprove = () => {
    return('Account approved!');
  };

  const handleReject = () => {
    return('Account rejected!');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-100">
      <div className="p-8 bg-white rounded-lg shadow-lg text-center">
        <p className="text-lg font-semibold mb-6">
          Would you like to approve this account?
        </p>
        <div className="flex space-x-4 justify-center">
          <button
            onClick={handleReject}
            className="px-6 py-2 border border-blue-500 rounded-full text-blue-500 hover:bg-blue-500 hover:text-white transition"
          >
            No
          </button>
          <button
            onClick={handleApprove}
            className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Approval;
