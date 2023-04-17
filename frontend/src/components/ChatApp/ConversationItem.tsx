// import { DocumentData } from 'firebase/firestore';
import React from 'react';
import { db } from '../../../../backend/firebase/firebase'
import { collection, getDocs, query, orderBy, DocumentData } from "firebase/firestore"
import { useState, useEffect } from 'react';


const ConversationItem: React.FC<{ conversation: any }> = ({ conversation }) => {
  const { title } = conversation;
  console.log(conversation);
  return (
    <div className="conversation-item bg-white border-b-4 rounded-b-md px-2 py-2">
      {/* <span>{conversation.name}</span> */}
      {/* <span>Convo Item</span> */}
      {/* <div className="conversation-item__title "> */}
      <button className='font-semibold mb-1'>{conversation.name}</button>
      <p className='text-sm text-gray-600'>{conversation.last_message}</p>
      {/* </div> */}
      {/* <div className="conversation-item__last-message">{conversation.last_message}</div> */}
    </div>
  );
};

export default ConversationItem;
