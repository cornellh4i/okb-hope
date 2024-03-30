import React, { useState, useEffect } from 'react';
import ConversationItem from './ConversationItem';
import { db } from "../../../firebase/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useAuth } from '../../../contexts/AuthContext';

// Assuming the Conversation type is correctly defined as before
type RecentMessage = {
  text: string;
  createdAt: any; // Consider using firebase.firestore.Timestamp or Date depending on your data
  photoURL: string;
};

type Conversation = {
  patientId: string;
  psychiatristId: string;
  recentMessage: RecentMessage;
  messagesUnreadByPatient: number;
  messagesUnreadByPsych: number;
};

interface ConversationListProps {
  read: boolean;
  selectedConversationId: string; // Receive selectedConversationId
  onSelectConversation: (conversationId: string) => void; // Receive onSelectConversation function
  conversations: Conversation[];
}

const ConversationList: React.FC<ConversationListProps> = ({ read, selectedConversationId, onSelectConversation }) => {
  const [conversationList, setConversationsList] = useState<Conversation[]>([]);

  const { user } = useAuth();

  useEffect(() => {
    if (!user?.uid) return;

    const conversationsRef = collection(db, "Conversations");
    // Fetch all conversations without initially filtering by messages unread
    const q = query(conversationsRef);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const conversationData: Conversation[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.patientId === user.uid || data.psychiatristId === user.uid) {
          // Apply filtering logic here based on whether the user is a patient or psychiatrist in this conversation
          const isPatient = data.patientId === user.uid;
          const messagesUnread = isPatient ? data.messagesUnreadByPatient : data.messagesUnreadByPsych;
          const shouldInclude = read ? messagesUnread < 1 : messagesUnread >= 1;

          if (shouldInclude) {
            const conversation: Conversation = {
              patientId: data.patientId,
              psychiatristId: data.psychiatristId,
              recentMessage: data.recentMessage,
              messagesUnreadByPatient: data.messagesUnreadByPatient,
              messagesUnreadByPsych: data.messagesUnreadByPsych,
            };
            conversationData.push(conversation);
          }
        }
      });
      conversationData.sort((a, b) => b.recentMessage.createdAt - a.recentMessage.createdAt);

      setConversationsList(conversationData);
    });

    return () => unsubscribe();
  }, [user?.uid, read]);


  const handleSelectConversation = (conversationId: string) => {
    onSelectConversation(conversationId);
    // localStorage.setItem('selectedConversationId', conversationId);
    // setSelectedConversationId(conversationId);
  };

  return (
    <div className="conversation-list">
      {conversationList.map((conversation, index) => (
        <ConversationItem
          // read={read}
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
