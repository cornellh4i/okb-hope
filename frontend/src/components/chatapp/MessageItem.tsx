import React from "react";
import { auth } from '../../../firebase/firebase'

const MessageItem: React.FC<{ message: any }> = ({ message }) => {
  // Extract necessary props
  const { text, uid, photoURL } = message;
  // const { text, uid, photoURL, serverTimestamp } = message; see if there is a time stamp
  // Check to see if the message is a message the user sent or an incoming message.
  const messageClass = uid === auth.currentUser?.uid ? 'sent' : 'received';

  return (
    // Style Message Item based on whether the message is 'sent' or 'received'
    <div className={`message-item ${messageClass} flex items-center m-4`}>
      <img src={photoURL} className="w-[30px] h-[30px] rounded-full mr-4"/>
      <div className = 'border-[2px] rounded border-okb-blue p-4 w-1/2'>
        <p>{text}</p>
      </div>
      {/* <div>
        {serverTimestamp}
      </div> */}
      
      {/* <div className="message-item__author">{message.author}</div>
      <div className="message-item__content">{message.content}</div> */}
    </div>
  );
};

export default MessageItem;
