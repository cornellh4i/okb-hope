import React, { useState, useMemo } from 'react';
import SearchBar from "./SearchBar";
import ConversationList from "./ConversationList";
import Fuse from 'fuse.js'; // install fuse.js
import { db } from '../../../../backend/firebase/firebase';
import { collection } from "firebase/firestore";

const psychiatrists: any[] = [];

async function getMessages() {
  const chats = db.collection('Chats');
  const snapshot = await chats.get();
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
    <div className="sidebar">

      <SearchBar onSearch={handleSearch} />
      <hr />
      <div className="conversation-list bg-gray-300"><b>All Messages</b></div>
      <ConversationList conversations={searchResults} />
    </div>
  );
};

export default Sidebar;
