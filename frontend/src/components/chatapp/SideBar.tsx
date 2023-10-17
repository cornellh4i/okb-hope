import React, { useState, useMemo } from 'react';
import SearchBar from "./SearchBar";
import ConversationList from "./ConversationList";
import Fuse from 'fuse.js'; // install fuse.js
import { db } from '../../../firebase/firebase'
import { collection, getDocs } from "firebase/firestore";
import chevron_up from '@/assets/chevron_up';

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
    <div className="sidebar border-r-4 border-gray-300 bg-white h-full">
      <SearchBar onSearch={handleSearch} />
      <div className="conversation-list bg-white">
      <div className='flex justify-between align-center bg-okb-blue rounded-full py-1 px-4 mx-2 my-2'>
          <p className='font-bold text-white'>All Messages</p>
          <button
          // onClick={ }
          >{chevron_up}</button>
        </div>
        <div className='overflow-scroll h-96'>
          <ConversationList conversations={searchResults} />
        </div>
      </div>
    </div >
  );
};

export default Sidebar;
