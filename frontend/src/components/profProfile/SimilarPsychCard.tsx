import React from 'react';
import { IPsychiatrist } from '@/schema';

interface SimilarPsychCardProps {
  psychiatrist: IPsychiatrist;
}

const SimilarPsychCard: React.FC<SimilarPsychCardProps> = ({ psychiatrist }) => {
  console.log('Psychiatrist Data:', psychiatrist); // Debugging line

  return (
    <div className="py-3 border-b last:border-none">
      <img
        src={psychiatrist.profile_pic || '/default-avatar.png'}
        alt={`${psychiatrist.lastName}'s profile`}
        className="w-16 h-16 object-cover border border-gray-300"
      />
      <div className="mt-2">
        <h4 className="text-sm font-semibold text-gray-800">
          {psychiatrist.lastName}
        </h4>
        <p className="text-xs text-gray-600">
          Psychiatrist at {psychiatrist.location || 'Unknown Hospital'}
        </p>
      </div>
    </div>
  );
};

export default SimilarPsychCard;
