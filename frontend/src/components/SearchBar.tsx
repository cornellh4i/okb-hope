// components/SearchBar.tsx
import React, { useState, ChangeEvent } from 'react';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div className="card card-side bg-base-100 shadow-xl grid-cols-5">
      <p className="col-span-1">Filter by</p>
      <div className="search-bar col-span-3 gap-4 ">
        <input
          type="text"
          placeholder="Search Name or Title"
          value={searchTerm}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default SearchBar;
