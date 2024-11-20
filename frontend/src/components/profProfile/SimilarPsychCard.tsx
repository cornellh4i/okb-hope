// File: frontend/src/components/profProfile/SimilarPsychCard.tsx

import React from 'react';
import { IPsychiatrist } from '@/schema';

interface SimilarPsychCardProps {
  psychiatrist: IPsychiatrist;
}

const SimilarPsychCard: React.FC<SimilarPsychCardProps> = ({ psychiatrist }) => {
  return (
    <div className="flex items-center gap-4 py-3 border-b last:border-none">
      {/* Profile Image */}
      <img
        src={psychiatrist.profile_pic || '/default-avatar.png'}
        alt={`${psychiatrist.lastName}'s profile`}
        className="w-12 h-12 rounded-full object-cover"
      />

      {/* Psychiatrist Details */}
      <div>
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
