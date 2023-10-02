import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import SearchBar from '../components/SearchBar';
import PsychiatristList from '../components/psychiatrists/PsychiatristList';
import json_results from '../temp_data/psychs.json';
import { IPsychiatrist } from '@/schema';
import colors from "@/colors";

const psychiatrists: IPsychiatrist[] = Object.values(json_results)

console.log(psychiatrists);

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

  // Stores newSearchTerm in searchTerm
  const handleSearch = (newSearchTerm: string) => {
    console.log(newSearchTerm);
    setSearchTerm(newSearchTerm);
  };

  // Search function to search for first names, last names, and/or titles
  const processSearch = () => {

    const terms = searchTerm.trim().split(/\s+/);

    // Handles searches with two terms
    if (terms.length === 3) {
      const [firstTerm, secondTerm, thirdTerm] = terms;
      const results = psychiatrists.filter((psychiatrist) =>
      ((psychiatrist.first_name.toLowerCase().includes(firstTerm.toLowerCase()) ||
        psychiatrist.last_name.toLowerCase().includes(firstTerm.toLowerCase()) ||
        psychiatrist.title.toLowerCase().includes(firstTerm.toLowerCase())) &&
        (psychiatrist.first_name.toLowerCase().includes(secondTerm.toLowerCase()) ||
          psychiatrist.last_name.toLowerCase().includes(secondTerm.toLowerCase()) ||
          psychiatrist.title.toLowerCase().includes(secondTerm.toLowerCase())) &&
        (psychiatrist.first_name.toLowerCase().includes(thirdTerm.toLowerCase()) ||
          psychiatrist.last_name.toLowerCase().includes(thirdTerm.toLowerCase()) ||
          psychiatrist.title.toLowerCase().includes(thirdTerm.toLowerCase())))
      );
      return results;
    }
    if (terms.length === 2) {
      // Handles searches with two terms
      const [firstTerm, secondTerm] = terms;
      const results = psychiatrists.filter((psychiatrist) =>
      ((psychiatrist.first_name.toLowerCase().includes(firstTerm.toLowerCase()) ||
        psychiatrist.last_name.toLowerCase().includes(firstTerm.toLowerCase()) ||
        psychiatrist.title.toLowerCase().includes(firstTerm.toLowerCase())) &&
        (psychiatrist.first_name.toLowerCase().includes(secondTerm.toLowerCase()) ||
          psychiatrist.last_name.toLowerCase().includes(secondTerm.toLowerCase()) ||
          psychiatrist.title.toLowerCase().includes(secondTerm.toLowerCase())))
      );
      return results;
    } else if (terms.length === 1) {
      // Handles searches with one term
      const term = terms[0];
      const results = psychiatrists.filter((psychiatrist) =>
        psychiatrist.first_name.toLowerCase().includes(term.toLowerCase()) ||
        psychiatrist.last_name.toLowerCase().includes(term.toLowerCase()) ||
        psychiatrist.title.toLowerCase().includes(term.toLowerCase()))
      return results;
    } else {
      // Return an empty array if there are more than three search terms
      return [];
    }
  };

  const searchResults = searchTerm ? processSearch() : psychiatrists;

  // const searchResults = searchTerm
  //   ? fuse.search(searchTerm).map(({ item }) => item)
  //   : psychiatrists;

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