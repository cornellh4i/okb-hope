import React, { useState, useEffect } from 'react';
import ConversationItem from './ConversationItem';
import { db } from "../../../firebase/firebase";
import { collection, onSnapshot, query, where, doc, getDocs } from "firebase/firestore";
import { useAuth } from '../../../contexts/AuthContext';

type RecentMessage = {
  text: string;
  createdAt: any;
  photoURL: string;
};

type Conversation = {
  patientId: string;
  psychiatristId: string;
  recentMessage: RecentMessage;
  messagesUnreadByPatient: number;
  messagesUnreadByPsych: number;
  deletedByPatient: boolean;
  deletedByPsych: boolean;
};

interface ConversationListProps {
  read: boolean;
  selectedConversationId: string;
  onSelectConversation: (conversationId: string) => void;
  conversations: Conversation[];
  searchInput: string;
}

const ConversationList: React.FC<ConversationListProps> = ({
  read,
  selectedConversationId,
  onSelectConversation,
  conversations,
  searchInput
}) => {
  const [conversationList, setConversationsList] = useState<Conversation[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchConversations = async () => {
      if (!user?.uid) return;

      const conversationsRef = collection(db, "Conversations");
      const chatsRef = collection(db, "Chats");

      const unsubscribe = onSnapshot(conversationsRef, async (querySnapshot) => {
        const conversationData: Conversation[] = [];

        for (const doc of querySnapshot.docs) {
          const data = doc.data();
          if (data.patientId === user.uid || data.psychiatristId === user.uid) {
            const isPatient = data.patientId === user.uid;
            const messagesUnread = isPatient ? data.messagesUnreadByPatient : data.messagesUnreadByPsych;
            const shouldInclude = read ? messagesUnread < 1 : messagesUnread >= 1;

            if (shouldInclude && (isPatient ? !data.deletedByPatient : !data.deletedByPsych)) {
              const conversation: Conversation = {
                patientId: data.patientId,
                psychiatristId: data.psychiatristId,
                recentMessage: data.recentMessage,
                messagesUnreadByPatient: data.messagesUnreadByPatient,
                messagesUnreadByPsych: data.messagesUnreadByPsych,
                deletedByPatient: data.deletedByPatient,
                deletedByPsych: data.deletedByPsych
              };
              conversationData.push(conversation);
            }
          }
        }

        // Sort conversationData based on recentMessage.createdAt
        conversationData.sort((a, b) => b.recentMessage.createdAt - a.recentMessage.createdAt);

        // Update the conversationList state to trigger a re-render
        setConversationsList(conversationData);
      });

      return () => unsubscribe();
    };

    fetchConversations();
  }, [user?.uid, read, searchInput]);

  const handleSelectConversation = (conversationId: string) => {
    onSelectConversation(conversationId);
  };

  return (
    <div className="conversation-list">
      {conversationList.map((conversation, index) => (
        <ConversationItem
          key={`${conversation.patientId}-${conversation.psychiatristId}`} // Unique key based on patientId and psychiatristId
          conversation={conversation}
          isLast={index === conversationList.length - 1}
          onSelect={() => handleSelectConversation(`${conversation.patientId}-${conversation.psychiatristId}`)}
          isSelected={selectedConversationId === `${conversation.patientId}-${conversation.psychiatristId}`}
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
