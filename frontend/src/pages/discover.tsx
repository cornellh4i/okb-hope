import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import SearchBar from '../components/SearchBar';
import PsychiatristList from '../components/psychiatrists/PsychiatristList';
import json_results from '../temp_data/psychs.json';
import { IPsychiatrist } from '@/schema';
import okb_colors from '@/colors';

const psychiatrists: IPsychiatrist[] = Object.values(json_results)

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
    <div className={'px-24 pt-9 pb-14'}>
      <div className='pb-8'>
        <SearchBar onSearch={handleSearch} /></div>
      {searchResults.length > 0 ? (
        <PsychiatristList results={searchResults} />
      ) : (
        <div className="text-center my-10">
          <p className="mb-4">No Psychiatrists found based on your filters.</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setSearchTerm("")}
          >
            See all psychiatrists
          </button>
        </div>
      )}
    </div>
  );
};

export default DiscoverPage;