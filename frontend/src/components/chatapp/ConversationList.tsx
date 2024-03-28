import React from 'react';
import ConversationItem from './ConversationItem';
import { db } from "../../../firebase/firebase"
import { collection, onSnapshot } from "firebase/firestore"
import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { fetchPatientDetails, fetchProfessionalData } from '../../../firebase/fetchData';

type RecentMessage = {
  text: string;
  createdAt: any; // Update the type based on your actual data type
  photoURL: string;
};

type Conversation = {
  patientId: string;
  psychiatristId: string;
  recentMessage: RecentMessage
};

type ConversationListProps = {
  read: boolean,
  conversations: Conversation[];
};

const ConversationList: React.FC<ConversationListProps> = ({ read, conversations }) => {
  const conversationsRef = collection(db, "Conversations");
  const [conversationList, setConversationsList] = useState<Conversation[]>([]);
  const { user } = useAuth();

  // useEffect(() => {
  //   const fetchNames = async () => {
  //     if (user?.uid === conversations.patientId) {

  //     } else if (user?.uid === conversations.psychatristId) {

  //     }
  //   };

  //   fetchNames();
  // }, [user?.uid, conversation.patientId, conversation.psychiatristId]);


  useEffect(() => {
    const unsubscribe = onSnapshot(conversationsRef, (querySnapshot) => {
      const conversationData: Conversation[] = [];
      querySnapshot.forEach((doc) => {
        const conversation = doc.data() as Conversation;
        if (user?.uid === conversation.patientId) {
          conversationData.push(conversation);
        } else if (user?.uid === conversation.psychiatristId) {
          conversationData.push(conversation);
        }
      });
      setConversationsList(conversationData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="conversation-list">
      {conversationList.map((conversation, index) => (
        <ConversationItem
          key={index}
          read={read}
          conversation={conversation}
          isLast={index === conversationList.length - 1}
        />
      ))}
      <style jsx>{`
        .conversation-list {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
};

export default ConversationList;
