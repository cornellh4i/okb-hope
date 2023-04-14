import React from 'react';
import ConversationItem from './ConversationItem';
import { db } from '../../../../backend/firebase/firebase'
import { collection, getDocs, query, orderBy, DocumentData } from "firebase/firestore"
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

const ConversationList: React.FC<ConversationListProps> = ({ conv }) => {


  const conversationsRef = collection(db, "ChatUserPsychiatrists");
  // const queryDoc = query(conversationsRef, orderBy('createdAt'));
  const [conversations, setConversations] = useState<DocumentData[]>([]);

  useEffect(() => {
    const getConversations = async () => {
      const querySnapShot = await getDocs(conversationsRef);
      const conversationData = querySnapShot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setConversations(conversationData);
    };
    getConversations();
    // Render new messages every time db is updated
  }, [collection(db, "ChatUserPsychiatrists")]);

  return (
    <div className="conversation-list bg-white">
      {conversations.map((conversation, index) => (
        <ConversationItem key={index} conversation={conversation} />
      ))}
      {/* <span>Test Conversation List</span> */}
    </div>
  );
};

export default ConversationList;
