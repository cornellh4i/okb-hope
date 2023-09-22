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
      <div className="flex w-full h-9 justify-center items-start gap-x-4 shrink-0">

        {/* search bar */}
        <div className='flex w-96 h-9 py-2 px-4 items-center gap-4 shrink-0 border-solid border rounded-lg border-[#5F5F5F] bg-[#FFFDFD]'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="#9A9A9A"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <p className='text-[#9A9A9A] italic text-xs font-normal'>Search Name or Title</p>
        </div>
        {/* <div className="flex flex-1 lg:flex-none border-[#5F5F5F] text-[#9A9A9A]">
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
              <button className="btn btn-square h-9">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
            </div>
          </div>
        </div> */}

        {/* filter dropdowns for availability */}
        <div className='flex w-52 h-9 py-2 px-4 justify-between items-center shrink-0 border-solid border rounded-lg border-[#5F5F5F] bg-[#FFFDFD]'>
          <p className='text-[#9A9A9A] italic text-xs font-normal'>Weekly Availability</p>
        </div>
        {/* <div className="dropdown">
          <label tabIndex={0} className="btn btn-outline w-52 h-9 bg-[#FFFDFD] border-[#5F5F5F] text-[#9A9A9A] italic font-normal">Weekly Availability</label>
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
        </div> */}

        {/* filter dropdowns for language */}
        <div className='flex w-52 h-9 py-2 px-4 justify-between items-center shrink-0 border-solid border rounded-lg border-[#5F5F5F] bg-[#FFFDFD]'>
          <p className='text-[#9A9A9A] italic text-xs font-normal'>Language</p>
        </div>
        {/* <div className="dropdown">
          <label tabIndex={0} className="btn btn-outline w-52 h-9 bg-[#FFFDFD] border-[#5F5F5F] text-[#9A9A9A] italic font-normal">Language</label>
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
        </div> */}

        {/* filter drop downs for gender */}
        <div className='flex w-52 h-9 py-2 px-4 justify-between items-center shrink-0 border-solid border rounded-lg border-[#5F5F5F] bg-[#FFFDFD]'>
          <p className='text-[#9A9A9A] italic text-xs font-normal'>Gender</p>
        </div>
        {/* <div className="dropdown">
          <label tabIndex={0} className="btn btn-outline w-52 h-9 bg-[#FFFDFD] border-[#5F5F5F] text-[#9A9A9A] italic font-normal">Gender</label>
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
        </div> */}

        {/* filter button */}
        <div className="filter-button flex w-32 h-9 py-2.5 px-11 justify-center items-center gap-2.5 border-solid border rounded-lg border-[#195BA5] bg-[#FFFDFD]">
          <p className='text-[#195BA5] text-xs font-bold'>Filter</p>
          {/* <label tabIndex={0} className="btn w-32 h-9 bg-[#FFFDFD] text-[#195BA5] border border-[#195BA5] font-bold">Filter</label> */}
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default SearchBar;