import React, { useState, ChangeEvent } from 'react';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="card card-side bg-base-100 shadow-xl grid-cols-5">
      <div className="search-bar col-span-3 gap-4 ">
        <input
          type="text"
          placeholder="Search Name or Title"
          // only searches if the user presses 'enter'
          onKeyDown={event => { if (event.key === 'Enter') onSearch(searchTerm) }}
          value={searchTerm}
          // updates the search bar's text as the user types into it
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default SearchBar;
