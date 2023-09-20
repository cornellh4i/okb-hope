import { useState, ChangeEvent } from 'react';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };


  return (
    <div>
      <div className="navbar rounded-box">
        <div className="flex-1 px-2 lg:flex-none">
          <div className="form-control">
            <div className="input-group">
              <input type="text"
                placeholder="Search Name or Title"
                // only searches if the user presses 'enter'
                onKeyDown={event => {
                  if (event.key === 'Enter')
                    onSearch(searchTerm);
                }}
                value={searchTerm}
                // updates the search bar's text as the user types into it
                onChange={handleChange} className="input input-bordered" />
              <button className="btn btn-square">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
            </div>
          </div>
        </div>
        </div>
        </div>
  );
};
export default SearchBar;