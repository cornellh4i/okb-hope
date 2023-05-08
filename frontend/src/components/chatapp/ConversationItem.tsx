import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase/firebase';
import { collection, getDocs, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

const ConversationItem: React.FC<{ conversation: any }> = ({ conversation }) => {
  const messagesRef = collection(db, `conversations/${conversation.id}/messages`);
  const queryDoc = query(messagesRef, orderBy('createdAt', 'desc'), limit(1));
  const [lastMessage, setLastMessage] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(queryDoc, (querySnapshot) => {
      const messageData = querySnapshot.docs.map((doc) => doc.data())[0];
      setLastMessage(messageData?.content || null);
    });
  
    return () => {
      unsubscribe();
    };
  }, [collection(db, `conversations/${conversation.id}/messages`)]);
  

  return (
    <div className="conversation-item bg-white border-b-4 rounded-b-md px-2 py-2">
      <button className="font-semibold mb-1">{conversation.name}</button>
      <p className="text-sm text-gray-600">{lastMessage || 'No messages'}</p>
    </div>
  );
};

export default ConversationItem;
