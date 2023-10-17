import { serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { db, auth } from '../../../firebase/firebase'
import { collection, addDoc } from "firebase/firestore"

const MessageComposer: React.FC = () => {
  const messagesRef = collection(db, "conversations");
  const [message, setMessage] = useState("");

  /** [handleMessageChange] sets the message to what is typed into the text area. */
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  /** [sendMessage] sends message to Firestore */
  const sendMessage = async (e: any) => {
    e.preventDefault();

    const uid = auth.currentUser?.uid;
    const photoURL = auth.currentUser?.photoURL;
    const participants = [uid, uid]
    // TOOD: change second one to psychiatrist uid

    // Don't want to send a blank message
    if (message !== "") {
      try {
        const docRef = await addDoc(messagesRef, {
          text: message,
          createdAt: serverTimestamp(),
          participants,
          photoURL
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("error adding document: ", e);
      }

      // Clear text area after sending
      setMessage('');
    }

  };

  /** [handleKeyDown] sends a message when the Enter key is pressed. */
  const handleKeyDown = (e) => {
    // Send message if Enter key was pressed but not shift+Enter.
    if (e.key === "Enter" && e.shiftKey === false) {
      sendMessage(e);
    }
  };

  return (
    <div className="message-composer bg-white py-2 rounded-b-md border-solid border-2 border-gray-400">
      <div className="flex items-center rounded-2xl border-solid border-2 border-gray-400 pl-2 mx-4">
        {/* Input text area */}
        <textarea
          value={message}
          onChange={handleMessageChange}
          onKeyDown={handleKeyDown}
          placeholder="Send a Message"
          className="w-full h-full overflow-scroll"
        ></textarea>

        {/* Button to send a message */}
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
