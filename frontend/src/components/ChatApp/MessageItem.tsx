import React from "react";

const MessageItem: React.FC<{ message: any }> = ({ message }) => {
  return (
    <div className="message-item">
      <div className="message-item__author">{message.author}</div>
      <div className="message-item__content">{message.content}</div>
    </div>
  );
};

export default MessageItem;
