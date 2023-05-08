import React from 'react';
import ConversationItem from './ConversationItem';
import { db } from "../../../firebase/firebase"
import { collection, getDocs, query, orderBy, DocumentData, onSnapshot } from "firebase/firestore"
import { useState, useEffect } from 'react';
// Define the Conversation type
type Conversation = {
  id: string;
  name: string;
  specialty: string;
  location: string;
  // Add other necessary fields
};

// Define the type for props
type ConversationListProps = {
  conversations: Conversation[];
};

const ConversationList: React.FC<ConversationListProps> = ({ }) => {


  const conversationsRef = collection(db, "conversations");
  // const queryDoc = query(conversationsRef, orderBy('createdAt'));
  const [conversations, setConversations] = useState<DocumentData[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(conversationsRef, (querySnapshot) => {
      const conversationData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setConversations(conversationData);
    });
  
    return () => {
      unsubscribe();
    };
  }, []);
  
  

  return (
    <div className="conversation-list">
      {conversations.map((conversation, index) => (
        <ConversationItem key={index} conversation={conversation} />
      ))}
      {/* <span>Test Conversation List</span> */}
    </div>
  );
};

export default ConversationList;
