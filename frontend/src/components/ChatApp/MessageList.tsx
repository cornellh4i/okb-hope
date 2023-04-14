import { useState, useEffect, useRef } from 'react';
import MessageItem from './MessageItem';
import { db } from '../../../../backend/firebase/firebase'
import { collection, getDocs, query, orderBy, DocumentData } from "firebase/firestore"

const MessageList: React.FC = () => {
  const messagesRef = collection(db, "Chats");
  const queryDoc = query(messagesRef, orderBy('createdAt'));
  const [messages, setMessages] = useState<DocumentData[]>([]);
  const scrollEnd = useRef();

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

  useEffect(() => {
    if (scrollEnd) {
      scrollEnd.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }

  }, [messages])

  return (
    // Map all messages in db
    <div className='h-96 bg-white'>
      <div className='py-2'></div>
      <div className="message-list bg-white">
        {messages && messages.map((msg) => (
          <MessageItem key={msg.id} message={msg} />
        ))}
        <div ref={scrollEnd}></div>
      </div>
    </div>

  );
};

export default MessageList;
