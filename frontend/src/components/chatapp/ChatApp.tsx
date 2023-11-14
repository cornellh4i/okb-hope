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
    <div className="chat-app py-1 bg-[#FFFDFD] w-full h-screen max-h-screen shadow-inner">
      {/* <TitleArea /> */}
      <div className="flex">
        <div className='w-1/3 overflow-y-auto' style={{ height: '100vh' }}>
          <SideBar />
        </div>
        <div className='w-2/3 sticky top-0' style={{ height: '100vh' }}>
          <ChatArea />
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
