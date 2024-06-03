import React, { useEffect } from 'react';

type PatientInboxProps = {
  searchInput: string | ((searchTerm: string) => void); // Accepts either string or function
};

const PatientInbox = ({ searchInput }: PatientInboxProps) => {
  useEffect(() => {
    // If searchInput is a function, it means a search was triggered
    if (typeof searchInput === 'function') {
      // Execute the search function
      searchInput('Perform search here'); // Example: Perform search with a placeholder term
    }
  }, [searchInput]); // Run this effect whenever searchInput changes

  return (
    <div>
      {/* Render your Patient Inbox UI here */}
    </div>
  );
};

export default PatientInbox;