import React, { useState, useEffect } from 'react';
import ConversationItem from './ConversationItem';
import { db } from "../../../firebase/firebase";
import { collection, onSnapshot, query, where, doc, getDocs } from "firebase/firestore";
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

type Chat = {
  createdAt: Date;
  photoURL: string;
  recipientId: string;
  text: string;
  uid: string;
}

interface ConversationListProps {
  read: boolean;
  selectedConversationId: string; // Receive selectedConversationId
  onSelectConversation: (conversationId: string) => void; // Receive onSelectConversation function
  conversations: Conversation[];
  searchInput: string; // New prop for search input
}

const ConversationList: React.FC<ConversationListProps> = ({ read, selectedConversationId, onSelectConversation, conversations, searchInput }) => {
  const [conversationList, setConversationsList] = useState<Conversation[]>([]);
  const psychiatristNames = {};

  const { user } = useAuth();

  useEffect(() => {
    const isPatient = user?.userType === 'psychiatrist' ? true : false

    // const fetchPsychData = async () => {
    //   const psychiatristNames = {};
    //   const querySnapshot = await getDocs(collection(db, 'psychiatrists'));
    //   querySnapshot.forEach((doc) => {
    //     psychiatristNames[doc.data().uid] = doc.data().firstName + " " + doc.data().lastName;
    //   });
    //   return psychiatristNames;
    // };

    // const fetchPatientData = async () => {
    //   const patientNames = {};
    //   const querySnapshot = await getDocs(collection(db, 'patients'));
    //   querySnapshot.forEach((doc) => {
    //     patientNames[doc.data().uid] = doc.data().firstName + " " + doc.data().lastName;
    //   });
    //   return patientNames;
    // };

    const fetchConversations = async () => {
      if (!user?.uid) return;

      const conversationsRef = collection(db, "Conversations");
      const chatsRef = collection(db, "Chats");

      const unsubscribe = onSnapshot(conversationsRef, async (querySnapshot) => {
        const conversationData: Conversation[] = [];

        const chatPromises = querySnapshot.docs.map(async (doc) => {
          const data = doc.data();
          if (data.patientId === user.uid || data.psychiatristId === user.uid) {
            const isPatient = data.patientId === user.uid;
            const messagesUnread = isPatient ? data.messagesUnreadByPatient : data.messagesUnreadByPsych;
            const shouldInclude = read ? messagesUnread < 1 : messagesUnread >= 1;

            if (shouldInclude) {
              let isSearched = true;
              // If searchInput is not blank, query for chats where searchInput is "test" and uid or recipientId is either data.patientId or data.psychiatristId
              if (searchInput.trim() !== "") {


                const chatsQuerySnapshot = query(
                  chatsRef,
                  where("text", "==", searchInput),
                  where("uid", "in", [data.patientId, data.psychiatristId]),
                  where("recipientId", "in", [data.patientId, data.psychiatristId])
                );
                const querySnapshot = await getDocs(chatsQuerySnapshot);
                if (querySnapshot.empty) {
                  isSearched = false;
                }
              }

              if (isSearched) {
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
          }
        });

        await Promise.all(chatPromises);

        conversationData.sort((a, b) => b.recentMessage.createdAt - a.recentMessage.createdAt);
        setConversationsList(conversationData);
      });

      return () => unsubscribe();
    };

    fetchConversations();
  }, [user?.uid, read, searchInput]);

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
