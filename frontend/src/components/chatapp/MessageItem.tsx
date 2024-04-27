/* eslint-disable jsx-a11y/alt-text */
import okb_colors from "@/colors";
import React, { useEffect, useState } from "react";
import { auth, db } from '../../../firebase/firebase'
import colors from "@/colors";
import { collection, getDocs, query, where } from "firebase/firestore";

const MessageItem: React.FC<{ message: any }> = ({ message }) => {
  // Extract necessary props
  const { text, uid, photoURL, createdAt } = message;
  const createdAtDate = createdAt?.toDate(); //TODO this is causing issues when sending messages
  const month = createdAtDate?.toLocaleString('default', { month: 'long' })
  const day = createdAtDate?.getDate()
  const hour = createdAtDate?.getHours()
  const minutes = (createdAtDate?.getMinutes() < 10 ? '0' : '') + createdAtDate?.getMinutes()
  // console.log(`${month} ${day}, ${hour}:${minutes}`)
  // Check to see if the message is a message the user sent or an incoming message.
  const messageClass = uid === auth.currentUser?.uid ? 'sent' : 'received';
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const fetchName = async () => {
      try {
        const q = query(collection(db, 'users'), where('uid', '==', uid));
        const querySnapshot = await getDocs(q);
        setFirstName(querySnapshot.docs[0].data().name.split(' ')[0]);
      }
      catch (err) {
        if (err instanceof Error) {
          alert('An error occurred while fetching the name: ' + err.message);
        }
      }
    };
    fetchName();
  }, [uid])

  return (
    // Style Message Item based on whether the message is 'sent' or 'received'
    <div>
      {messageClass === 'sent' ? (
        <div className={`message-item ${messageClass} flex-col page-background`}>
          <div id="text_img" className="inline-flex items-end gap-4 m-2 mr-8">
            <div id="text" className="p-4  gap-[10px] rounded-t-[15px] rounded-bl-[15px] border-[2px] bg-[#519AEB] border-[#519AEB]" style={{ maxWidth: '313px' }}>
              <p className={`font-montserrat text-[16px] text-[#FFFDFD]`}>{text}</p>
            </div>
            {/* <img src={photoURL} className="w-[30px] h-[30px] rounded-full" /> */}
            <div style={{ backgroundColor: colors.okb_blue, objectFit: "cover" }} className={`w-[30px] h-[30px] rounded-full text-base font-normal text-white flex items-center justify-center`}>
              {firstName.charAt(0).toUpperCase()}
            </div>
          </div>

          <div id="timestamp" className="font-montserrat text-[12px] italic font-normal text-right ml-[-460px]" style={{ color: okb_colors.med_gray }}>
            <p className="pr-[78px] font-montserrat">{createdAtDate && `${month} ${day}, ${1900 + createdAtDate.getYear()}, ${hour}:${minutes}`}</p>
          </div>


        </div>

      ) : (
        <div className={`message-item ${messageClass} flex-col m-4 page-background`}>
          <div className="inline-flex items-end gap-4 mr-4">
            {/* <img src={photoURL} className="w-[30px] h-[30px] rounded-full " /> */}
            <div style={{ backgroundColor: colors.okb_blue, objectFit: "cover" }} className={`w-[30px] h-[30px] rounded-full text-base font-normal text-white flex items-center justify-center`}>
              {firstName.charAt(0).toUpperCase()}
            </div>
            <div id="text" className='p-4 gap-[10px] border-[2px] rounded-t-[15px] rounded-br-[15px] border-[#519AEB] '>
              <p className="font-montserrat">{text}</p>
            </div>
          </div>
          <div id="timestamp" className=" font-montserrat text-[12px] italic font-normal text-left ml-[46px]" style={{ color: okb_colors.med_gray }}>
            <p className="pr-[78px] font-montserrat">{createdAtDate && `${month} ${day}, ${1900 + createdAtDate.getYear()}, ${hour}:${minutes}`}</p>
          </div>

        </div>

      )}
    </div>
  );
};

export default MessageItem;
