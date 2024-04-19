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
    const { psych_id, psych_name, patient_id, patient_name } = router.query;
    if (psych_name) {
      setPsychiatristId(psych_id as string);
      setPatientId(uid as string);
    } else if (patient_name) {
      setPatientId(patient_id as string);
      setPsychiatristId(uid as string);
    }
  }, [router.query]);

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