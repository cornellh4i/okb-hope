import React from 'react';

const ConversationItem: React.FC<{ conversation: any }> = ({ conversation }) => {
  return (
    <div className="conversation-item">
      <div className="conversation-item__title">{conversation.title}</div>
      <div className="conversation-item__last-message">{conversation.lastMessage}</div>
    </div>
  );
};

export default ConversationItem;
