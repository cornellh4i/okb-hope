import { useState, ChangeEvent } from 'react';
import chevron_down from '@/assets/chevron_down';

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
          {/* <p className='text-[#9A9A9A] italic text-xs font-normal'>Search Name or Title</p> */}
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
                onChange={handleChange} className="text-[#9A9A9A] italic text-xs font-normal outline-none" />
            </div>
          </div>
        </div>

        {/* filter dropdowns for availability */}
        <div className='dropdown flex w-52 h-9 py-2 px-4 justify-between shrink-0 border-solid border rounded-lg border-[#5F5F5F] bg-[#FFFDFD]'>
          <p className='text-[#9A9A9A] italic text-xs font-normal'>Weekly Availability</p>
          <button tabIndex={0} className=' flex flex-col items-start gap-2.5'>{chevron_down}</button>
          <ul tabIndex={0} className="dropdown-content menu flex flex-col w-52 p-2 shadow bg-base-100 rounded-lg  border-solid border border-[#5F5F5F] shadow-[0_4px_10px_0px_rgb(0,0,0,0.15)] absolute mt-8 left-0">
            <div className="form-control justify-center items-start">
              <label className="label cursor-pointer flex py-2 px-3 items-center gap-4 pb-3.5">
                <input type="checkbox" className="checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[#9A9A9A]" />
                <span className="label-text flex text-[#5F5F5F]">Select All</span>
              </label>
              <hr className='w-48 h-0.5 bg-[#5F5F5F] place-self-center'></hr>
              <label className="label cursor-pointer flex py-2 px-3 items-center gap-4 pt-3.5">
                <input type="checkbox" className="checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[#9A9A9A]" />
                <span className="label-text flex text-[#5F5F5F]">Monday</span>
              </label>
              <label className="label cursor-pointer flex py-2 px-3 items-center gap-4">
                <input type="checkbox" className="checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[#9A9A9A]" />
                <span className="label-text flex text-[#5F5F5F]">Tuesday</span>
              </label>
              <label className="label cursor-pointer flex py-2 px-3 items-center gap-4">
                <input type="checkbox" className="checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[#9A9A9A]" />
                <span className="label-text flex text-[#5F5F5F]">Wednesday</span>
              </label>
              <label className="label cursor-pointer flex py-2 px-3 items-center gap-4">
                <input type="checkbox" className="checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[#9A9A9A]" />
                <span className="label-text flex text-[#5F5F5F]">Thursday</span>
              </label>
              <label className="label cursor-pointer flex py-2 px-3 items-center gap-4">
                <input type="checkbox" className="checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[#9A9A9A]" />
                <span className="label-text flex text-[#5F5F5F]">Friday</span>
              </label>
              <label className="label cursor-pointer flex py-2 px-3 items-center gap-4">
                <input type="checkbox" className="checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[#9A9A9A]" />
                <span className="label-text flex text-[#5F5F5F]">Saturday</span>
              </label>
              <label className="label cursor-pointer flex py-2 px-3 items-center gap-4">
                <input type="checkbox" className="checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[#9A9A9A]" />
                <span className="label-text flex text-[#5F5F5F]">Sunday</span>
              </label>
            </div>
          </ul>
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
        <div className='dropdown flex w-52 h-9 py-2 px-4 justify-between shrink-0 border-solid border rounded-lg border-[#5F5F5F] bg-[#FFFDFD]'>
          <p className='text-[#9A9A9A] italic text-xs font-normal'>Language</p>
          <button tabIndex={0} className=' flex flex-col items-start gap-2.5'>{chevron_down}</button>
          <ul tabIndex={0} className="dropdown-content menu w-52 p-2 shadow bg-base-100 rounded-lg  border-solid border border-[#5F5F5F] shadow-[0_4px_10px_0px_rgb(0,0,0,0.15)] absolute mt-8 left-0">
            <div className="form-control flex flex-col justify-center items-start">
              <label className="label cursor-pointer flex py-2 px-3 items-center gap-4 pb-3.5">
                <input type="checkbox" className="checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[#9A9A9A]" />
                <span className="label-text flex text-[#5F5F5F]">Select All</span>
              </label>
              <hr className='w-48 h-0.5 bg-[#5F5F5F]'></hr>
              <label className="label cursor-pointer flex py-2 px-3 items-center gap-4 pt-3.5">
                <input type="checkbox" className="checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[#9A9A9A]" />
                <span className="label-text flex text-[#5F5F5F]">English</span>
              </label>
              <label className="label cursor-pointer flex py-2 px-3 items-center gap-4">
                <input type="checkbox" className="checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[#9A9A9A]" />
                <span className="label-text flex text-[#5F5F5F]">Ga</span>
              </label>
              <label className="label cursor-pointer flex py-2 px-3 items-center gap-4">
                <input type="checkbox" className="checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[#9A9A9A]" />
                <span className="label-text flex text-[#5F5F5F]">Twi</span>
              </label>
              <label className="label cursor-pointer flex py-2 px-3 items-center gap-4">
                <input type="checkbox" className="checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[#9A9A9A]" />
                <span className="label-text flex text-[#5F5F5F]">Hausa</span>
              </label>
            </div>
          </ul>
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
        <div className='dropdown flex w-52 h-9 py-2 px-4 justify-between shrink-0 border-solid border rounded-lg border-[#5F5F5F] bg-[#FFFDFD]'>
          <p className='text-[#9A9A9A] italic text-xs font-normal'>Gender</p>
          <button tabIndex={0} className='flex flex-col items-start gap-2.5'>{chevron_down}</button>
          <ul tabIndex={0} className="dropdown-content menu w-52 p-2 shadow bg-base-100 rounded  border-solid border border-[#5F5F5F] shadow-[0_4px_10px_0px_rgb(0,0,0,0.15)] absolute mt-8 left-0">
            <div className="form-control flex flex-col justify-center items-start">
              <label className="label cursor-pointer flex py-2 px-3 items-center gap-4 pb-3.5">
                <input type="checkbox" className="checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[#9A9A9A]" />
                <span className="label-text flex text-[#5F5F5F]">Select All</span>
              </label>
              <hr className='w-48 h-0.5 bg-[#5F5F5F]'></hr>
              <label className="label cursor-pointer flex py-2 px-3 items-center gap-4 pt-3.5">
                <input type="checkbox" className="checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[#9A9A9A]" />
                <span className="label-text flex text-[#5F5F5F]">Male</span>
              </label>
              <label className="label cursor-pointer flex py-2 px-3 items-center gap-4">
                <input type="checkbox" className="checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[#9A9A9A]" />
                <span className="label-text flex text-[#5F5F5F]">Female</span>
              </label>
            </div>
          </ul>
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
        <button className="filter-button flex w-32 h-9 py-2.5 px-11 justify-center items-center gap-2.5 border-solid border rounded-lg border-[#195BA5] bg-[#FFFDFD]">
          <div className='text-[#195BA5] text-xs font-bold'>Filter</div>

          {/* <label tabIndex={0} className="btn w-32 h-9 bg-[#FFFDFD] text-[#195BA5] border border-[#195BA5] font-bold">Filter</label> */}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;