import React, { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import SearchBar from '../components/SearchBar';
import PsychiatristList from '../components/PsychiatristList';

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

const psychiatrists: Psychiatrist[] = [
  {
    id: 0,
    first_name: "Nicole",
    last_name: "Johnson",
    title: "Doctor",
    profile_pic: null,
    availability: [
      "Sunday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    gender: 0,
    location: "Wohiame Hospital",
    language: [
      "English",
      "Ga"
    ],
    specialty: ["PTSD"],
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },

  {
    id: 0,
    first_name: "Bob",
    last_name: "Smith",
    title: "Nurse",
    profile_pic: null,
    availability: [
      "Sunday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    gender: 0,
    location: "Wohiame Hospital",
    language: [
      "English",
      "Twi",
    ],
    specialty: ["PTSD"],
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }
];

const fuseOptions = {
  keys: ['first_name', 'last_name', 'title'],
  threshold: 0.4,
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
