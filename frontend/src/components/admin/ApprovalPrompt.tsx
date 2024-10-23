import React from 'react';

// Define types for props
type ApprovalPromptProps = {
  onApprove: () => void;
  onReject: () => void;
};

const ApprovalPrompt: React.FC<ApprovalPromptProps> = ({ onApprove, onReject }) => {
  return (
    <div className="mt-6 flex flex-col items-center border p-4 w-1/2 rounded bg-blue shadow">
      <p className="text-lg mb-4">Would you like to approve this account?</p>
      <div className="flex gap-4">
        <button onClick={onReject} className="px-4 py-2 bg-white-100 text-white rounded">No</button>
        <button onClick={onApprove} className="px-4 py-2 bg-blue-600 text-white rounded">Yes</button>
      </div>
    </div>
  );
};

export default ApprovalPrompt;
