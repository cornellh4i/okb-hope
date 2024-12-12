import React from 'react';
import Bookmark from '@/assets/bookmark.svg';
import SavedBookmark from '@/assets/saved_bookmark.svg';
import Message from '@/assets/message.svg';
import { IPsychiatrist } from '@/schema';

interface DiscoverCardProps {
  psychiatrist: IPsychiatrist;
  savedPsychiatrists: string[];
  handleSave: (event: React.MouseEvent, psychiatrist: IPsychiatrist) => void;
  handleSendMessage: (event: React.MouseEvent, psychiatrist: IPsychiatrist) => void;
  handleGoToProfProfile: (psych_uid: string) => void;
}

const DiscoverCard: React.FC<DiscoverCardProps> = ({
  psychiatrist,
  savedPsychiatrists,
  handleSave,
  handleSendMessage,
  handleGoToProfProfile,
}) => {
  // Early return if psychiatrist data is not available
  if (!psychiatrist) {
    return <div className="p-4 text-gray-500">Loading...</div>;
  }

  return (
    <div className="flex flex-col sm:flex-row border border-gray-300 rounded-md shadow-md p-10 bg-white hover:shadow-lg transition-shadow" onClick={() => handleGoToProfProfile(psychiatrist.uid)}>
      {/* Profile Picture */}
      <div className="flex-shrink-0">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-md bg-gray-200 overflow-hidden">
          {psychiatrist.profile_pic ? (
            <img
              src={psychiatrist.profile_pic}
              alt={`${psychiatrist?.firstName || ''} ${psychiatrist?.lastName || ''}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-lg font-semibold text-gray-500">
              {psychiatrist?.firstName?.charAt(0)?.toUpperCase() || '?'}
            </div>
          )}
        </div>
      </div>

      {/* Information Section */}
      <div className="flex flex-1 flex-col sm:ml-6">
        {/* Name and Position */}
        <div className="flex justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              {psychiatrist.firstName} {psychiatrist.lastName}
            </h2>
            <p className="text-sm text-gray-600">
              {psychiatrist.position} {psychiatrist.location && `at ${psychiatrist.location}`}
            </p>
          </div>
        </div>

         {/* Languages */}
         <p className="mt-2 text-sm text-gray-500">
           Languages: {psychiatrist.language?.join(', ') || 'Not specified'}
         </p>

        {/* Specialties */}
        <div className="mt-2 flex flex-wrap gap-2">
          {psychiatrist.specialty?.map((spec, index) => (
            <span
              key={index}
              className="text-sm text-gray-700 py-1 px-3 rounded-md border-2"
            >
              {spec}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="mt-2 text-sm text-gray-700 line-clamp-3">
          {psychiatrist.description || "No description available."}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 mt-4 sm:mt-0 sm:ml-4 sm:justify-center">
        {/* Send Message Button */}
        <button
          className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          onClick={(event) => {
            event.stopPropagation();
            handleSendMessage(event, psychiatrist);
          }}
        >
          Send a message
        </button>

        {/* Save Button */}
        <button
          className={`py-2 px-4 border rounded-md ${
            savedPsychiatrists?.includes(psychiatrist.uid)
              ? 'border-blue-500 text-blue-500'
              : 'border-gray-300 text-gray-700'
          } hover:bg-gray-100`}
          onClick={(event) => {
            event.stopPropagation();
            handleSave(event, psychiatrist);
          }}
        >
          {savedPsychiatrists?.includes(psychiatrist.uid) ? 'Saved' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default DiscoverCard;