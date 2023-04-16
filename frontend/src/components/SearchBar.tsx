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
    <div>
      <div className="navbar bg-base-300 rounded-box">
        <div className="flex-1 px-2 lg:flex-none">
          <div className="form-control">
            <div className="input-group">
              <input type="text"
                placeholder="Search Name or Title"
                // only searches if the user presses 'enter'
                onKeyDown={event => {
                  if (event.key === 'Enter')
                    onSearch(searchTerm);
                } }
                value={searchTerm}
                // updates the search bar's text as the user types into it
                onChange={handleChange} className="input input-bordered" />
              <button className="btn btn-square">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-end flex-1 px-8 gap-8">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-outline">Weekly Availability</label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Sunday</span> 
                    <input type="checkbox" className="checkbox" />
                  </label>
                  <label className="label cursor-pointer">
                    <span className="label-text">Monday</span> 
                    <input type="checkbox" className="checkbox" />
                  </label>
                  <label className="label cursor-pointer">
                    <span className="label-text">Tuesday</span> 
                    <input type="checkbox" className="checkbox" />
                  </label>
                  <label className="label cursor-pointer">
                    <span className="label-text">Wednesday</span> 
                    <input type="checkbox" className="checkbox" />
                  </label>
                  <label className="label cursor-pointer">
                    <span className="label-text">Thursday</span> 
                    <input type="checkbox" className="checkbox" />
                  </label>
                  <label className="label cursor-pointer">
                    <span className="label-text">Friday</span> 
                    <input type="checkbox" className="checkbox" />
                  </label>
                  <label className="label cursor-pointer">
                    <span className="label-text">Saturday</span> 
                    <input type="checkbox" className="checkbox" />
                  </label>
                </div>
            </ul>
          </div>

          <div className="dropdown">
            <label tabIndex={0} className="btn btn-outline">Language</label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">English</span> 
                    <input type="checkbox" className="checkbox" />
                  </label>
                  <label className="label cursor-pointer">
                    <span className="label-text">Ga</span> 
                    <input type="checkbox" className="checkbox" />
                  </label>
                  <label className="label cursor-pointer">
                    <span className="label-text">Twi</span> 
                    <input type="checkbox" className="checkbox" />
                  </label>
                  <label className="label cursor-pointer">
                    <span className="label-text">Hausa</span> 
                    <input type="checkbox" className="checkbox" />
                  </label>
                </div>
            </ul>
          </div>

          <div className="dropdown">
            <label tabIndex={0} className="btn btn-outline">Gender</label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Male</span> 
                    <input type="checkbox" className="checkbox" />
                  </label>
                  <label className="label cursor-pointer">
                    <span className="label-text">Female</span> 
                    <input type="checkbox" className="checkbox" />
                  </label>
                </div>
            </ul>
          </div>
          <div className="filter-button">
              <label tabIndex={0} className="btn">Filter</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
