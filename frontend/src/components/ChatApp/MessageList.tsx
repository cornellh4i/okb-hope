import React from 'react';
import MessageItem from './MessageItem';

const messages = [
  // Fetch messages data from Firestore
];

const MessageList: React.FC = () => {
  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <MessageItem key={index} message={message} />
      ))}
    </div>
  );
};

export default MessageList;
