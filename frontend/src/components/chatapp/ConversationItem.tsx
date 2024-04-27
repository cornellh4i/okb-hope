import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase/firebase';
import { collection, query, orderBy, limit, onSnapshot, doc, updateDoc, getDocs, where } from 'firebase/firestore';
import { fetchProfessionalData, fetchPatientDetails } from '../../../firebase/fetchData';
import { useAuth } from '../../../contexts/AuthContext';
import { useRouter } from 'next/router';

const ConversationItem: React.FC<{ conversation: any, isLast: boolean, onSelect: () => void, isSelected: boolean }> = ({ conversation, isLast, onSelect, isSelected }) => {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const [unreadMessages, setUnreadMessages] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const fetchNames = async () => {
      if (user?.uid === conversation.patientId) {
        const professionalData = await fetchProfessionalData(conversation.psychiatristId);
        setDisplayName(professionalData.firstName + " " + professionalData.lastName);
      } else {
        const patientData = await fetchPatientDetails(conversation.patientId);
        setDisplayName(patientData.firstName + " " + patientData.lastName);
      }
    };

    fetchNames();
  }, [user?.uid, conversation.patientId, conversation.psychiatristId]);

  useEffect(() => {
    setUnreadMessages(user?.uid === conversation.patientId ? conversation.messagesUnreadByPatient : conversation.messagesUnreadByPsych);
  }, [user?.uid, conversation.messagesUnreadByPatient, conversation.messagesUnreadByPsych, conversation.patientId]);

  const handleClick = () => {
    updateUnreadMessages();

    onSelect();
    const { patientId, psychiatristId } = conversation;
    localStorage.setItem('selectedConversationId', `${conversation.patientId}-${conversation.psychiatristId}`);
    let url;
    if (user?.uid === conversation.patientId) {
      url = `/patient/${patientId}/messages?psych_id=${psychiatristId}&psych_name=${encodeURIComponent(displayName)}`;
    } else {
      url = `/psychiatrist/${psychiatristId}/messages?patient_id=${patientId}&patient_name=${encodeURIComponent(displayName)}`;
    }
    console.log(url)
    router.push(url);
  };

  const updateUnreadMessages = async () => {
    try {
      const conversationsRef = collection(db, "Conversations");
      const q = query(conversationsRef, where("patientId", "==", conversation.patientId), where("psychiatristId", "==", conversation.psychiatristId));
      const querySnapshot = await getDocs(q);
      const conversationDocRef = doc(db, "Conversations", querySnapshot.docs[0].id);
      const unreadMessagesField = user?.uid === conversation.patientId ? "messagesUnreadByPatient" : "messagesUnreadByPsych";

      await updateDoc(conversationDocRef, {
        [unreadMessagesField]: 0
      });

      console.log("Unread messages count updated successfully");
    } catch (error) {
      console.error("Error updating unread messages count: ", error);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`px-6 conversation-item group ${!isLast ? 'border-b-[1px]' : ''} ${isSelected ? 'bg-[#D0DBEA]' : 'page-background'} hover:bg-[#D0DBEA]`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className='flex flex-row px-3 py-4 gap-4 items-center w-full'>
        <div className='flex-grow flex flex-col items-start justify-center min-w-0'>
          <button className="font-montserrat font-semibold mb-1 text-black text-[16px] overflow-hidden text-ellipsis whitespace-nowrap max-w-full">{displayName}</button>
          {/* Apply ellipsis to long messages and limit to 3 lines */}
          <p className="message-preview text-[12px] text-black font-montserrat overflow-hidden overflow-ellipsis whitespace-normal max-w-full" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', lineClamp: 3, MozBoxOrient: 'vertical', textAlign: 'left' }}>{conversation.recentMessage.text || 'No messages'}</p>
        </div>
        {unreadMessages > 0 && (
          <div className='flex py-0.5 px-1.5 min-w-[20px] h-[19px] justify-center items-center rounded-[25px] bg-[#519AEB] text-white text-xs font-bold'>
            {unreadMessages}
          </div>
        )}
      </div>
    </button>
  );
};

export default ConversationItem;
