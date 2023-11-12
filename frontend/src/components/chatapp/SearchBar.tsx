import search_icon from '@/assets/search_icon';
import okb_colors from '@/colors';
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
    <div className={`search-bar bg-[${okb_colors.white}]`}>
      <div className={`flex py-2 px-4 items-center gap-4 shrink-0 rounded-lg justify-between search-form border-solid border-[1px] border-[${okb_colors.dark_gray}] mx-4 my-5 text-lg font-semibold`}>
        <button onClick={() => onSearch(searchTerm)}>{search_icon}</button>
        <input
          className={`text-[${okb_colors.med_gray}] italic text-xs font-normal outline-none w-full`}
          type="text"
          placeholder="Search Messages"
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKey}
        />
      </div>
    </div>
  );
};

export default SearchBar;
