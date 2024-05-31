import { useState, ChangeEvent, use, useEffect, useRef } from 'react';
import chevron_down from '@/assets/chevron_down';
import search_icon from '@/assets/search_icon';
import okb_colors from '../../colors';

export default function adminSearchBarPatients({ searchTerm, setSearchTerm, submittedSearchTerm,
  setSubmittedSearchTerm, filters, setFilters, submittedFilters, setSubmittedFilters,
  below19, setBelow19, twentyToThirty, setTwentyToThirty, thirtyToFourty, setThirtyToFourty,
  fourtyToFifty, setFourtyToFifty, overFifty, setOverFifty, allAgeRanges, setAllAgeRanges,
  male, setMale, female, setFemale, otherGender, setOtherGender, allGenders, setAllGenders,
  relationship, setRelationship, addiction, setAddiction, suicidal, setSuicidal, family,
  setFamily, substance, setSubstance, academic, setAcademic, social, setSocial, depression,
  setDepression, other, setOther, allConcerns, setAllConcerns }: any) {

  const FilterEnum = {
    below19: "below19",
    twentyToThirty: "twentyToThirty",
    thirtyToFourty: "thirtyToFourty",
    fourtyToFifty: "fourtyToFifty",
    overFifty: "overFifty",
    allAgeRanges: "allAgeRanges",
    male: "male",
    female: "female",
    otherGender: "other",
    allGenders: "allGenders",
    relationship: "relationship",
    addiction: "addiction",
    suicidal: "suicidal",
    family: "family",
    substance: "substance",
    academic: "academic",
    social: "social",
    depression: "depression",
    other: "other",
    allConcerns: "allConcerns"
  }


  const ageRange = [
    FilterEnum.below19,
    FilterEnum.twentyToThirty,
    FilterEnum.thirtyToFourty,
    FilterEnum.fourtyToFifty,
    FilterEnum.overFifty,
    FilterEnum.allAgeRanges
  ];

  const genders = [
    FilterEnum.male,
    FilterEnum.female,
    FilterEnum.otherGender
  ];

  const concerns = [
    FilterEnum.relationship,
    FilterEnum.addiction,
    FilterEnum.suicidal,
    FilterEnum.family,
    FilterEnum.substance,
    FilterEnum.academic,
    FilterEnum.social,
    FilterEnum.depression,
    FilterEnum.other,
    FilterEnum.allConcerns
  ];

  const selected: any = [...filters]
  // const [searchTerm, setSearchTerm] = useState('');

  const [showAgeDropdown, setShowAgeDropdown] = useState(false);
  const ageDropdownRef = useRef<HTMLButtonElement | null>(null);
  const ageDropdownMenuRef = useRef<HTMLDivElement | null>(null);

  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const genderDropdownRef = useRef<HTMLButtonElement | null>(null);
  const genderDropdownMenuRef = useRef<HTMLDivElement | null>(null);

  const [showConcernsDropdown, setShowConcernsDropdown] = useState(false);
  const concernsDropdownRef = useRef<HTMLButtonElement | null>(null);
  const concernsDropdownMenuRef = useRef<HTMLDivElement | null>(null);

  // Opens or closes the dropdown for age range and makes sure the other dropdowns are closed
  const handleAgeDropdownClick = (e) => {
    // Prevent the event from propagating to the window click listener
    e.stopPropagation();
    setShowAgeDropdown(!showAgeDropdown);
    setShowGenderDropdown(false);
    setShowConcernsDropdown(false);
  };

  // Opens or closes the dropdown for gender and makes sure the other dropdowns are closed
  const handleGenderDropdownClick = (e) => {
    // Prevent the event from propagating to the window click listener
    e.stopPropagation();
    setShowGenderDropdown(!showGenderDropdown);
    setShowAgeDropdown(false);
    setShowConcernsDropdown(false);
  };

  // Opens or closes the dropdown for status and makes sure the other dropdowns are closed
  const handleConcernsDropdownClick = (e) => {
    // Prevent the event from propagating to the window click listener
    e.stopPropagation();
    setShowConcernsDropdown(!showConcernsDropdown);
    setShowGenderDropdown(false);
    setShowAgeDropdown(false);
  };

  // Close dropdown if there is a click anywhere outside of the dropdown refs
  useEffect(() => {
    const clickListener = (e) => {
      const isAgeDropdownClick =
        (ageDropdownRef.current && ageDropdownRef.current.contains(e.target)) ||
        (ageDropdownMenuRef.current && ageDropdownMenuRef.current.contains(e.target));
      const isGenderDropdownClick =
        (genderDropdownRef.current && genderDropdownRef.current.contains(e.target)) ||
        (genderDropdownMenuRef.current && genderDropdownMenuRef.current.contains(e.target));
      const isConcernsDropdownClick =
        (concernsDropdownRef.current && concernsDropdownRef.current.contains(e.target)) ||
        (concernsDropdownMenuRef.current && concernsDropdownMenuRef.current?.contains(e.target));

      if (!isAgeDropdownClick) {
        setShowAgeDropdown(false);
      }
      if (!isGenderDropdownClick) {
        setShowGenderDropdown(false);
      }
      if (!isConcernsDropdownClick) {
        setShowConcernsDropdown(false);
      }
    };

    window.addEventListener('click', clickListener);

    return () => {
      window.removeEventListener('click', clickListener);
    };
  }, [showAgeDropdown, showGenderDropdown, showConcernsDropdown]);

  // Updates searchTerm if the value in the search bar changes
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);
  };

  // Searches when the enter key is pressed
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setSubmittedSearchTerm(searchTerm);
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

    if (filter === FilterEnum.allAgeRanges) {
      handleSelectAll(ageRange)
    } else if (filter === FilterEnum.allGenders) {
      handleSelectAll(genders)
    } else if (filter === FilterEnum.allConcerns) {
      handleSelectAll(concerns)
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

  useEffect(() => {
    if (Object.keys(submittedFilters).length === 0) {
      setBelow19(false);
      setTwentyToThirty(false);
      setThirtyToFourty(false);
      // setFourtyToFifty(false);
      setOverFifty(false);
      setAllAgeRanges(false);
      setMale(false);
      setFemale(false);
      setOtherGender(false);
      setAllGenders(false);
      setRelationship(false);
      setAddiction(false);
      setSuicidal(false);
      setFamily(false);
      setSubstance(false);
      setAcademic(false);
      setSocial(false);
      setDepression(false);
      setOther(false);
      setAllConcerns(false);
    }
  }, [submittedFilters]);


  // Updates the selected filter's state and selected array when the selected filter is checked/unchecked
  function handleFilterChange(filterName: string, filterState: boolean, setFunction: any,
    event: {
      target: {
        checked: boolean
      }
    }) {

    if (filterName === FilterEnum.allAgeRanges) {
      setAllAgeRanges(event.target.checked);
      setBelow19(event.target.checked);
      setTwentyToThirty(event.target.checked);
      setThirtyToFourty(event.target.checked);
      setFourtyToFifty(event.target.checked);
      setOverFifty(event.target.checked);
      updateSelected(FilterEnum.below19, event.target.checked);
      updateSelected(FilterEnum.twentyToThirty, event.target.checked);
      updateSelected(FilterEnum.thirtyToFourty, event.target.checked);
      updateSelected(FilterEnum.fourtyToFifty, event.target.checked);
      updateSelected(FilterEnum.overFifty, event.target.checked);
    } else if (filterName === FilterEnum.allGenders) {
      setAllGenders(event.target.checked);
      setMale(event.target.checked);
      setFemale(event.target.checked);
      setOtherGender(event.target.checked);
      updateSelected(FilterEnum.male, event.target.checked);
      updateSelected(FilterEnum.female, event.target.checked);
      updateSelected(FilterEnum.otherGender, event.target.checked);
    } else if (filterName === FilterEnum.allConcerns) {
      setAllConcerns(event.target.checked);
      setRelationship(event.target.checked);
      setAddiction(event.target.checked);
      setSuicidal(event.target.checked);
      setFamily(event.target.checked);
      setSubstance(event.target.checked);
      setAcademic(event.target.checked);
      setSocial(event.target.checked);
      setDepression(event.target.checked);
      setOther(event.target.checked);
      updateSelected(FilterEnum.relationship, event.target.checked);
      updateSelected(FilterEnum.addiction, event.target.checked);
      updateSelected(FilterEnum.suicidal, event.target.checked);
      updateSelected(FilterEnum.family, event.target.checked);
      updateSelected(FilterEnum.substance, event.target.checked);
      updateSelected(FilterEnum.academic, event.target.checked);
      updateSelected(FilterEnum.social, event.target.checked);
      updateSelected(FilterEnum.depression, event.target.checked);
      updateSelected(FilterEnum.other, event.target.checked);
    } else {
      if (filterName === FilterEnum.below19 || filterName === FilterEnum.twentyToThirty || filterName === FilterEnum.thirtyToFourty
        || filterName === FilterEnum.fourtyToFifty || filterName === FilterEnum.overFifty) {
        if (event.target.checked === false) {
          setAllAgeRanges(false);
        }
      } else if (filterName === FilterEnum.male || filterName === FilterEnum.female || filterName === FilterEnum.otherGender) {
        if (event.target.checked === false) {
          setAllGenders(false);
        }
      } else if (filterName === FilterEnum.relationship || filterName === FilterEnum.addiction || filterName === FilterEnum.suicidal
        || filterName === FilterEnum.family || filterName === FilterEnum.substance || filterName === FilterEnum.academic
        || filterName === FilterEnum.social || filterName === FilterEnum.depression || filterName === FilterEnum.other) {
        if (event.target.checked === false) {
          setAllConcerns(false);
        }
      }
      setFunction(event.target.checked);
      updateSelected(filterName, event.target.checked);
    }
  }

  // Parses the selected filters array into a dictionary that maps filter categories to an array of filters they encompass
  const handleFilter = () => {
    setSubmittedSearchTerm(searchTerm);
    const filtersCategorized: { ageRange: string[], genders: number[], concerns: string[] } = { ageRange: [], genders: [], concerns: [] };
    for (let i = 0; i < filters.length; i++) {
      const filter = filters[i].filter;
      if (ageRange.includes(filter)) {
        filtersCategorized['ageRange'].push(filter);
      } else if (genders.includes(filter)) {
        if (filter === FilterEnum.male) {
          filtersCategorized['genders'].push(0);
        } else if (filter === FilterEnum.female) {
          filtersCategorized['genders'].push(1);
        } else if (filter === FilterEnum.otherGender) {
          filtersCategorized['genders'].push(2);
        }
      } else {
        if (concerns.includes(filter)) {
          filtersCategorized['concerns'].push(filter);
        }
      }
    }
    setSubmittedFilters(filtersCategorized);
    console.log("submitted filters: " + submittedFilters)
  }

  return (
    <div>
      <div className="flex flex-row w-full h-9 gap-x-2 md:gap-x-2">
        <div className='flex flex-col md:flex-row gap-x-2 md:gap-x-2 gap-y-2 md:gap-y-4'>
          {/* search bar */}
          <div className={`flex xl:w-96 h-12 py-2 px-4 items-center gap-4 shrink-0 border-solid border rounded-lg border-[#5F5F5F] bg-[${okb_colors.white}]`}>
            {search_icon}
            <div className="form-control w-full">
              <div className="input-group w-full">
                <input type="text"
                  placeholder={"Search Name or Title"}
                  onKeyDown={handleKeyDown}
                  value={searchTerm}
                  // updates the search bar's text as the user types into it
                  onChange={handleSearchChange} className={`text-[#9A9A9A] text-sm font-normal outline-none w-full`} />
              </div>
            </div>
          </div>

          {/* filter dropdowns for availability */}

          <div className={`dropdown flex xl:w-40 h-12 py-3.5 px-2 justify-between shrink-0 border-solid border rounded-lg border-[${okb_colors.dark_gray}] bg-[${okb_colors.white}]`}>
            <p className={`text-[${okb_colors.med_gray}] text-sm font-normal`}>Age Range</p>
            <button tabIndex={0}
              ref={ageDropdownRef}
              onClick={handleAgeDropdownClick}
              className=' flex flex-col items-start gap-2.5'>{chevron_down}</button>
            {showAgeDropdown &&
              <ul tabIndex={0} className={`dropdown-content menu flex flex-col w-52 p-2 shadow bg-base-100 rounded-lg border-solid border border-[${okb_colors.dark_gray}] shadow-[0_4px_10px_0px_rgb(0,0,0,0.15)] absolute mt-8 left-0`}>
                <div
                  ref={ageDropdownMenuRef}
                  className="form-control justify-center items-start">
                  <label className="label cursor-pointer flex py-2 px-3 items-center gap-4 pb-3.5">
                    <input type="checkbox"
                      checked={allAgeRanges}
                      onChange={(e) => handleFilterChange(FilterEnum.allAgeRanges, allAgeRanges, setAllAgeRanges, e)}
                      className={`checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[#9A9A9A]`} />
                    <span className={`label-text flex text-[${okb_colors.dark_gray}]`}>Select All</span>
                  </label>
                  <hr className={`w-48 h-0.5 bg-[#5F5F5F] place-self-center`}></hr>
                  <label className="label cursor-pointer flex py-2 px-3 items-center gap-4 pt-3.5">
                    <input type="checkbox"
                      checked={below19}
                      onChange={(e) => handleFilterChange(FilterEnum.below19, below19, setBelow19, e)}
                      className={`checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[${okb_colors.med_gray}]`} />
                    <span className={`label-text flex text-[${okb_colors.dark_gray}]`}>Below 19</span>
                  </label>
                  <label className="label cursor-pointer flex py-2 px-3 items-center gap-4">
                    <input type="checkbox"
                      checked={twentyToThirty}
                      onChange={(e) => handleFilterChange(FilterEnum.twentyToThirty, twentyToThirty, setTwentyToThirty, e)}
                      className={`checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[${okb_colors.med_gray}]`} />
                    <span className={`label-text flex text-[${okb_colors.dark_gray}]`}>20 to 30</span>
                  </label>
                  <label className="label cursor-pointer flex py-2 px-3 items-center gap-4">
                    <input type="checkbox"
                      checked={thirtyToFourty}
                      onChange={(e) => handleFilterChange(FilterEnum.thirtyToFourty, thirtyToFourty, setThirtyToFourty, e)}
                      className={`checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[${okb_colors.med_gray}]`} />
                    <span className={`label-text flex text-[${okb_colors.dark_gray}]`}>30 to 40</span>
                  </label>
                  <label className="label cursor-pointer flex py-2 px-3 items-center gap-4">
                    <input type="checkbox"
                      checked={fourtyToFifty}
                      onChange={(e) => handleFilterChange(FilterEnum.fourtyToFifty, fourtyToFifty, setFourtyToFifty, e)}
                      className={`checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[${okb_colors.med_gray}]`} />
                    <span className={`label-text flex text-[${okb_colors.dark_gray}]`}>40 to 50</span>
                  </label>
                  <label className="label cursor-pointer flex py-2 px-3 items-center gap-4">
                    <input type="checkbox"
                      checked={overFifty}
                      onChange={(e) => handleFilterChange(FilterEnum.overFifty, overFifty, setOverFifty, e)}
                      className={`checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[${okb_colors.med_gray}]`} />
                    <span className={`label-text flex text-[${okb_colors.dark_gray}]`}>Over 50</span>
                  </label>
                </div>
              </ul>
            }
          </div>

        </div>

        <div className='flex flex-col md:flex-row gap-x-2 md:gap-x-2 gap-y-2 md:gap-y-4'>
          {/* filter drop downs for gender */}
          <div className={`dropdown flex xl:w-36 h-12 py-3.5 px-4 justify-between shrink-0 border-solid border rounded-lg border-[${okb_colors.dark_gray}] bg-[${okb_colors.white}]`}>
            <p className={`text-[${okb_colors.med_gray}] text-sm font-normal`}>Gender</p>
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
                      checked={allGenders}
                      onChange={(e) => handleFilterChange(FilterEnum.allGenders, allGenders, setAllGenders, e)}
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
                  <label className="label cursor-pointer flex py-2 px-3 items-center gap-4">
                    <input type="checkbox"
                      checked={otherGender}
                      onChange={(e) => handleFilterChange(FilterEnum.otherGender, otherGender, setOtherGender, e)}
                      className={`checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[${okb_colors.med_gray}]`} />
                    <span className={`label-text flex text-[${okb_colors.dark_gray}]`}>Other</span>
                  </label>
                </div>
              </ul>
            }
          </div>
        </div>

        <div className='flex flex-col md:flex-row gap-x-2 md:gap-x-2 gap-y-2 md:gap-y-4'>
          {/* filter drop downs for concerns */}
          <div className={`dropdown flex xl:w-36 h-12 py-3.5 px-4 justify-between shrink-0 border-solid border rounded-lg border-[${okb_colors.dark_gray}] bg-[${okb_colors.white}]`}>
            <p className={`text-[${okb_colors.med_gray}] text-sm font-normal`}>Concerns</p>
            <button tabIndex={0}
              ref={concernsDropdownRef}
              onClick={handleConcernsDropdownClick}
              className='flex flex-col items-start gap-2.5'>{chevron_down}</button>
            {showConcernsDropdown &&
              <ul tabIndex={0} className={`dropdown-content menu w-52 p-2 shadow bg-base-100 rounded  border-solid border border-[${okb_colors.dark_gray}] shadow-[0_4px_10px_0px_rgb(0,0,0,0.15)] absolute mt-8 left-0`}>
                <div
                  ref={concernsDropdownMenuRef}
                  className="form-control flex flex-col justify-center items-start">
                  <label className="label cursor-pointer flex py-2 px-3 items-center gap-4 pb-3.5">
                    <input type="checkbox"
                      checked={allConcerns}
                      onChange={(e) => handleFilterChange(FilterEnum.allConcerns, allConcerns, setAllConcerns, e)}
                      className={`checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[${okb_colors.med_gray}]`} />
                    <span className={`label-text flex text-[${okb_colors.dark_gray}]`}>Select All</span>
                  </label>
                  <hr className={`w-48 h-0.5 bg-[${okb_colors.dark_gray}]`}></hr>
                  <label className="label cursor-pointer flex py-2 px-3 items-center gap-4 pt-3.5">
                    <input type="checkbox"
                      checked={relationship}
                      onChange={(e) => handleFilterChange(FilterEnum.relationship, relationship, setRelationship, e)}
                      className={`checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[${okb_colors.med_gray}]`} />
                    <span className={`label-text flex text-[${okb_colors.dark_gray}]`}>Relationship</span>
                  </label>
                  <label className="label cursor-pointer flex py-2 px-3 items-center gap-4">
                    <input type="checkbox"
                      checked={addiction}
                      onChange={(e) => handleFilterChange(FilterEnum.addiction, addiction, setAddiction, e)}
                      className={`checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[${okb_colors.med_gray}]`} />
                    <span className={`label-text flex text-[${okb_colors.dark_gray}]`}>Addiction</span>
                  </label>
                  <label className="label cursor-pointer flex py-2 px-3 items-center gap-4">
                    <input type="checkbox"
                      checked={suicidal}
                      onChange={(e) => handleFilterChange(FilterEnum.suicidal, suicidal, setSuicidal, e)}
                      className={`checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[${okb_colors.med_gray}]`} />
                    <span className={`label-text flex text-[${okb_colors.dark_gray}]`}>Suicidal</span>
                  </label>
                  <label className="label cursor-pointer flex py-2 px-3 items-center gap-4">
                    <input type="checkbox"
                      checked={family}
                      onChange={(e) => handleFilterChange(FilterEnum.family, family, setFamily, e)}
                      className={`checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[${okb_colors.med_gray}]`} />
                    <span className={`label-text flex text-[${okb_colors.dark_gray}]`}>Family</span>
                  </label>
                  <label className="label cursor-pointer flex py-2 px-3 items-center gap-4">
                    <input type="checkbox"
                      checked={substance}
                      onChange={(e) => handleFilterChange(FilterEnum.substance, substance, setSubstance, e)}
                      className={`checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[${okb_colors.med_gray}]`} />
                    <span className={`label-text flex text-[${okb_colors.dark_gray}]`}>Substance</span>
                  </label>
                  <label className="label cursor-pointer flex py-2 px-3 items-center gap-4">
                    <input type="checkbox"
                      checked={academic}
                      onChange={(e) => handleFilterChange(FilterEnum.academic, academic, setAcademic, e)}
                      className={`checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[${okb_colors.med_gray}]`} />
                    <span className={`label-text flex text-[${okb_colors.dark_gray}]`}>Academic</span>
                  </label>
                  <label className="label cursor-pointer flex py-2 px-3 items-center gap-4">
                    <input type="checkbox"
                      checked={social}
                      onChange={(e) => handleFilterChange(FilterEnum.social, social, setSocial, e)}
                      className={`checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[${okb_colors.med_gray}]`} />
                    <span className={`label-text flex text-[${okb_colors.dark_gray}]`}>Social</span>
                  </label>
                  <label className="label cursor-pointer flex py-2 px-3 items-center gap-4">
                    <input type="checkbox"
                      checked={depression}
                      onChange={(e) => handleFilterChange(FilterEnum.depression, depression, setDepression, e)}
                      className={`checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[${okb_colors.med_gray}]`} />
                    <span className={`label-text flex text-[${okb_colors.dark_gray}]`}>Depression</span>
                  </label>
                  <label className="label cursor-pointer flex py-2 px-3 items-center gap-4">
                    <input type="checkbox"
                      checked={other}
                      onChange={(e) => handleFilterChange(FilterEnum.other, other, setOther, e)}
                      className={`checkbox flex flex-col items-start w-4 h-4 rounded-sm border-2 border-[${okb_colors.med_gray}]`} />
                    <span className={`label-text flex text-[${okb_colors.dark_gray}]`}>Other</span>
                  </label>
                </div>
              </ul>
            }
          </div>

          {/* filter button */}
          <div>
            <button onClick={handleFilter} className={`filter-button flex lg:w-24 h-12 py-1 px-4 lg:py-2.5 lg:px-11 justify-center items-center gap-2.5 border-solid border rounded-lg border-[#195BA5] bg-[${okb_colors.white}]`}>
              <div className={`flex text-[${okb_colors.okb_blue}] text-sm font-bold`}>Filter</div>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}