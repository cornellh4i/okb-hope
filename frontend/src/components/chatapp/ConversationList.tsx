import React from 'react';
import ConversationItem from './ConversationItem';
import { db } from "../../../firebase/firebase"
import { collection, getDocs, query, orderBy, DocumentData, onSnapshot } from "firebase/firestore"
import { useState, useEffect } from 'react';
import HorizontalLine from '../../assets/horizontal_line.svg';

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
  read: boolean,
  conversations: Conversation[];
};

const ConversationList: React.FC<ConversationListProps> = ({ read, conversations }) => {


  const conversationsRef = collection(db, "conversations");
  // const queryDoc = query(conversationsRef, orderBy('createdAt'));
  const [conversationList, setConversationsList] = useState<DocumentData[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(conversationsRef, (querySnapshot) => {
      const conversationData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setConversationsList(conversationData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  {/* {index < conversationList.length - 1 && <HorizontalLine></HorizontalLine>} */ }

  return (
    <div className="conversation-list">
      {conversationList.map((conversation, index) => (
        <ConversationItem key={index} read={read} conversation={conversation} isLast={index === conversationList.length - 1}/>
      ))}
    </div>
  );
};

export default ConversationList;
