import React from 'react';
import { useEffect, useState } from 'react';
import { fetchProfessionalData } from '../../../firebase/fetchData';
import MessageList from './MessageList';
import MessageComposer from './MessageComposer';
import ellipsis from '../../assets/ellipses'
import okb_colors from '@/colors';
import { useRouter } from 'next/router';


interface NameAreaType {
  name: string;
  credentials: string;
}

/** This is the area with Doctor Name, Credentials, and Ellipses button */
const NameArea = ({ name, credentials }: NameAreaType) => {
  return (
    <div className='name-area flex py-4 px-6 justify-between items-center shrink-0 w-full bg-white border-b-solid border-b-2 border-[#DEDEDE]'>
      <p className='text-[24px] font-semibold color-black'>{name}</p>
      <div className="dropdown dropdown-click dropdown-bottom dropdown-end">
        <button className={`rounded-full color-[${okb_colors.dark_gray}] hover:bg-gray-200`}>
          {ellipsis}
        </button>
        <ul className='menu dropdown-content inline-flex py-2 px-4 flex-col items-start gap-[14px] rounded-[10px] border-[1px] border-[#C1C1C1] shadow bg-[#FFFDFD] -box w-52'>
          <li>Mark as Unread</li>
          <li>View Profile</li>
          <li>Book Appointment</li>
          <li>Delete Message Thread</li>
        </ul>
      </div>

    </div>
  );
}

const navbarHeight = 1440;

/** The ChatArea displays the Name Area, the Message List, and the Message Composer. */
const ChatArea = () => {
  const router = useRouter();
  const [psychiatristName, setPsychiatristName] = useState('Doctor');

  // Assuming you're fetching psychiatrist data if only ID is provided
  useEffect(() => {
    const fetchPsychiatristName = async () => {
      const { psych_id, psych_name } = router.query;

      if (psych_name) {
        // Directly set the psychiatrist's name if it's in the query params
        setPsychiatristName(decodeURIComponent(psych_name as string));
      } else if (psych_id) {
        // Fetch the psychiatrist's data using the ID if the name isn't in the query
        try {
          const psychiatristData = await fetchProfessionalData(psych_id as string);
          if (psychiatristData) {
            setPsychiatristName(`${psychiatristData.firstName} ${psychiatristData.lastName}`);
          }
        } catch (error) {
          console.error('Failed to fetch psychiatrist data:', error);
          // Optionally, handle the error (e.g., show a notification)
        }
      }
    };

    if (router.isReady) {
      fetchPsychiatristName();
    }
  }, [router.isReady, router.query]);

  return (
    <div className="chat-area flex flex-col h-screen">
      <NameArea name={psychiatristName} credentials="Credentials" />
      <div className="flex-grow overflow-scroll">
        <div className='h-full overflow-scroll'><MessageList /></div>
      </div>
      <MessageComposer />
    </div>
  );
};

export default ChatArea;