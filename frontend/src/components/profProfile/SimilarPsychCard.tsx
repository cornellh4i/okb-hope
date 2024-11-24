import React from 'react';
import { IPsychiatrist } from '@/schema';
import okb_colors from '@/colors';

interface SimilarPsychCardProps {
  psychiatrist: IPsychiatrist;
}

const SimilarPsychCard: React.FC<SimilarPsychCardProps> = ({ psychiatrist }) => {
  return (
    <div className="py-3 border-b last:border-none">
      {psychiatrist?.profile_pic ? (
                            <img
                                src={psychiatrist.profile_pic}
                                alt="Profile"
                                className="w-16 h-16 object-cover rounded"
                            />
                        ) : (
                            <div 
                                style={{ 
                                    backgroundColor: okb_colors.okb_blue 
                                }} 
                                className="w-16 h-16 text-4xl font-normal text-white flex items-center justify-center rounded"
                            >
                                {psychiatrist?.firstName?.charAt(0).toUpperCase()}
                            </div>
                        )}

      <div className="mt-2">
        <h4 className="text-sm font-semibold text-gray-800">
          {psychiatrist.firstName} {psychiatrist.lastName}
        </h4>
        <p className="text-xs text-gray-600">
          Psychiatrist at {psychiatrist.location || 'Unknown Hospital'}
        </p>
      </div>
    </div>
  );
};

export default SimilarPsychCard;