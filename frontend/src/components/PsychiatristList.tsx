// components/PsychiatristList.tsx
import React from 'react';

interface Psychiatrist {
  id: number;
  // Add other relevant properties for a psychiatrist
}

interface PsychiatristListProps {
  results: Psychiatrist[];
}

const PsychiatristList: React.FC<PsychiatristListProps> = ({ results }) => {
  return (
    <div className="psychiatrist-list">
      {results.map((psychiatrist) => (
        <div key={psychiatrist.id} className="psychiatrist">
          {/* Display the psychiatrist's information here */}
        </div>
      ))}
    </div>
  );
};

export default PsychiatristList;
