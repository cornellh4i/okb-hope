import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase/firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { fetchProfessionalData, fetchPatientDetails } from '../../../firebase/fetchData';
import { useAuth } from '../../../contexts/AuthContext';
import { useRouter } from 'next/router';

const ConversationItem: React.FC<{ read: boolean, conversation: any, isLast: boolean }> = ({ read, conversation, isLast }) => {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [lastMessage, setLastMessage] = useState<string | null>(null);
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

  // useEffect(() => {
  //   // This assumes that the conversation object has a property `id` for identifying the conversation
  //   // Adjust the logic here if your conversation identifiers are structured differently
  //   const messagesRef = collection(db, `conversations/${conversation.id}/messages`);
  //   const queryDoc = query(messagesRef, orderBy('createdAt', 'desc'), limit(1));

  //   const unsubscribe = onSnapshot(queryDoc, (querySnapshot) => {
  //     const messageData = querySnapshot.docs.map((doc) => doc.data())[0];
  //     setLastMessage(messageData?.content || conversation.recentMessage?.text || null);
  //   });

  //   return () => unsubscribe();
  // }, [conversation.id, conversation.recentMessage?.text]);

  const hoverStyles = isHovered ? { backgroundColor: '#D0DBEA' } : {};

  const handleClick = () => {
    const { patientId, psychiatristId } = conversation;
    const url = `/patient/${patientId}/messages?psych_id=${psychiatristId}&psych_name=${encodeURIComponent(displayName)}`;
    router.push(url);
  };

  return (
    <button
      className={`conversation-item group ${!isLast ? 'border-b-[1px]' : ''}`}
      style={hoverStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className='flex flex-row px-3 py-4 gap-4 bg-white items-center mx-5' style={hoverStyles}>
        <div className='flex flex-col items-start rounded-[10px]'>
          <button className="font-semibold mb-1 text-black text-[16px]">{displayName}</button>
          <p className="text-[12px] text-black">{conversation.recentMessage.text || 'No messages'}</p>
        </div>
        {!read ? <div className='flex py-0.5 px-1.5 w-[20px] h-[19px] justify-center items-center rounded-[25px] bg-[#519AEB] text-white text-xs font-bold'>2</div> : ""}
      </div>
    </button>
  );
};

export default ConversationItem;