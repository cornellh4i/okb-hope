import React, { useState, useEffect } from "react";
import { db, auth } from '../../../firebase/firebase';
import { collection, addDoc, query, where, getDocs, serverTimestamp, doc, updateDoc } from "firebase/firestore";
import { useRouter } from 'next/router';

const MessageComposer: React.FC = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");
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

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const sendMessage = async (e: any) => {
    e.preventDefault();

    const uid = auth.currentUser?.uid;
    const photoURL = auth.currentUser?.photoURL;
    const participants = (uid === patientId)
      ? [patientId, psychiatristId]
      : [psychiatristId, patientId];// Now includes the psychiatrist's ID
    console.log(participants);
    const messagesRef = collection(db, "Chats");

    if (message !== "" && psychiatristId && patientId) {
      try {
        const docRef = await addDoc(messagesRef, {
          text: message,
          createdAt: serverTimestamp(),
          uid: participants[0],
          recipientId: participants[1],
          photoURL
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("error adding document: ", e);
      }
      // Attempt to find an existing conversation
      const conversationsRef = collection(db, "Conversations");
      const q = query(conversationsRef, where("patientId", "==", patientId), where("psychiatristId", "==", psychiatristId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // No existing conversation found, create a new one
        try {
          const docRef = await addDoc(conversationsRef, {
            deletedByPatient: false,
            deletedByPsych: false,
            patientId: patientId,
            psychiatristId: psychiatristId,
            messagesUnreadByPatient: uid === patientId ? 0 : 1,
            messagesUnreadByPsych: uid === patientId ? 1 : 0,
            recentMessage: {
              text: message,
              createdAt: serverTimestamp(),
              photoURL: auth.currentUser?.photoURL
            }
          });
          console.log("New conversation created with ID: ", docRef.id);
        } catch (error) {
          console.error("Error creating new conversation: ", error);
        }
      } else {
        // Existing conversation found, update the recent message
        const conversationDocRef = doc(db, "Conversations", querySnapshot.docs[0].id);
        try {
          const conversationData = querySnapshot.docs[0].data();
          const unreadByPatient = conversationData.messagesUnreadByPatient + (uid === patientId ? 0 : 1);
          const unreadByPsych = conversationData.messagesUnreadByPsych + (uid === patientId ? 1 : 0);

          await updateDoc(conversationDocRef, {
            recentMessage: {
              text: message,
              createdAt: serverTimestamp(),
              photoURL: auth.currentUser?.photoURL
            },
            messagesUnreadByPatient: unreadByPatient,
            messagesUnreadByPsych: unreadByPsych
          });
          console.log("Conversation updated with new message");
        } catch (error) {
          console.error("Error updating conversation: ", error);
        }
      }

      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      sendMessage(e);
    }
  };

  return (
    <div className="message-composer bg-white py-2 rounded-b-md border-solid border-2 border-gray-400">
      <div className="flex items-center rounded-2xl border-solid border-2 border-gray-400 pl-2 mx-4">
        <textarea
          value={message}
          onChange={handleMessageChange}
          onKeyDown={handleKeyDown}
          placeholder="Send a Message"
          className="w-full h-full overflow-scroll"
        ></textarea>

        <button
          type="button"
          onClick={sendMessage}
          className="bg-gray-400 rounded-full text-white italic font-bold px-2 mx-4 my-2"
        >Send</button>
      </div>
    </div>
  );
};

export default MessageComposer;
