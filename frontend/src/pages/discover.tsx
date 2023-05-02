import React, { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import SearchBar from '../components/SearchBar';
import PsychiatristList from '../components/PsychiatristList';
import json_results from '../psychs.json';

enum Gender {
  Male = 0,
  Female = 1
}

interface Psychiatrist {
  id: number;
  first_name: string;
  last_name: string;
  title: string;
  profile_pic: null;
  availability: string[];
  gender: Gender;
  location: string;
  language: string[];
  specialty: string[];
  description: string;
}

const psychiatrists: Psychiatrist[] = Object.values(json_results)

// options for fuzzy search. currently only searches by name and title
const fuseOptions = {
  keys: ['first_name', 'last_name', 'title'],
  threshold: 0.5,
  findAllMatches: true,
  distance: 5,
  ignoreLocation: true,
  useExtendedSearch: true,
};

const DiscoverPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const fuse = useMemo(() => new Fuse(psychiatrists, fuseOptions), []);
  const handleSearch = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };

  const searchResults = searchTerm
    ? fuse.search(searchTerm).map(({ item }) => item)
    : psychiatrists;

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <PsychiatristList results={searchResults} />
    </div>
  );
};

export default DiscoverPage;
