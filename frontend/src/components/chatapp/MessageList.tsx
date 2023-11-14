import { useState, useEffect, useRef } from 'react';
import MessageItem from './MessageItem';
import { db, auth } from '../../../firebase/firebase'
import { collection, getDocs, or, where, query, orderBy, DocumentData, onSnapshot,writeBatch } from "firebase/firestore"

const MessageList: React.FC = () => {
  const uid = auth.currentUser?.uid;
  const photoURL = auth.currentUser?.photoURL;
  const messagesRef = collection(db, "Chats");

  const [messages, setMessages] = useState<DocumentData[]>([]);
  // Ref to scroll to most recent message in MessageList
  const scrollEnd = useRef<null | HTMLDivElement>(null);
  const messageClass = uid === auth.currentUser?.uid ? 'sent' : 'received';

  useEffect(() => {
    if(uid){
      const queryDoc = query(messagesRef, or(where("uid","==",uid), where("recipientId","==",uid)), orderBy('createdAt'));  //REPLACE "recipientId","==",uid //where("recipientId","==",uid)
      console.log(queryDoc);
      const unsubscribe = onSnapshot(queryDoc, (querySnapshot) => {
        const messageData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log((messageData.values()))
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

  // temporary function to add recipientId to Chats collection
  async function addFieldToChatsCollection() {
    const tempRef = collection(db, "Chats");
    const batch = writeBatch(db);

    try {
      const querySnapshot = await getDocs(tempRef);
      querySnapshot.forEach((doc) => {
        const docRef = doc.ref;
        const existingData = doc.data();
        const recipientId = existingData.uid || [];
        const dataToUpdate = {
          recipientId: recipientId
        };
        batch.update(docRef, dataToUpdate);
      });

      await batch.commit();
      console.log("Batch update completed successfully.");
    } catch (error) {
      console.error("Error updating documents:", error);
    }
  }
  // addFieldToChatsCollection()

  return ( 
    //account for sent vs. received (placement of text on ChatArea)
    // <div>
    //   {messageClass === 'sent' ? (
    //     //  Map all messages in db 
    //     <div className={ `${messageClass} h-96 bg-white`}>
    //       <div className='py-2'></div>
    //       <div className="message-list bg-white flex flex-col items-end">
    //         {messages && messages.map((msg) => (
    //           <MessageItem key={msg.id} message={msg} />
    //         ))}
    //         {/* HTML element to scroll to */}
    //         <div ref={scrollEnd}></div>
    //       </div>
    //     </div> 
    //   ) : (
    //     <div className={ `${messageClass} h-96 bg-white`}>
    //       <div className='py-2'></div>
    //       <div className="message-list bg-white flex flex-col items-start">
    //         {messages && messages.map((msg) => (
    //           <MessageItem key={msg.id} message={msg} />
    //         ))}
    //         {/* HTML element to scroll to */}
    //         <div ref={scrollEnd}></div>
    //       </div>
    //     </div>
    //   )}
    // </div>
    <div>
    {messages && messages.map((msg) => (
      <div key={msg.id} className={`${messageClass} h-[96px] bg-white`}>
        <div className='py-2'></div>
        <div className={`message-list bg-white flex flex-col items-${uid === msg.uid ? 'end' : 'start'}`}>
          <MessageItem message={msg} />
        </div>
        {/* HTML element to scroll to */}
        <div ref={scrollEnd}></div>
      </div>
    ))}
  </div>
  );
};

export default MessageList;