import { useState, ChangeEvent, use, useEffect, useRef } from 'react';
import chevron_down from '@/assets/chevron_down';
import search_icon from '@/assets/search_icon';
import okb_colors from '../colors';

export default function SearchBar({ onSearch, filters, setFilters, monday, setMonday, tuesday, setTuesday, wednesday,
  setWednesday, thursday, setThursday, friday, setFriday, saturday, setSaturday, sunday, setSunday, allDays, setAllDays,
  english, setEnglish, ga, setGa, twi, setTwi, hausa, setHausa, allLanguages, setAllLanguages,
  male, setMale, female, setFemale, bothGenders, setBothGenders, submittedFilters, setSubmittedFilters }: any) {

  const FilterEnum = {
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
    allDays: "allDays",
    english: "English",
    ga: "Ga",
    twi: "Twi",
    hausa: "Hausa",
    allLanguages: "allLanguages",
    male: "male",
    female: "female",
    bothGenders: "bothGenders"
  }
  let days = [FilterEnum.monday, FilterEnum.tuesday, FilterEnum.wednesday, FilterEnum.thursday, FilterEnum.friday, FilterEnum.saturday, FilterEnum.sunday];
  let languages = [FilterEnum.english, FilterEnum.ga, FilterEnum.twi, FilterEnum.hausa]
  let genders = [FilterEnum.male, FilterEnum.female]

  let selected: any = [...filters]
  const [searchTerm, setSearchTerm] = useState('');

  const [showDayDropdown, setShowDayDropdown] = useState(false);
  const dayDropdownRef = useRef<HTMLButtonElement | null>(null);
  const dayDropdownMenuRef = useRef<HTMLDivElement | null>(null);

  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const languageDropdownRef = useRef<HTMLButtonElement | null>(null);
  const languageDropdownMenuRef = useRef<HTMLDivElement | null>(null);

  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const genderDropdownRef = useRef<HTMLButtonElement | null>(null);
  const genderDropdownMenuRef = useRef<HTMLDivElement | null>(null);

  // Opens or closes the dropdown for weekly availability and makes sure the other dropdowns are closed
  const handleDayDropdownClick = (e) => {
    // Prevent the event from propagating to the window click listener
    e.stopPropagation();
    setShowDayDropdown(!showDayDropdown);
    setShowLanguageDropdown(false);
    setShowGenderDropdown(false);
  };

  // Opens or closes the dropdown for language and makes sure the other dropdowns are closed
  const handleLanguageDropdownClick = (e) => {
    // Prevent the event from propagating to the window click listener
    e.stopPropagation();
    setShowLanguageDropdown(!showLanguageDropdown);
    setShowDayDropdown(false);
    setShowGenderDropdown(false);
  };

  // Opens or closes the dropdown for gender and makes sure the other dropdowns are closed
  const handleGenderDropdownClick = (e) => {
    // Prevent the event from propagating to the window click listener
    e.stopPropagation();
    setShowGenderDropdown(!showGenderDropdown);
    setShowDayDropdown(false);
    setShowLanguageDropdown(false);
  };

  // Close dropdown if there is a click anywhere outside of the dropdown refs
  useEffect(() => {
    const clickListener = (e) => {
      const isDayDropdownClick =
        (dayDropdownRef.current && dayDropdownRef.current.contains(e.target)) ||
        (dayDropdownMenuRef.current && dayDropdownMenuRef.current.contains(e.target));
      const isLanguageDropdownClick =
        (languageDropdownRef.current && languageDropdownRef.current.contains(e.target)) ||
        (languageDropdownMenuRef.current && languageDropdownMenuRef.current.contains(e.target));
      const isGenderDropdownClick =
        (genderDropdownRef.current && genderDropdownRef.current.contains(e.target)) ||
        (genderDropdownMenuRef.current && genderDropdownMenuRef.current.contains(e.target));

      if (!isDayDropdownClick) {
        setShowDayDropdown(false);
      }
      if (!isLanguageDropdownClick) {
        setShowLanguageDropdown(false);
      }
      if (!isGenderDropdownClick) {
        setShowGenderDropdown(false);
      }
    };

    window.addEventListener('click', clickListener);

    return () => {
      window.removeEventListener('click', clickListener);
    };
  }, [showDayDropdown, showLanguageDropdown, showGenderDropdown]);

  // Updates searchTerm if the value in the search bar changes
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);
  };

  // Searches when the enter key is pressed
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch(searchTerm);
    }
  };

  // Returns the index of the filter in the selected array
  function selectedIndex(filter: string) {
    for (let i = 0; i < selected.length; i++) {
      if (selected[i].filter === filter) {
        return i
      }
    }
    return -1
  }

  // Updates selected array and updates sets filters according to whether they are selected/unselected
  function updateSelected(filter: string, checked: boolean) {

    // Function that handles updating selected array for the case when one of the select all checkboxes are selected/unselected
    function handleSelectAll(arr) {
      for (let i = 0; i < arr.length; i++) {
        let index = 0
        index = selectedIndex(arr[i])
        if (checked === false && index >= 0) {
          selected.splice(index, 1)
        } else if (checked === true && index < 0) {
          selected.push({ "filter": filter, "checked": checked })
        }
      }
    }

    if (filter === FilterEnum.allDays) {
      handleSelectAll(days)
    } else if (filter === FilterEnum.allLanguages) {
      handleSelectAll(languages)
    } else if (filter === FilterEnum.bothGenders) {
      handleSelectAll(genders)
    } else {
      let index = 0
      index = selectedIndex(filter)
      if (index >= 0 && !checked) {
        selected.splice(index, 1)
      }
      else if (index < 0 && checked) {
        selected.push({ "filter": filter, "checked": checked })
      }
    }
    setFilters(selected)
  }

  // Updates the selected filter's state and selected array when the selected filter is checked/unchecked
  function handleFilterChange(filterName: string, filterState: boolean, setFunction: Function,
    event: {
      target: {
        checked: boolean
      }
    }) {

    if (filterName === FilterEnum.allDays) {
      setAllDays(event.target.checked)
      setMonday(event.target.checked)
      setTuesday(event.target.checked)
      setWednesday(event.target.checked)
      setThursday(event.target.checked)
      setFriday(event.target.checked)
      setSaturday(event.target.checked)
      setSunday(event.target.checked)
      updateSelected(FilterEnum.monday, event.target.checked)
      updateSelected(FilterEnum.tuesday, event.target.checked)
      updateSelected(FilterEnum.wednesday, event.target.checked)
      updateSelected(FilterEnum.thursday, event.target.checked)
      updateSelected(FilterEnum.friday, event.target.checked)
      updateSelected(FilterEnum.saturday, event.target.checked)
      updateSelected(FilterEnum.sunday, event.target.checked)
    }
    else if (filterName === FilterEnum.allLanguages) {
      setAllLanguages(event.target.checked)
      setEnglish(event.target.checked)
      setGa(event.target.checked)
      setTwi(event.target.checked)
      setHausa(event.target.checked)
      updateSelected(FilterEnum.english, event.target.checked)
      updateSelected(FilterEnum.ga, event.target.checked)
      updateSelected(FilterEnum.twi, event.target.checked)
      updateSelected(FilterEnum.hausa, event.target.checked)
    } else if (filterName === FilterEnum.bothGenders) {
      setBothGenders(event.target.checked)
      setMale(event.target.checked)
      setFemale(event.target.checked)
      updateSelected(FilterEnum.male, event.target.checked)
      updateSelected(FilterEnum.female, event.target.checked)
    } else {
      if (filterName === FilterEnum.monday || filterName === FilterEnum.tuesday || filterName === FilterEnum.wednesday
        || filterName === FilterEnum.thursday || filterName === FilterEnum.friday || filterName === FilterEnum.saturday
        || filterName === FilterEnum.sunday) {
        if (event.target.checked === false) {
          setAllDays(false)
        }
      } else if (filterName === FilterEnum.english || filterName === FilterEnum.ga || filterName === FilterEnum.twi
        || filterName === FilterEnum.hausa) {
        if (event.target.checked === false) {
          setAllLanguages(false)
        }
      } else {
        if (event.target.checked === false) {
          setBothGenders(false)
        }
      }
      setFunction(event.target.checked)
      updateSelected(filterName, event.target.checked)
    }
  }

  // Parses the selected filters array into a dictionary that maps filter categories to an array of filters they encompass
  const handleFilter = () => {
    const filtersCategorized: { days: string[], languages: string[], genders: number[] } = { days: [], languages: [], genders: [] }
    for (let i = 0; i < filters.length; i++) {
      let filter = filters[i].filter
      if (days.includes(filter)) {
        filtersCategorized['days'].push(filter)
      } else if (languages.includes(filter)) {
        filtersCategorized['languages'].push(filter)
      } else {
        if (filter === FilterEnum.male) {
          filtersCategorized['genders'].push(0)
        } else {
          filtersCategorized['genders'].push(1)
        }
      }
    }
    setSubmittedFilters(filtersCategorized)
  }

  return (
    <div>
      <div className="flex w-full h-9 justify-center items-start gap-x-4 shrink-0">

        {/* search bar */}
        <div className={`flex w-96 h-9 py-2 px-4 items-center gap-4 shrink-0 border-solid border rounded-lg border-[#5F5F5F] bg-[${okb_colors.white}]`}>
          {search_icon}
          <div className="form-control w-full">
            <div className="input-group w-full">
              <input type="text"
                placeholder={"Search Name or Title"}
                onKeyDown={handleKeyDown}
                value={searchTerm}
                // updates the search bar's text as the user types into it
                onChange={handleSearchChange} className={`text-[#9A9A9A] italic text-xs font-normal outline-none w-full`} />
            </div>
          </div>
        </div>

        {/* filter dropdowns for availability */}
        <div className={`dropdown flex w-52 h-9 py-2 px-4 justify-between shrink-0 border-solid border rounded-lg border-[${okb_colors.dark_gray}] bg-[${okb_colors.white}]`}>
          <p className={`text-[${okb_colors.med_gray}] italic text-xs font-normal`}>Weekly Availability</p>
          <button tabIndex={0}
            ref={dayDropdownRef}
            onClick={handleDayDropdownClick}
            className=' flex flex-col items-start gap-2.5'>{chevron_down}</button>
          {showDayDropdown &&
            <ul tabIndex={0} className={`dropdown-content menu flex flex-col w-52 p-2 shadow bg-base-100 rounded-lg  border-solid border border-[${okb_colors.dark_gray}] shadow-[0_4px_10px_0px_rgb(0,0,0,0.15)] absolute mt-8 left-0`}>
              <div
                ref={dayDropdownMenuRef}
                className="form-control justify-center items-start">
                <label className="label cursor-pointer flex py-2 px-3 items-center gap-4 pb-3.5">
                  <input type="checkbox"
                    checked={allDays}
                    onChange={(e) => handleFilterChange(FilterEnum.allDays, allDays, setAllDays, e)}
                    className={`checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[#9A9A9A]`} />
                  <span className={`label-text flex text-[${okb_colors.dark_gray}]`}>Select All</span>
                </label>
                <hr className={`w-48 h-0.5 bg-[#5F5F5F] place-self-center`}></hr>
                <label className="label cursor-pointer flex py-2 px-3 items-center gap-4 pt-3.5">
                  <input type="checkbox"
                    checked={monday}
                    onChange={(e) => handleFilterChange(FilterEnum.monday, monday, setMonday, e)}
                    className={`checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[${okb_colors.med_gray}]`} />
                  <span className={`label-text flex text-[${okb_colors.dark_gray}]`}>Monday</span>
                </label>
                <label className="label cursor-pointer flex py-2 px-3 items-center gap-4">
                  <input type="checkbox"
                    checked={tuesday}
                    onChange={(e) => handleFilterChange(FilterEnum.tuesday, tuesday, setTuesday, e)}
                    className={`checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[${okb_colors.med_gray}]`} />
                  <span className={`label-text flex text-[${okb_colors.dark_gray}]`}>Tuesday</span>
                </label>
                <label className="label cursor-pointer flex py-2 px-3 items-center gap-4">
                  <input type="checkbox"
                    checked={wednesday}
                    onChange={(e) => handleFilterChange(FilterEnum.wednesday, wednesday, setWednesday, e)}
                    className={`checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[${okb_colors.med_gray}]`} />
                  <span className={`label-text flex text-[${okb_colors.dark_gray}]`}>Wednesday</span>
                </label>
                <label className="label cursor-pointer flex py-2 px-3 items-center gap-4">
                  <input type="checkbox"
                    checked={thursday}
                    onChange={(e) => handleFilterChange(FilterEnum.thursday, thursday, setThursday, e)}
                    className={`checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[${okb_colors.med_gray}]`} />
                  <span className={`label-text flex text-[${okb_colors.dark_gray}]`}>Thursday</span>
                </label>
                <label className="label cursor-pointer flex py-2 px-3 items-center gap-4">
                  <input type="checkbox"
                    checked={friday}
                    onChange={(e) => handleFilterChange(FilterEnum.friday, friday, setFriday, e)}
                    className={`checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[${okb_colors.med_gray}]`} />
                  <span className={`label-text flex text-[${okb_colors.dark_gray}]`}>Friday</span>
                </label>
                <label className="label cursor-pointer flex py-2 px-3 items-center gap-4">
                  <input type="checkbox"
                    checked={saturday}
                    onChange={(e) => handleFilterChange(FilterEnum.saturday, saturday, setSaturday, e)}
                    className={`checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[${okb_colors.med_gray}]`} />
                  <span className={`label-text flex text-[${okb_colors.dark_gray}]`}>Saturday</span>
                </label>
                <label className="label cursor-pointer flex py-2 px-3 items-center gap-4">
                  <input type="checkbox"
                    checked={sunday}
                    onChange={(e) => handleFilterChange(FilterEnum.sunday, sunday, setSunday, e)}
                    className={`checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[${okb_colors.med_gray}]`} />
                  <span className={`label-text flex text-[${okb_colors.dark_gray}]`}>Sunday</span>
                </label>
              </div>
            </ul>
          }
        </div>

        {/* filter dropdowns for language */}
        <div className={`dropdown flex w-52 h-9 py-2 px-4 justify-between shrink-0 border-solid border rounded-lg border-[${okb_colors.dark_gray}] bg-[${okb_colors.white}]`}>
          <p className={`text-[${okb_colors.med_gray}] italic text-xs font-normal`}>Language</p>
          <button tabIndex={0}
            ref={languageDropdownRef}
            onClick={handleLanguageDropdownClick}
            className=' flex flex-col items-start gap-2.5'>{chevron_down}</button>
          {showLanguageDropdown &&
            <ul tabIndex={0} className={`dropdown-content menu w-52 p-2 shadow bg-base-100 rounded-lg  border-solid border border-[${okb_colors.dark_gray}] shadow-[0_4px_10px_0px_rgb(0,0,0,0.15)] absolute mt-8 left-0`}>
              <div
                ref={languageDropdownMenuRef}
                className="form-control flex flex-col justify-center items-start">
                <label className="label cursor-pointer flex py-2 px-3 items-center gap-4 pb-3.5">
                  <input type="checkbox"
                    checked={allLanguages}
                    onChange={(e) => handleFilterChange(FilterEnum.allLanguages, allLanguages, setAllLanguages, e)}
                    className={`checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[${okb_colors.med_gray}]`} />
                  <span className={`label-text flex text-[${okb_colors.dark_gray}]`}>Select All</span>
                </label>
                <hr className={`w-48 h-0.5 bg-[${okb_colors.dark_gray}]`}></hr>
                <label className="label cursor-pointer flex py-2 px-3 items-center gap-4 pt-3.5">
                  <input type="checkbox"
                    checked={english}
                    onChange={(e) => handleFilterChange(FilterEnum.english, english, setEnglish, e)}
                    className={`checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[${okb_colors.med_gray}]`} />
                  <span className={`label-text flex text-[${okb_colors.dark_gray}]`}>English</span>
                </label>
                <label className="label cursor-pointer flex py-2 px-3 items-center gap-4">
                  <input type="checkbox"
                    checked={ga}
                    onChange={(e) => handleFilterChange(FilterEnum.ga, ga, setGa, e)}
                    className={`checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[${okb_colors.med_gray}]`} />
                  <span className={`label-text flex text-[${okb_colors.dark_gray}]`}>Ga</span>
                </label>
                <label className="label cursor-pointer flex py-2 px-3 items-center gap-4">
                  <input type="checkbox"
                    checked={twi}
                    onChange={(e) => handleFilterChange(FilterEnum.twi, twi, setTwi, e)}
                    className={`checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[${okb_colors.med_gray}]`} />
                  <span className={`label-text flex text-[${okb_colors.dark_gray}]`}>Twi</span>
                </label>
                <label className="label cursor-pointer flex py-2 px-3 items-center gap-4">
                  <input type="checkbox"
                    checked={hausa}
                    onChange={(e) => handleFilterChange(FilterEnum.hausa, hausa, setHausa, e)}
                    className={`checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[${okb_colors.med_gray}]`} />
                  <span className={`label-text flex text-[${okb_colors.dark_gray}]`}>Hausa</span>
                </label>
              </div>
            </ul>
          }
        </div>

        {/* filter drop downs for gender */}
        <div className={`dropdown flex w-52 h-9 py-2 px-4 justify-between shrink-0 border-solid border rounded-lg border-[${okb_colors.dark_gray}] bg-[${okb_colors.white}]`}>
          <p className={`text-[${okb_colors.med_gray}] italic text-xs font-normal`}>Gender</p>
          <button tabIndex={0}
            ref={genderDropdownRef}
            onClick={handleGenderDropdownClick}
            className='flex flex-col items-start gap-2.5'>{chevron_down}</button>
          {showGenderDropdown &&
            <ul tabIndex={0} className={`dropdown-content menu w-52 p-2 shadow bg-base-100 rounded  border-solid border border-[${okb_colors.dark_gray}] shadow-[0_4px_10px_0px_rgb(0,0,0,0.15)] absolute mt-8 left-0`}>
              <div
                ref={genderDropdownMenuRef}
                className="form-control flex flex-col justify-center items-start">
                <label className="label cursor-pointer flex py-2 px-3 items-center gap-4 pb-3.5">
                  <input type="checkbox"
                    checked={bothGenders}
                    onChange={(e) => handleFilterChange(FilterEnum.bothGenders, bothGenders, setBothGenders, e)}
                    className={`checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[${okb_colors.med_gray}]`} />
                  <span className={`label-text flex text-[${okb_colors.dark_gray}]`}>Select All</span>
                </label>
                <hr className={`w-48 h-0.5 bg-[${okb_colors.dark_gray}]`}></hr>
                <label className="label cursor-pointer flex py-2 px-3 items-center gap-4 pt-3.5">
                  <input type="checkbox"
                    checked={male}
                    onChange={(e) => handleFilterChange(FilterEnum.male, male, setMale, e)}
                    className={`checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[${okb_colors.med_gray}]`} />
                  <span className={`label-text flex text-[${okb_colors.dark_gray}]`}>Male</span>
                </label>
                <label className="label cursor-pointer flex py-2 px-3 items-center gap-4">
                  <input type="checkbox"
                    checked={female}
                    onChange={(e) => handleFilterChange(FilterEnum.female, female, setFemale, e)}
                    className={`checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[${okb_colors.med_gray}]`} />
                  <span className={`label-text flex text-[${okb_colors.dark_gray}]`}>Female</span>
                </label>
              </div>
            </ul>
          }
        </div>

        {/* filter button */}
        <button onClick={handleFilter} className={`filter-button flex w-32 h-9 py-2.5 px-11 justify-center items-center gap-2.5 border-solid border rounded-lg border-[#195BA5] bg-[${okb_colors.white}]`}>
          <div className={`text-[${okb_colors.okb_blue}] text-xs font-bold`}>Filter</div>
        </button>
      </div>
    </div>
  );
};