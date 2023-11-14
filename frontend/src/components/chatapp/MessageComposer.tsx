import { serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { db, auth } from '../../../firebase/firebase'
import { collection, addDoc } from "firebase/firestore"
import okb_colors from "@/colors";

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

    // Don't want to send a blank message
    if (message !== "") {
      try {
        const docRef = await addDoc(messagesRef, {
          text: message,
          createdAt: serverTimestamp(),
          uid,
          photoURL,
          recipientId: uid // REPLACE recipientId value, depending on what chat is selected
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

  const maxRows = 2;

  return (
    <div className="message-composer bg-white py-2 rounded-b-md ">
      <div className={`flex py-2 pl-6 pr-2 items-center rounded-[46px] border border-solid border-[${okb_colors.dark_gray}] mx-4`}>
        {/* Input text area */}
        <textarea
          value={message}
          onChange={handleMessageChange}
          onKeyDown={handleKeyDown}
          placeholder="Send a Message"
          className={`w-full italic resize-none text-[12px] font-normal text-[${okb_colors.med_gray}]`}
        />

        {/* Button to send a message */}
        <button
          type="button"
          onClick={sendMessage}
          className="flex py-1 px-2 items-start bg-okb-blue rounded-[20px] text-[12px] text-white font-bold">Send</button>
      </div>
    </div>
  );
};

export default MessageComposer;
