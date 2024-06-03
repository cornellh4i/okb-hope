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
              let isSearched = false;
              const searchTextLower = searchInput.toLowerCase(); // Convert search input to lowercase

              // Fetch the chat documents for the current conversation
              const chatQuery = query(
                chatsRef,
                where("uid", "in", [data.patientId, data.psychiatristId]),
                where("recipientId", "in", [data.patientId, data.psychiatristId])
              );
              const chatDocs = (await getDocs(chatQuery)).docs.map(chatDoc => chatDoc.data());

              // Check each chat document
              for (const chatData of chatDocs) {
                const chatTextLower = chatData.text.toLowerCase(); // Convert chat text to lowercase

                if (chatTextLower.includes(searchTextLower)) {
                  isSearched = true;
                  break; // No need to continue searching if one chat matches
                }
              }
              console.log("searched", isSearched)

              if (searchInput === "" || isSearched) {
                if (isPatient ? !data.deletedByPatient : !data.deletedByPsych) {
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