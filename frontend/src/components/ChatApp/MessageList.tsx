import { useState, useEffect } from 'react';
import MessageItem from './MessageItem';
import { db } from '../../../../backend/firebase/firebase'
import { collection, getDocs, query, orderBy, limit, DocumentData } from "firebase/firestore"

const MessageList: React.FC = () => {
  const messagesRef = collection(db, "Chats");
  const queryDoc = query(messagesRef, orderBy('createdAt'), limit(30));
  const [messages, setMessages] = useState<DocumentData[]>([]);

  useEffect(() => {
    const getMessages = async () => {
      const querySnapShot = await getDocs(queryDoc);
      const messageData = querySnapShot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMessages(messageData);
    };
    getMessages();
    // Render new messages every time db is updated
  }, [collection(db, "Chats")]);

  return (
    // Map all messages in db
    <div className="message-list bg-blue-100 h-full">
      {messages && messages.map((msg) => (
        <MessageItem key={msg.id} message={msg} />
      ))}
    </div>
  );
};

export default MessageList;
