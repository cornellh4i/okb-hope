import React from 'react';
import { useRouter } from 'next/router';
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
  const router = useRouter();

  return (
    <div
      className="flex flex-col sm:flex-row border border-gray-300 rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow"
      onClick={() => handleGoToProfProfile(psychiatrist.uid)}
    >
      {/* Profile Picture */}
      <div className="flex-shrink-0">
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-3xl font-semibold text-white overflow-hidden">
          {psychiatrist.profile_pic ? (
            <img src={psychiatrist.profile_pic} alt={`${psychiatrist.firstName} ${psychiatrist.lastName}`} className="w-full h-full object-cover" />
          ) : (
            psychiatrist.firstName.charAt(0).toUpperCase()
          )}
        </div>
      </div>

      {/* Information Section */}
      <div className="flex flex-1 flex-col sm:ml-4">
        {/* Name and Position */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">{psychiatrist.firstName} {psychiatrist.lastName}</h2>
            <p className="text-sm text-gray-600">{psychiatrist.position} at {psychiatrist.location}</p>
          </div>
        </div>

        {/* Languages */}
        <p className="mt-2 text-sm text-gray-500">Languages: {psychiatrist.language.join(', ')}</p>

        {/* Specialty Tags */}
        <div className="mt-2 flex flex-wrap gap-2">
          {psychiatrist.specialty.map((spec, index) => (
            <span
              key={index}
              className="bg-gray-200 text-sm text-gray-700 py-1 px-2 rounded-md"
            >
              {spec}
            </span>
          ))}
        </div>
        <div>
        {/* Description */}
        <p className="mt-2 text-sm text-gray-700 line-clamp-3">
          {psychiatrist.description || "No description available."}
        </p>
        </div>
        {/* Buttons */}
        <div className="mt-4 flex gap-4">
          {/* Send Message Button */}
          <button
            className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            onClick={(event) => {
              event.stopPropagation();
              handleSendMessage(event, psychiatrist);
            }}
          >
            <div className="flex items-center justify-center gap-2">
              <Message />
              Send Message
            </div>
          </button>

          {/* Save Button */}
          <button
            className={`flex-1 py-2 px-4 border rounded-lg ${savedPsychiatrists.includes(psychiatrist.uid) ? 'border-blue-500 text-blue-500' : 'border-gray-300 text-gray-700'} hover:bg-gray-100`}
            onClick={(event) => {
              event.stopPropagation();
              handleSave(event, psychiatrist);
            }}
          >
            <div className="flex items-center justify-center gap-2">
              {savedPsychiatrists.includes(psychiatrist.uid) ? <SavedBookmark /> : <Bookmark />}
              {savedPsychiatrists.includes(psychiatrist.uid) ? 'Saved' : 'Save'}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscoverCard;
