import { useState, useEffect, useRef } from 'react';
import MessageItem from './MessageItem';
import { db, auth } from '../../../firebase/firebase'
import { collection, getDocs, where, query, orderBy, DocumentData, onSnapshot } from "firebase/firestore"

const MessageList: React.FC = () => {
  const uid = auth.currentUser?.uid;
  const photoURL = auth.currentUser?.photoURL;
  const messagesRef = collection(db, "Chats");

  // const messagesRef = collection(db, "conversations");
  const [messages, setMessages] = useState<DocumentData[]>([]);
  // Ref to scroll to most recent message in MessageList
  const scrollEnd = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if(uid){
      const queryDoc = query(messagesRef, where("uid","==",uid), orderBy('createdAt')); 
      console.log(queryDoc);
      const unsubscribe = onSnapshot(queryDoc, (querySnapshot) => {
        const messageData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMessages(messageData);
      },(error) => {console.error("Error fetching data: ", error);});
      return () => {
        unsubscribe();
      };
    }
  }, []);


  // Scrolls to most recent message in MessageList every time there is an update to messages.
  useEffect(() => {
    const inputElement = scrollEnd.current

    if (inputElement) {
      inputElement.scrollIntoView({ behavior: 'smooth' });
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
        {/* HTML element to scroll to */}
        <div ref={scrollEnd}></div>
      </div>
    </div>

  );
};

export default MessageList;