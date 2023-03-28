import React, { useState, useMemo } from 'react';
import SearchBar from "./SearchBar";
import ConversationList from "./ConversationList";
import Fuse from 'fuse.js'; // install fuse.js

const psychiatrists = [
    // Your list of psychiatrists/counselors
  ];

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
      <ConversationList conversations={searchResults} />
    </div>
  );
};

export default Sidebar;
