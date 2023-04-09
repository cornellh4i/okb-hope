// import { DocumentData } from 'firebase/firestore';
import React from 'react';
import { db } from '../../../../backend/firebase/firebase'
import { collection, getDocs, query, orderBy, DocumentData } from "firebase/firestore"
import { useState, useEffect } from 'react';


const ConversationItem: React.FC<{ conversation: any }> = ({ conversation }) => {
  const { title } = conversation;
  console.log(conversation);
  return (
    <div className="conversation-item">
      {/* <span>{conversation.name}</span> */}
      {/* <span>Convo Item</span> */}
      <div className="conversation-item__title">{conversation.name}</div>
      <div className="conversation-item__last-message">{conversation.last_message}</div>
    </div>
  );
};

export default ConversationItem;
