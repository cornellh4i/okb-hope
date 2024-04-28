import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import SideBar from './SideBar';
import ChatArea from './ChatArea';
import { useAuth } from '../../../contexts/AuthContext';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { fetchRole } from '../../../firebase/firebase';
import { useRouter } from 'next/router'; // Add this line

const db = getFirestore();

const ChatApp = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [isChatAreaVisible, setIsChatAreaVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [initialized, setInitialized] = useState(false); // Track if initial checks are completed
  const [noDocsFound, setNoDocsFound] = useState(false);
  const { user } = useAuth();
  const [role, setRole] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Initialize router

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
      console.log(router.query);
      if ((router.query.psych_id || router.query.psych_name) && isMobile) {
        console.log("true");
        setSidebarVisible(false);
        setIsChatAreaVisible(true);
      } else if (router.query.psych_id || router.query.psych_name) {
        setSidebarVisible(true);
        setIsChatAreaVisible(true);
      } else {
        console.log(router.query.psych_id)
        console.log("false");
        setSidebarVisible(true);
        setIsChatAreaVisible(false);
      }
      setInitialized(true); // Mark initialization as complete
    }
  }, [router.isReady, router.query, isMobile]);

  useEffect(() => {
    const fetchDataAndDetermineRole = async () => {
      const id = user?.uid;
      if (!id) return;

      setLoading(true);
      try {
        const userRole = await fetchRole(id);
        setRole(userRole);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user role:', error);
        setLoading(false);
      }
    };

    fetchDataAndDetermineRole();
  }, [user?.uid]);

  useEffect(() => {
    const uid = user?.uid
    console.log("role")
    console.log(role)

    if (uid) {
      const conversationsQuery = role === "psychiatrist" ? 
        query(collection(db, 'Conversations'), where('psychiatristId', '==', uid)) : 
        query(collection(db, 'Conversations'), where('patientId', '==', uid));

      // Execute the query
      getDocs(conversationsQuery)
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
            setNoDocsFound(true); // Set state variable if no documents found
            console.log("DOCS NOT FOUND!!!")
          } else {
            setNoDocsFound(false); // Reset state variable if documents found
            console.log("DOCS FOUND!!!")
          }
        })
        .catch((error) => {
          console.error("Error getting conversations: ", error);
        });
    } else {
      console.error("Invalid URL structure or psychiatristId not found in URL");
    }
  }, [db, role, user?.uid]);

  if (!initialized || loading) {
    return null; // Optionally, a loading spinner can be returned here during initialization
  }

  return (
    <div className="chat-app py-1 page-background w-full h-screen max-h-screen shadow-inner">
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
          ) : (
            <div className="page-background text-center text-gray-400 pt-4 px-4 font-montserrat italic">
              {role === "patient" ? (
                noDocsFound ? "Explore and chat with medical professionals using the Discover Professionals tab." : "Start chatting by selecting a conversation."
              ) : (
                noDocsFound ? "You have not received any messages from patients yet." : "Start chatting by selecting a conversation."
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );  
};

export default ChatApp;
