import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import SideBar from './SideBar';
import ChatArea from './ChatArea';
import { useAuth } from '../../../contexts/AuthContext';
import { LoginPopup } from '../LoginPopup';
import router, { useRouter } from 'next/router';

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
const ChatApp = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [isChatAreaVisible, setIsChatAreaVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const router = useRouter();
  const [initialized, setInitialized] = useState(false); // Track if initial checks are completed

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize the mobile check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (router.isReady) {
      // Use router.isReady to ensure router.query is available
      console.log(router.query)
      if ((router.query.psych_name || router.query.patient_name) && isMobile) {
        console.log("false")
        setSidebarVisible(false);
        setIsChatAreaVisible(true);
      } else {
        console.log("true")
        setSidebarVisible(true);
        if (isMobile) setIsChatAreaVisible(false);
      }
      setInitialized(true); // Mark initialization as complete
    }
  }, [router.isReady, router.query, isMobile]);

  if (!initialized) {
    return null; // Optionally, a loading spinner can be returned here during initialization
  }

  return (
    <div className="chat-app page-background w-full shadow-inner">
      <div className="flex flex-col h-screen">
        <div className="flex-grow flex">
          {isSidebarVisible ? (
            <div className={`${isMobile ? 'w-full' : 'md:w-1/3'} overflow-y-auto`}>
              <SideBar />
            </div>
          ) : null}
          {isChatAreaVisible ? (
            <div className={`sticky top-0 ${isSidebarVisible ? 'md:w-2/3' : 'w-full'}`}>
              <ChatArea />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
