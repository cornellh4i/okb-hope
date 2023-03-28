import React from 'react';
import MessageList from './MessageList';
import MessageComposer from './MessageComposer';

const ChatArea: React.FC = () => {
  return (
    <div className="chat-area">
      <MessageList />
      <MessageComposer />
    </div>
  );
};

export default ChatArea;
