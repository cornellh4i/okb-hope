import search_icon from '@/assets/search_icon';
import okb_colors from '@/colors';
import React, { useState } from 'react';
import magnifyglass from '../../assets/magnifyglass'
import { db } from "../../../firebase/firebase";
import { collection, onSnapshot, query, where, getDocs, getFirestore } from "firebase/firestore";

// type SearchBarProps = {
//   onSearch: (searchTerm: string) => void;
// };

const SearchBar = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (searchInput.trim() !== '') {
        onSearch(searchInput); // Pass search input value to parent component
        console.log("SEARCHING")
      }
    }
  };

  return (
    <div className={`search-bar bg-[${okb_colors.white}]`}>
      <div className={`flex py-2 md:px-4 px-2 items-center md:gap-4 gap-2 shrink-0 rounded-lg justify-between search-form border-solid border-[1px] border-[${okb_colors.dark_gray}] md:mx-4 my-5 text-lg font-semibold`}>
        <button onClick={() => onSearch(searchInput)}>{search_icon}</button>
        <input
          className={`text-[${okb_colors.med_gray}] italic text-xs font-normal outline-none w-full`}
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
