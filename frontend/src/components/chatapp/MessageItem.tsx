import okb_colors from "@/colors";
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
    // {${messageClass} == ""}
    <div className={`message-item ${messageClass} inline-flex gap-4 items-end m-2 mr-8`}>
      <div className='flex p-4 items-start gap-[10px] rounded-t-[15px] rounded-bl-[15px] border-[2px] bg-[#519AEB] border-[#519AEB]' style={{ maxWidth: '313px' }}>
        <p className={`text-[16px] text-[#FFFDFD]`}>{text}</p>
      </div>
      <img src={photoURL} className="w-[30px] h-[30px] rounded-full" />
      {/* <div>
        {serverTimestamp}
      </div> */}

      {/* <div className="message-item__author">{message.author}</div>
      <div className="message-item__content">{message.content}</div> */}
    </div>
  );
};

export default MessageItem;
