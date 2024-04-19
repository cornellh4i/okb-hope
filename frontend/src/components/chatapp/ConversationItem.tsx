import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase/firebase';
import { collection, query, orderBy, limit, onSnapshot, doc, updateDoc, getDocs, where } from 'firebase/firestore';
import { fetchProfessionalData, fetchPatientDetails } from '../../../firebase/fetchData';
import { useAuth } from '../../../contexts/AuthContext';
import { useRouter } from 'next/router';

// Updated props type to include onSelect and isSelected
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
    // Update unread messages count
    setUnreadMessages(user?.uid === conversation.patientId ? conversation.messagesUnreadByPatient : conversation.messagesUnreadByPsych);
  }, [user?.uid, conversation.messagesUnreadByPatient, conversation.messagesUnreadByPsych, conversation.patientId]);

  const handleClick = () => {

    updateUnreadMessages();

    onSelect();
    const { patientId, psychiatristId } = conversation;
    localStorage.setItem('selectedConversationId', `${conversation.patientId}-${conversation.psychiatristId}`);
    // let url;
    // if (user?.uid === conversation.patientId) {
    //   url = `/patient/${patientId}/messages?psych_id=${psychiatristId}&psych_name=${encodeURIComponent(displayName)}`;
    // } else {
    //   url = `/psychiatrist/${psychiatristId}/messages?patient_id=${patientId}&patient_name=${encodeURIComponent(displayName)}`;

    // }
    const url = `/patient/${patientId}/messages?psych_id=${psychiatristId}&psych_name=${encodeURIComponent(displayName)}`;
    // const url = `/psychiatrist/${psychiatristId}/messages?patient_id=${patientId}&patient_name=${encodeURIComponent(displayName)}`;
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
      className={`conversation-item group ${!isLast ? 'border-b-[1px]' : ''} ${isSelected ? 'bg-[#D0DBEA]' : 'bg-white'} hover:bg-[#D0DBEA]`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className='flex flex-row px-3 py-4 gap-4 items-center w-full'>
        <div className='flex-grow flex flex-col items-start rounded-[10px]'>
          <button className="font-semibold mb-1 text-black text-[16px]">{displayName}</button>
          <p className="text-[12px] text-black">{conversation.recentMessage.text || 'No messages'}</p>
        </div>
        {unreadMessages > 0 ? (
          <div className='flex py-0.5 px-1.5 min-w-[20px] h-[19px] justify-center items-center rounded-[25px] bg-[#519AEB] text-white text-xs font-bold mr-auto'>
            {unreadMessages}
          </div>
        ) : ""}
      </div>
    </button>

  );
};

export default ConversationItem;
