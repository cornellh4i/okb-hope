import { DocumentData } from 'firebase/firestore';
import React from 'react';


const ConversationItem: React.FC<{ conversation: DocumentData }> = ({ conversation }) => {
  return (
    <div className="conversation-item">
      <span>Search is working</span>
      {/* <div className="conversation-item__title">{conversation.get("name")}</div> */}
      {/* <div className="conversation-item__last-message">{conversation.lastMessage}</div> */}
    </div>
  );
};

export default ConversationItem;
