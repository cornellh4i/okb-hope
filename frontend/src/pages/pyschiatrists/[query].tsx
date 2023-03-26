// pages/psychiatrists/[query].tsx
import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import Fuse from 'fuse.js';
import SearchBar from '../../components/SearchBar';
import PsychiatristList from '../../components/PsychiatristList';

interface Psychiatrist {
  id: number;
  // Add other relevant properties for a psychiatrist
}

const psychiatrists: Psychiatrist[] = [
  // Your list of psychiatrists/counselors
];

const fuseOptions = {
  keys: ['name', 'specialty', 'location'], // Add any other relevant fields
  threshold: 0.3,
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

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <PsychiatristList results={searchResults} />
    </div>
  );
};

export default PsychiatristsPage;
