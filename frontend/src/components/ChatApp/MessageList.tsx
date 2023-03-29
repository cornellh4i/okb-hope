import React from 'react';
import MessageItem from './MessageItem';

import { db } from '../../../../backend/firebase/firebase'

const messages: any[] = [];


async function getMessages() {
  const chats = db.collection('Chats');
  const snapshot = await chats.get();
  if (snapshot.empty) {
    console.log('no matching docs');
    return;
  }
  snapshot.forEach(doc => {
    messages.push(doc);
  });
}

const MessageList: React.FC = () => {
  getMessages();
  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <MessageItem key={index} message={message} />
      ))}
    </div>
  );
};

export default MessageList;
