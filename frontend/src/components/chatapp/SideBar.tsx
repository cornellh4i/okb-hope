import React, { useState, useMemo } from 'react';
import SearchBar from "./SearchBar";
import ConversationList from "./ConversationList";
import Fuse from 'fuse.js'; // install fuse.js
import { db } from '../../../firebase/firebase'
import { collection, getDocs } from "firebase/firestore";
import chevron_up from '@/assets/chevron_up';
import okb_colors from '@/colors';

const psychiatrists: any[] = [];

async function getMessages() {
  const chats = collection(db, 'Chats');
  const snapshot = await getDocs(chats);
  if (snapshot.empty) {
    console.log('no matching docs');
    return;
  }
  snapshot.forEach(doc => {
    psychiatrists.push(doc);
  });
}


const fuseOptions = {
  keys: ['name', 'specialty', 'location'],
  threshold: 0.3,
};

const Sidebar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const fuse = useMemo(() => new Fuse(psychiatrists, fuseOptions), []);

  const handleSearch = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  const searchResults = searchTerm
    ? fuse.search(searchTerm).map(({ item }) => item)
    : psychiatrists;

  return (
    <div className="flex flex-col sidebar border-r-2 border-gray-300 bg-white h-full overflow-y-auto">
      <SearchBar onSearch={handleSearch} />

      <div className="flex flex-col conversation-list bg-white">
        {/* Unread Messages */}
        <div className='flex flex-col unread-conversation-list'>
          <div className='inline-flex justify-between align-center bg-okb-blue rounded-full py-2 px-6 items-center text-white mx-5 mb-2'>
            <p className='text-[16px] font-semibold'>Unread Messages</p>
            <button>{chevron_up}</button>
          </div>
          <div className='overflow-scroll mb-5'>
            <ConversationList read={false} conversations={searchResults} />
          </div>
        </div>

        {/* All Messages */}
        <div className='flex flex-col all-conversation-list'>
          <div className='inline-flex justify-between align-center bg-okb-blue rounded-full py-2 px-6 items-center text-white mx-5 mb-2'>
            <p className='text-[16px] font-semibold'>All Messages</p>
            <button>{chevron_up}</button>
          </div>
          <div className='overflow-scroll'>
            <ConversationList read={true} conversations={searchResults} />
          </div>
        </div>
      </div>

    </div >
  );
};

export default Sidebar;
