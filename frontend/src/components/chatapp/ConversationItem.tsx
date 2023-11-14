import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase/firebase';
import { collection, getDocs, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

// const dummyData = {
//   name: "Jane Doe",
//   text: "Hi Doctor Doe! I’m interested in scheduling an appointment with a psychiatrist, and I came across your profile. I've been struggling with feeling anxious..."
// };

const ConversationItem: React.FC<{ read: boolean, conversation: any, isLast: boolean }> = ({ read, conversation, isLast }) => {
  const [isHovered, setIsHovered] = useState(false);
  const messagesRef = collection(db, `conversations/${conversation.id}/messages`);
  const queryDoc = query(messagesRef, orderBy('createdAt', 'desc'), limit(1));
  const [lastMessage, setLastMessage] = useState<string | null>(conversation.text);

  // Comment this out currently because we are using dummy data for the frontend
  // useEffect(() => {
  //   const unsubscribe = onSnapshot(queryDoc, (querySnapshot) => {
  //     const messageData = querySnapshot.docs.map((doc) => doc.data())[0];
  //     setLastMessage(messageData?.content || null);
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, [collection(db, `conversations/${conversation.id}/messages`)]);

  useEffect(() => {
    console.log(conversation)
    setLastMessage(conversation.text)
    console.log(lastMessage)
  }, [conversation]);

  const hoverStyles = isHovered ? { backgroundColor: '#D0DBEA' } : {};

  return (
    <div
      className={`conversation-item group ${!isLast ? 'border-b-[1px]' : ''}`}
      style={hoverStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className='flex flex-row px-3 py-4 gap-4 bg-white items-center mx-5' style={hoverStyles}>
        <div className='flex flex-col items-start rounded-[10px]' style={hoverStyles}>
          <button className="font-semibold mb-1 text-black text-[16px]" style={hoverStyles}>{conversation.name}</button>
          <p className="text-[12px] text-black" style={hoverStyles}>{lastMessage || 'No messages'}</p>
        </div>
        {!read ? <div className='flex py-0.5 px-1.5 w-[20px] h-[19px] justify-center items-center rounded-[25px] bg-[#519AEB] text-white text-xs font-bold'>2</div> : ""}
      </div>
    </div>
  );
};

export default ConversationItem;
