import React from 'react';
import SideBar from './SideBar';
import ChatArea from './ChatArea';

const ChatApp: React.FC = () => {
  return (
    <div className="chat-app flex py-10 px-10 bg-red-400 max-h-96">
      <SideBar />
      <ChatArea />
    </div>
  );
};

export default ChatApp;
