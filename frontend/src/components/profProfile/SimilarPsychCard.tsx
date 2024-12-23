import React from 'react';
import { IPsychiatrist } from '@/schema';
import okb_colors from '@/colors';
import { useAuth } from '../../../contexts/AuthContext';
import { useRouter } from 'next/router';

interface SimilarPsychCardProps {
  psychiatrist: IPsychiatrist;
}

const SimilarPsychCard: React.FC<SimilarPsychCardProps> = ({ psychiatrist }) => {
  const router = useRouter();
  const { user } = useAuth();

  // Redirect to a professional's profile page with their UID
  const handleGoToProfProfile = (psych_uid: string) => {
    if (user) {
      router.push({
        pathname: `/${user.userType}/${user.uid}/prof_profile`,
        query: { psych_uid },
      });
    } else {
      router.push({
        pathname: `/prof_profile`,
        query: { psych_uid },
      });
    }
  };

  return (
    <div
      className="py-3 border-b last:border-none w-full cursor-pointer"
      onClick={() => handleGoToProfProfile(psychiatrist.uid)}
    >
      <div className="flex items-start space-x-4">
        <img
          src={psychiatrist.profile_pic || '/default-avatar.png'}
          alt={`${psychiatrist.lastName}'s profile`}
          className="w-12 h-12 rounded-full object-cover border border-gray-300"
        />
        <div className="flex-1 min-w-0">
          <h4
            className="text-sm font-semibold text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis"
            style={{ maxWidth: "calc(100% - 3rem)" }}
          >
            Dr. {psychiatrist.firstName} {psychiatrist.lastName}
          </h4>
          <p className="text-xs text-gray-600">
            Psychiatrist at {psychiatrist.location || 'Unknown Hospital'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimilarPsychCard;