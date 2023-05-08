import React, { useState, ChangeEvent } from 'react';
import SearchIcon from '../assets/search.svg'

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
      <div className="navbar">

        <div className="flex-1 px-2 lg:flex-none">

          <div className="form-control">

            <div className="input-group">
              <span className="inset-y-0 left-0 flex items-center pl-2 bg-white">
                <SearchIcon />
              </span>
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

            </div>

          </div>
        </div>
        {/* filter dropdowns for availability */}
        <div className="flex justify-end flex-1 px-8 gap-8">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-outline italic text-[#9A9A9A] font-[400]">Weekly Availability</label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              <div className="form-control">
                {/* <label className="label cursor-pointer">
                  <span className="label-text">Select All</span>
                  <input type="checkbox" className="checkbox" />
                </label> */}
                {/* <div className="divider"></div> */}
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
          {/* filter dropdowns for language */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-outline italic text-[#9A9A9A] font-[400]">Language</label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              <div className="form-control">
                {/* <label className="label cursor-pointer">
                  <span className="label-text">Select All</span>
                  <input type="checkbox" className="checkbox" />
                </label> */}
                {/* <div className="divider"></div> */}
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
          {/* filter drop downs for gender */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-outline italic text-[#9A9A9A] font-[400]">Gender</label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              <div className="form-control">
                {/* <label className="label cursor-pointer">
                  <span className="label-text">Select All</span>
                  <input type="checkbox" className="checkbox" />
                </label> */}
                {/* <div className="divider"></div> */}
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
          {/* filter button */}
          <div className="filter-button">
            <label tabIndex={0} className="btn bg-[#DEDEDE] text-[#5F5F5F]">Filter</label>
          </div>
        </div>
      </div >
    </div >
  );
};

export default SearchBar;
