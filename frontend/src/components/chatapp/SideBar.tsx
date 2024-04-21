import React, { useState, useEffect, useMemo } from 'react';
import SearchBar from "./SearchBar";
import ConversationList from "./ConversationList";
import Fuse from 'fuse.js';
import { db } from '../../../firebase/firebase';
import { collection, getDocs } from "firebase/firestore";
import chevron_up from '@/assets/chevron_up';
import chevron_down from '@/assets/chevron_down';
import okb_colors from '@/colors';

const psychiatrists: any[] = [];

const fuseOptions = {
  keys: ['name', 'specialty', 'location'],
  threshold: 0.3,
};

const Sidebar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const fuse = useMemo(() => new Fuse(psychiatrists, fuseOptions), []);
  const [showAllMessages, setShowAllMessages] = useState<boolean>(true);
  const [showUnreadMessages, setShowUnreadMessages] = useState<boolean>(true);
  const [selectedConversationId, setSelectedConversationId] = useState<string>(''); // Lifted state

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversationId(conversationId); // Update selectedConversationId
  };

  const toggleAllMessagesVisibility = () => {
    setShowAllMessages(!showAllMessages);
  };

  const toggleUnreadMessagesVisibility = () => {
    setShowUnreadMessages(!showUnreadMessages);
  };

  const handleSearch = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };


  const searchResults = searchTerm
    ? fuse.search(searchTerm).map(({ item }) => item)
    : psychiatrists;

  return (
    <div className="flex flex-col sidebar border-r-2 border-gray-300 page-background h-full overflow-y-auto">
       <div>
      <div className="px-2"> {/* Added width classes here */}
        <SearchBar onSearch={handleSearch} />
      </div>
    </div>

      <div className="flex flex-col conversation-list">
        {/* Unread Messages */}
        <div className='flex flex-col unread-conversation-list'>
          <div className='inline-flex justify-between align-center bg-okb-blue md:rounded-full py-2 md:px-6 px-2 items-center text-white md:mx-5 mb-2'>
            <p className='text-[16px] font-semibold'>Unread Messages</p>
            <button onClick={toggleUnreadMessagesVisibility}>{showUnreadMessages ? chevron_up : chevron_down}</button>
          </div>
          <div className='overflow-scroll'>
            {showUnreadMessages && <ConversationList read={false} searchInput={searchTerm} selectedConversationId={selectedConversationId} onSelectConversation={handleSelectConversation} conversations={[]} />}
          </div>
        </div>

        {/* All Messages */}
        <div className='flex flex-col all-conversation-list'>
          <div className='inline-flex justify-between align-center bg-okb-blue md:rounded-full py-2 md:px-6 px-2 items-center text-white md:mx-5 mb-2'>
            <p className='text-[16px] font-semibold'>All Messages</p>
            <button onClick={toggleAllMessagesVisibility}>{showAllMessages ? chevron_up : chevron_down}</button>
          </div>
          <div className='overflow-scroll'>
            {showAllMessages && <ConversationList read={true} searchInput={searchTerm} selectedConversationId={selectedConversationId} onSelectConversation={handleSelectConversation} conversations={[]} />}
          </div>
        </div>
      </div>

    </div >
  );
};

export default Sidebar;

