import { serverTimestamp } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db, auth } from '../../../firebase/firebase';
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from 'next/router';

const MessageComposer: React.FC = () => {
  const router = useRouter();
  const messagesRef = collection(db, "conversations");
  const [message, setMessage] = useState("");
  const [psychiatristId, setPsychiatristId] = useState('');

  useEffect(() => {
    const { psych_id } = router.query;
    if (psych_id) {
      // Assuming psych_id is the psychiatrist's ID you want to message
      setPsychiatristId(psych_id as string);
      console.log(psych_id);
    }
  }, [router.query]);

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const sendMessage = async (e: any) => {
    e.preventDefault();

    const uid = auth.currentUser?.uid;
    const photoURL = auth.currentUser?.photoURL;
    const participants = [uid, psychiatristId]; // Now includes the psychiatrist's ID
    console.log(participants);

    if (message !== "" && psychiatristId) {
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
