import React, { useEffect, useState } from 'react';
interface Filters {
  [key: string]: any; 
}

interface DiscoverFilterProps {
  monday: boolean;
  setMonday: React.Dispatch<React.SetStateAction<boolean>>;
  tuesday: boolean;
  setTuesday: React.Dispatch<React.SetStateAction<boolean>>;
  wednesday: boolean;
  setWednesday: React.Dispatch<React.SetStateAction<boolean>>;
  thursday: boolean;
  setThursday: React.Dispatch<React.SetStateAction<boolean>>;
  friday: boolean;
  setFriday: React.Dispatch<React.SetStateAction<boolean>>;
  saturday: boolean;
  setSaturday: React.Dispatch<React.SetStateAction<boolean>>;
  sunday: boolean;
  setSunday: React.Dispatch<React.SetStateAction<boolean>>;
  allDays: boolean;
  setAllDays: React.Dispatch<React.SetStateAction<boolean>>;
  english: boolean;
  setEnglish: React.Dispatch<React.SetStateAction<boolean>>;
  twi: boolean;
  setTwi: React.Dispatch<React.SetStateAction<boolean>>;
  fante: boolean;
  setFante: React.Dispatch<React.SetStateAction<boolean>>;
  ewe: boolean;
  setEwe: React.Dispatch<React.SetStateAction<boolean>>;
  ga: boolean;
  setGa: React.Dispatch<React.SetStateAction<boolean>>;
  hausa: boolean;
  setHausa: React.Dispatch<React.SetStateAction<boolean>>;
  allLanguages: boolean;
  setAllLanguages: React.Dispatch<React.SetStateAction<boolean>>;
  male: boolean;
  setMale: React.Dispatch<React.SetStateAction<boolean>>;
  female: boolean;
  setFemale: React.Dispatch<React.SetStateAction<boolean>>;
  otherGender: boolean;
  setOtherGender: React.Dispatch<React.SetStateAction<boolean>>;
  allGenders: boolean;
  setAllGenders: React.Dispatch<React.SetStateAction<boolean>>;
  searchTerm:string,
  setSearchTerm:React.Dispatch<React.SetStateAction<string>>
  submittedFilters: Filters;
  setSubmittedFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const DiscoverFilter: React.FC<DiscoverFilterProps> = ({
  submittedFilters,
  setSubmittedFilters,
  monday,
  setMonday,
  tuesday,
  setTuesday,
  wednesday,
  setWednesday,
  thursday,
  setThursday,
  friday,
  setFriday,
  saturday,
  setSaturday,
  sunday,
  setSunday,
  allDays,
  setAllDays,
  english,
  setEnglish,
  twi,
  setTwi,
  fante,
  setFante,
  ewe,
  setEwe,
  ga,
  setGa,
  hausa,
  setHausa,
  allLanguages,
  setAllLanguages,
  male,
  setMale,
  female,
  setFemale,
  otherGender,
  setOtherGender,
  allGenders,
  setAllGenders,
  searchTerm,
  setSearchTerm
  
}) => {
  const [genderOpen, setGenderOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [dayOpen, setDayOpen] = useState(false);
  
  useEffect(() => {
    if (english && twi && fante && ewe && ga && hausa) {
      setAllLanguages(true);
    } else {
      setAllLanguages(false);
    }
  }, [english, twi, fante, ewe, ga, hausa, setAllLanguages]);

  // Effect to check if all day checkboxes are selected
  
  useEffect(() => {
    if (monday && tuesday && wednesday && thursday && friday && saturday && sunday) {
      setAllDays(true);
    } else {
      setAllDays(false);
    }
  }, [monday, tuesday, wednesday, thursday, friday, saturday, sunday, setAllDays]);

  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };


  // Automatically update submittedFilters whenever any filter changes
  useEffect(() => {
    const days = [
      sunday && 'Sunday',
      monday && 'Monday',
      tuesday && 'Tuesday',
      wednesday && 'Wednesday',
      thursday && 'Thursday',
      friday && 'Friday',
      saturday && 'Saturday',
    ].filter(Boolean);

    const languages = [
      english && 'English',
      twi && 'Twi',
      fante && 'Fante',
      ewe && 'Ewe',
      ga && 'Ga',
      hausa && 'Hausa',
    ].filter(Boolean);

    const genders:number[] = [];
    if (male) genders.push(0);
    if (female) genders.push(1);
    if (otherGender) genders.push(2);

    setSubmittedFilters({
      searchTerm,
      days,
      languages,
      genders,
    });
  }, [
    searchTerm,
    sunday,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    english,
    twi,
    fante,
    ewe,
    ga,
    hausa,
    male,
    female,
    otherGender,
    setSubmittedFilters,
  ]);

  return (
    <div className="filter-container">
      <h3 className="text-2xl font-semibold mb-4">Filter psychiatrists by:</h3>
      {/* Search Bar */}
    <div className="mb-4">
      <label htmlFor="search" className="w-full text-left font-medium px-4 py-2">
        Search
      </label>
      <div className="relative px-4 py-2">
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for a psychiatrist"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
            <div className="absolute inset-y-0 right-10 flex items-center pointer-events-none">
         &#128269;
         </div>

      </div>
    </div>

      {/* Gender Dropdown */}
<div className="mb-4">
  <button
    onClick={() => setGenderOpen(!genderOpen)}
    className="w-full text-left font-medium px-4 py-2 "
  >
    Gender {genderOpen ? '▲' : '▼'}
  </button>
  {genderOpen && (
    <div className="mt-2 ml-6">
      <div className="flex items-center mb-2">
        <input
          type="radio"
          id="female"
          name="gender"
          className="mr-2"
          checked={female}
          onChange={() => {
            setMale(false);
            setFemale(true);
            setOtherGender(false);
            setAllGenders(false);
          }}
        />
        <label htmlFor="female" className="text-sm text-gray-700">
          Female
        </label>
      </div>
      <div className="flex items-center mb-2">
        <input
          type="radio"
          id="male"
          name="gender"
          className="mr-2"
          checked={male}
          onChange={() => {
            setMale(true);
            setFemale(false);
            setOtherGender(false);
            setAllGenders(false);
          }}
        />
        <label htmlFor="male" className="text-sm text-gray-700">
          Male
        </label>
      </div>
      <div className="flex items-center mb-2">
        <input
          type="radio"
          id="other"
          name="gender"
          className="mr-2"
          checked={otherGender}
          onChange={() => {
            setMale(false);
            setFemale(false);
            setOtherGender(true);
            setAllGenders(false);
          }}
        />
        <label htmlFor="OtherGender" className="text-sm text-gray-700">
          Other
        </label>
      </div>
      <div className="flex items-center">
        <input
          type="radio"
          id="noPreference"
          name="gender"
          className="mr-2"
          checked={allGenders}
          onChange={() => {
            setMale(false);
            setFemale(false);
            setOtherGender(false);
            setAllGenders(true);
          }}
        />
        <label htmlFor="noPreference" className="text-sm text-gray-700">
          No Preference
        </label>
      </div>
    </div>
  )}
  </div>
  {/* Language Dropdown */}
  <div className="mb-4">
    <button
      onClick={() => setLanguageOpen(!languageOpen)}
      className="w-full text-left font-medium  px-4 py-2 "
    >
      Languages {languageOpen ? '▲' : '▼'}
    </button>
    {languageOpen && (
      <div className="mt-2 ml-6">
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="english"
            className="mr-2"
            checked={english}
            onChange={() => setEnglish(!english)}
          />
          <label htmlFor="english" className="text-sm text-gray-700">
            English
          </label>
        </div>
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="twi"
            className="mr-2"
            checked={twi}
            onChange={() => setTwi(!twi)}
          />
          <label htmlFor="twi" className="text-sm text-gray-700">
            Twi
          </label>
        </div>
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="fante"
            className="mr-2"
            checked={fante}
            onChange={() => setFante(!fante)}
          />
          <label htmlFor="fante" className="text-sm text-gray-700">
            Fante
          </label>
        </div>
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="ewe"
            className="mr-2"
            checked={ewe}
            onChange={() => setEwe(!ewe)}
          />
          <label htmlFor="ewe" className="text-sm text-gray-700">
            Ewe
          </label>
        </div>
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="ga"
            className="mr-2"
            checked={ga}
            onChange={() => setGa(!ga)}
          />
          <label htmlFor="ga" className="text-sm text-gray-700">
            Ga
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="hausa"
            className="mr-2"
            checked={hausa}
            onChange={() => setHausa(!hausa)}
          />
          <label htmlFor="hausa" className="text-sm text-gray-700">
            Hausa
          </label>
        </div>
      </div>
    )}
  </div>



    {/* Day of Week Dropdown */}
    {/* <div className="mb-4">
      <button
        onClick={() => setDayOpen(!dayOpen)}
        className="w-full text-left font-medium px-4 py-2 "
      >
        Day of Week {dayOpen ? '▲' : '▼'}
      </button>
      {dayOpen && (
        <div className="mt-2 ml-6">
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="sunday"
              className="mr-2"
              checked={sunday}
              onChange={() => setSunday(!sunday)}
            />
            <label htmlFor="sunday" className="text-sm text-gray-700">
              Sunday
            </label>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="monday"
              className="mr-2"
              checked={monday}
              onChange={() => setMonday(!monday)}
            />
            <label htmlFor="monday" className="text-sm text-gray-700">
              Monday
            </label>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="tuesday"
              className="mr-2"
              checked={tuesday}
              onChange={() => setTuesday(!tuesday)}
            />
            <label htmlFor="tuesday" className="text-sm text-gray-700">
              Tuesday
            </label>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="wednesday"
              className="mr-2"
              checked={wednesday}
              onChange={() => setWednesday(!wednesday)}
            />
            <label htmlFor="wednesday" className="text-sm text-gray-700">
              Wednesday
            </label>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="thursday"
              className="mr-2"
              checked={thursday}
              onChange={() => setThursday(!thursday)}
            />
            <label htmlFor="thursday" className="text-sm text-gray-700">
              Thursday
            </label>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="friday"
              className="mr-2"
              checked={friday}
              onChange={() => setFriday(!friday)}
            />
            <label htmlFor="friday" className="text-sm text-gray-700">
              Friday
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="saturday"
              className="mr-2"
              checked={saturday}
              onChange={() => setSaturday(!saturday)}
            />
            <label htmlFor="saturday" className="text-sm text-gray-700">
              Saturday
            </label>
          </div>
        </div>
      )}
    </div> */}
    </div>
      );
  };

  export default DiscoverFilter;
