import { useState, useEffect, useRef } from 'react';
import MessageItem from './MessageItem';
import { db, auth } from '../../../firebase/firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { useRouter } from 'next/router';

const MessageList: React.FC = () => {
  const router = useRouter();
  const uid = auth.currentUser?.uid;
  const photoURL = auth.currentUser?.photoURL;
  const messagesRef = collection(db, "Chats");

  const [messages, setMessages] = useState<any[]>([]);
  const scrollEnd = useRef<HTMLDivElement | null>(null);
  const messageClass = uid === auth.currentUser?.uid ? 'sent' : 'received';

  const [psychiatristId, setPsychiatristId] = useState('');
  const [patientId, setPatientId] = useState('');

  useEffect(() => {
    const { psych_id } = router.query;
    if (psych_id) {
      setPsychiatristId(psych_id as string);
    }
  }, [router.query]);

  useEffect(() => {
    const { patient_id } = router.query;
    if (patient_id) {
      setPatientId(patient_id as string);
    }
  }, [router.query]);

  // useEffect(() => {
  //   if (uid && psychiatristId) {
  //     const queryDoc = query(
  //       messagesRef,
  //       where("uid", "==", uid),
  //       where("recipientId", "==", (uid === psychiatristId) ? patientId : psychiatristId),
  //       orderBy('createdAt')
  //     );

  //     const unsubscribe = onSnapshot(queryDoc, (querySnapshot) => {
  //       const messageData = querySnapshot.docs.map((doc) => ({
  //         ...doc.data(),
  //         id: doc.id,
  //       }));
  //       setMessages(messageData);
  //     }, (error) => { console.error("Error fetching data: ", error); });

  //     return () => {
  //       unsubscribe();
  //     };
  //   }
  // }, [uid, psychiatristId]);

  useEffect(() => {
    if (uid && psychiatristId && patientId) {
      const recipientIdQuery = (uid === psychiatristId) ? [patientId, psychiatristId] : [psychiatristId, patientId];

      const queryDoc = query(
        messagesRef,
        orderBy('createdAt'),
        where("uid", "in", recipientIdQuery),
        where("recipientId", "in", recipientIdQuery)
      );

      const unsubscribe = onSnapshot(queryDoc, (querySnapshot) => {
        const messageData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMessages(messageData);
      }, (error) => { console.error("Error fetching data: ", error); });

      return () => {
        unsubscribe();
      };
    }
  }, [uid, psychiatristId, patientId]);




  useEffect(() => {
    const inputElement = scrollEnd.current;

    if (inputElement) {
      inputElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div>
      {messages.map((msg) => (
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