import React, { useState } from 'react';
import magnifyglass from '../../assets/magnifyglass'

type SearchBarProps = {
  onSearch: (searchTerm: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      onSearch(searchTerm);
    }
  }

  return (
    <div className="search-bar bg-white py-2">
      <div className="flex items-center justify-between search-form rounded-xl border-solid border-2 border-gray-400 mx-4 py-1 px-4 text-lg font-semibold">
        <input
          className='w-full'
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKey}
        />
        <button onClick={() => onSearch(searchTerm)}>{magnifyglass}</button>
      </div>
    </div>
  );
};

export default SearchBar;
