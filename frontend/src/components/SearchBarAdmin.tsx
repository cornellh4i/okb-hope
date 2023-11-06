import { useState, ChangeEvent } from 'react';
import search_icon from '@/assets/search_icon';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };


  return (
    <div className="w-[420px] h-9 px-4 py-2 bg-white rounded-lg border border-zinc-600 justify-start items-center gap-4 inline-flex">
      {search_icon}
          <div className="form-control w-full">
            <div className="input-group w-full">
              <input type="text"
                placeholder={"Search Name or Title"}
                onKeyDown={event => {
                  if (event.key === 'Enter')
                    onSearch(searchTerm);
                }}
                value={searchTerm}
                // updates the search bar's text as the user types into it
                onChange={handleChange} className={`text-[#9A9A9A] italic text-xs font-normal outline-none w-full`} />
            </div>
          </div>
    </div>  
  );
};
export default SearchBar;