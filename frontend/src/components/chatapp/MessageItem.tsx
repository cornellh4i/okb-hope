import okb_colors from "@/colors";
import React from "react";
import { auth } from '../../../firebase/firebase'
import { create } from "domain";

const MessageItem: React.FC<{ message: any }> = ({ message }) => {
  // Extract necessary props
  const { text, uid, photoURL,createdAt } = message;
  const createdAtDate = createdAt?.toDate(); //TODO this is causing issues when sending messages
  const month = createdAtDate?.toLocaleString('default', { month: 'long' })
  const day = createdAtDate?.getDate()
  const hour = createdAtDate?.getHours()
  const minutes = (createdAtDate?.getMinutes() < 10 ? '0' : '') + createdAtDate?.getMinutes()
    console.log(`${month} ${day}, ${hour}:${minutes}`)
  // Check to see if the message is a message the user sent or an incoming message.
  const messageClass = uid === auth.currentUser?.uid ? 'sent' : 'received';

  return (
    // Style Message Item based on whether the message is 'sent' or 'received'
    <div>
      {messageClass === 'sent' ? (
        <div className={`message-item ${messageClass} flex-col `}>
          <div id="text_img" className="inline-flex items-end gap-4 m-2 mr-8">
            <div id="text" className="p-4  gap-[10px] rounded-t-[15px] rounded-bl-[15px] border-[2px] bg-[#519AEB] border-[#519AEB]" style={{ maxWidth: '313px' }}>
            <p className={`text-[16px] text-[#FFFDFD]`}>{text}</p>
            </div>
            <img src={photoURL} className="w-[30px] h-[30px] rounded-full" />
          </div>

          <div id="timestamp" className=" font-montserrat text-[12px] italic font-normal text-right ml-[-460px]" style={{ color: okb_colors.med_gray }}>
            <p className="pr-[78px]">{createdAtDate && `${month} ${day}, ${1900 + createdAtDate.getYear()}, ${hour}:${minutes}`}</p>
          </div>


        </div>

     ) : (
      <div className={`message-item ${messageClass} flex-col m-4`}>
        <div className="inline-flex items-end gap-4 mr-4">
       <img src={photoURL} className="w-[30px] h-[30px] rounded-full "/>
       <div id="text" className='p-4 gap-[10px] border-[2px] rounded-t-[15px] rounded-br-[15px] border-[#519AEB] '>
         <p>{text}</p>
        </div>
      </div>
      <div id="timestamp" className=" font-montserrat text-[12px] italic font-normal text-left ml-[46px]" style={{ color: okb_colors.med_gray }}>
            <p className="pr-[78px]">{createdAtDate && `${month} ${day}, ${1900 + createdAtDate.getYear()}, ${hour}:${minutes}`}</p>
      </div>
        
    </div>
    
    )}
    </div>
  );
};

export default MessageItem;
