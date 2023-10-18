import React from 'react';
import MessageList from './MessageList';
import MessageComposer from './MessageComposer';
import ellipsis from '../../assets/ellipses'

interface NameAreaType {
  name: string;
  credentials: string;
}

/** This is the area with Doctor Name, Credentials, and Ellipses button */
const NameArea = ({ name, credentials }: NameAreaType) => {
  return (
    <div className='name-area flex justify-between w-full bg-white border-b-solid border-b-2 border-gray-400 rounded-b-md'>
      <div className='px-5 py-2'>
        <p className='font-bold text-xl tracking-wide'>{name}</p>
        <p className='italic text-sm text-gray-400'>{credentials}</p>
      </div>
      <button
        className='rounded-full hover:bg-gray-200'
      // onClick={TODO}
      >{ellipsis}</button>
    </div>
  );
}

/** The ChatArea displays the Name Area, the Message List, and the Message Composer. */
const ChatArea: React.FC = () => {
  return (
    <div className="chat-area">
      {/* Hard-coded the NameArea for now. This will depend on how we structure the data in Firebase. */}
      <NameArea name="Doctor Name" credentials='Credentials' />
      <div className='h-full overflow-scroll'><MessageList /></div>
      <MessageComposer />
    </div>
  );
};

export default ChatArea;
