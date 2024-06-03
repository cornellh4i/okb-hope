import React, { useState } from 'react';
import search_icon from '@/assets/search_icon';
import okb_colors from '@/colors';

type SearchBarProps = {
  onSearch: (searchTerm: string) => void; // Function prop to handle search
};

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchInput, setSearchInput] = useState('');

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
        onSearch(searchInput.trim()); // Pass search input value to parent component
        console.log(searchInput)
    }
  };

  return (
    <div className={`search-bar`}>
      <div className={`flex py-2 md:px-4 px-2 items-center md:gap-4 gap-2 shrink-0 rounded-lg justify-between search-form border-solid border-[1px] border-[${okb_colors.dark_gray}] md:mx-4 my-5 text-lg font-semibold`}>
        <button onClick={() => onSearch(searchInput)}> {search_icon}</button> {/* This line seems redundant. If you need it for something specific, you can leave it. */}
        <input
          className={`text-[${okb_colors.med_gray}] page-background italic text-xs font-montserrat font-normal outline-none w-full`}
          type="text"
          placeholder="Search Messages"
          value={searchInput}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />
      </div>
    </div>
  );
};

export default SearchBar;
