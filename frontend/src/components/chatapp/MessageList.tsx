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

  const [psychName, setPsychName] = useState('');
  const [patientName, setPatientName] = useState('');


  useEffect(() => {
    const { psych_id, psych_name, patient_id, patient_name } = router.query;
    if (psych_name) {
      setPsychiatristId(psych_id as string);
      setPatientId(uid as string);
      setPsychName(psych_name as string)
    } else if (patient_name) {
      setPatientId(patient_id as string);
      setPsychiatristId(uid as string);
      setPatientName(patient_name as string)
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
          role: doc.data().uid === uid ? 'patient' : 'psychiatrist' // Determine role based on UID
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


  // Filter messages based on deletion status and role
  const filteredMessages = messages.filter(msg => {
    // Check if the current user is the recipient and the message is deleted by the recipient
    if (uid === patientId && msg.deletedByPatient) {
      return false; // Exclude the message
    }
    // Check if the current user is the recipient and the message is deleted by the recipient
    if (uid === psychiatristId && msg.deletedByPsych) {
      return false; // Exclude the message
    }
    // For other cases or if the message is not deleted by the recipient, include the message
    return true;
  });

  if (filteredMessages.length === 0) {
    const conversationPartnerName = uid === psychiatristId ? patientName : psychName;
    return (
      <div className="page-background text-center text-gray-400 pt-4 font-montserrat italic">
        Start a conversation with {conversationPartnerName}
      </div>
    );
  } else {
    return (
      <div>
        {filteredMessages.map((msg) => (
          <div key={msg.id} className={`page-background`}>
            {/* <div className='py-2'></div> */}
            <div className={`message-list page-background flex flex-col items-${uid === msg.uid ? 'end' : 'start'}`}>
              <MessageItem message={msg} />
            </div>
            {/* HTML element to scroll to */}
            <div ref={scrollEnd}></div>
          </div>
        ))}
      </div>
    );
  }
};

export default MessageList;