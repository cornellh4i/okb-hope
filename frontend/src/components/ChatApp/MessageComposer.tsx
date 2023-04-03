import { serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { db, auth } from '../../../../backend/firebase/firebase'
import { collection, addDoc } from "firebase/firestore"

const MessageComposer: React.FC = () => {
  const messagesRef = collection(db, "Chats");
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

    try {
      const docRef = await addDoc(messagesRef, {
        text: message,
        createdAt: serverTimestamp(),
        uid,
        photoURL
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("error adding document: ", e);
    }

    // Clear text area after sending
    setMessage('');
  };

  /** [handleKeyDown] sends a message when the Enter key is pressed. */
  const handleKeyDown = (e) => {
    // Send message if Enter key was pressed but not shift+Enter.
    if (e.key === "Enter" && e.shiftKey === false) {
      sendMessage(e);
    }
  };

  return (
    <div className="message-composer">
      <textarea
        value={message}
        onChange={handleMessageChange}
        onKeyDown={handleKeyDown}
        placeholder="Type your message here"
      ></textarea>

      <button type="button" onClick={sendMessage}>Send</button>
    </div>
  );
};

export default MessageComposer;
