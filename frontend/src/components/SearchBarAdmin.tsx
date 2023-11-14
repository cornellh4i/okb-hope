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
    <div className="w-[450px] h-12 px-6 py-3 bg-white rounded-lg border border-zinc-600 justify-between items-center inline-flex">
      <div className="mr-5">
        {search_icon}
      </div>
      <div className="form-control w-full">
        <div className="input-group w-full">
          <input type="text"
            placeholder={"Search Name or Title"}
            onKeyDown={event => {
              if (event.key === 'Enter')
                onSearch(searchTerm);
            }}
            value={searchTerm}
            onChange={handleChange} className={`text-[#9A9A9A] italic font-normal outline-none w-full`} />
        </div>
      </div>
    </div>
  );
};
export default SearchBar;