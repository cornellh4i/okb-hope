import React from 'react';
import MessageList from './MessageList';
import MessageComposer from './MessageComposer';
import { ellipses } from '../../../assets';

/** This is the area with Doctor Name, Credentials, and Ellipses button */
const NameArea = ({ name, credentials }: { name: string, credentials: string }) => {
  return (
    <div className='name-area flex justify-between w-full bg-white border-b-solid border-b-2 border-gray-400'>
      <div className='px-5 py-2'>
        <p className='font-bold text-2xl'>{name}</p>
        <p className='italic text-sm text-gray-400'>{credentials}</p>
      </div>
      <button className='rounded-full hover:bg-gray-300 hover:text-white'>{ellipses}</button>
    </div>
  );
}

/** The ChatArea displays the Name Area, the Message List, and the Message Composer. */
const ChatArea: React.FC = () => {
  return (
    <div className="chat-area max-h-fit">
      <NameArea name="Doctor Name" credentials='Credentials' />
      <MessageList />
      <MessageComposer />
    </div>
  );
};

export default ChatArea;
