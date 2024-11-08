import React from 'react';

// Define types for props
type ApprovalPromptProps = {
  onApprove: () => void;
  onReject: () => void;
};

const ApprovalPrompt: React.FC<ApprovalPromptProps> = ({ onApprove, onReject }) => {
  return (
    <div className="flex flex-col items-center border-2 p-4 rounded-lg justify-center border-blue-500 p-8 bg-blue-100 rounded-md shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Would you like to approve this account?
      </h2>
      <div className="flex gap-4 mt-4">
        <button
          onClick={onReject}
          className="px-6 py-2 border-2 border-blue-500 text-blue-500 rounded-lg bg-white hover:bg-blue-100 transition duration-200"
        >
          No
        </button>
        <button
          onClick={onApprove}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        > 
            Yes
        </button>
        </div>
    </div>
  );
};

export default ApprovalPrompt;