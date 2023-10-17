import React from 'react';
import Link from 'next/link';
import SideBar from './SideBar';
import ChatArea from './ChatArea';
import { useAuth } from '../../../contexts/AuthContext';
import { LoginPopup } from '../LoginPopup';

/** TitleArea represents the title at the top of the ChatPage which is
 *  "Messages" and the button to the left "Back to Dashboard" */
const TitleArea = () => {
  return (
    <div className='pt-2 pb-3'>
      <Link href="/">
          <button
            className='rounded-xl bg-gray-100 px-2 py-1 ml-2 absolute hover:bg-gray-200'
          >
            Back to Dashboard
          </button>
      </Link>
      <p className='font-semibold text-3xl text-center tracking-wide'>Messages</p>
    </div>
  )
}

/** The main Chat App. Contains the TitleArea, the SideBar, and the ChatArea. */
const ChatApp: React.FC = () => {
  return (
    <div className="chat-app py-1 px-1 bg-gray-300 rounded-md w-full h-auto max-h-screen">
      {/* <TitleArea /> */}
      <div className="flex">
        <div className='w-3/12'>
          <SideBar />
        </div>
        <div className='w-9/12'>
          <ChatArea />
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
