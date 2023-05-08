import React from "react";
import { auth } from '../../../firebase/firebase'

const MessageItem: React.FC<{ message: any }> = ({ message }) => {
  // Extract necessary props
  const { text, uid, photoURL } = message;
  // Check to see if the message is a message the user sent or an incoming message.
  const messageClass = uid === auth.currentUser?.uid ? 'sent' : 'received';

  return (
    // Style Message Item based on whether the message is 'sent' or 'received'
    <div className={`message-item ${messageClass}`}>
      <img src={photoURL} />
      <p>{text}</p>
      {/* <div className="message-item__author">{message.author}</div>
      <div className="message-item__content">{message.content}</div> */}
    </div>
  );
};

export default MessageItem;
