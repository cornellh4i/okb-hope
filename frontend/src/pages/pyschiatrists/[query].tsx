// pages/psychiatrists/[query].tsx
import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import Fuse from 'fuse.js';
import SearchBar from '../../components/SearchBar';
import PsychiatristList from '../../components/PsychiatristList';

enum Gender {
  Male = 0,
  Female = 1
}

interface Psychiatrist {
  id: number;
  first_name: string;
  last_name: string;
  profile_pic: null;
  availability: string[];
  gender: Gender;
  location: string;
  language: string[];
  specialty: string[];
}

const psychiatrists: Psychiatrist[] = [
  {
    id: 0,
    first_name: "Bob",
    last_name: "Smith",
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
    specialty: ["PTSD"]
  },
  {
    id: 0,
    first_name: "Bob",
    last_name: "Smith",
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
    specialty: ["PTSD"]
  }
];

const fuseOptions = {
  keys: ['first_name', 'last_name', 'availability', 'location', 'language', 'specialty'], // Add any other relevant fields
  threshold: 0.3,
  findAllMatches: true,
  distance: 5,
  useExtendedSearch: true,
};

const PsychiatristsPage: React.FC = () => {
  const router = useRouter();
  const { query } = router.query;
  const [searchTerm, setSearchTerm] = useState<string>(query as string || '');
  const fuse = useMemo(() => new Fuse(psychiatrists, fuseOptions), []);

  const handleSearch = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    router.push(`/psychiatrists/${newSearchTerm}`, undefined, { shallow: true });
  };

  const searchResults = searchTerm
    ? fuse.search(searchTerm).map(({ item }) => item)
    : psychiatrists;

  async function generateStaticParams() {
    const psychiatrists = await fetch(searchResults).then((res) => res.json());

    return (<div>
      <SearchBar onSearch={handleSearch} />
      <PsychiatristList results={searchResults} />
    </div>);
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <PsychiatristList results={searchResults} />
    </div>
  );
};

export default PsychiatristsPage;
