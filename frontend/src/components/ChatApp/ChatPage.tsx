import React from 'react';
import SideBar from './SideBar';
import ChatArea from './ChatArea';

const ChatApp: React.FC = () => {
  return (
    <div className="chat-app flex">
      <SideBar />
      <ChatArea />
    </div>
  );
};

export default ChatApp;
