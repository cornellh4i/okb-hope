import { useState, useMemo, useEffect } from 'react';
import Fuse from 'fuse.js';
import { IAvailability, IPsychiatrist } from '@/schema';
import colors from "@/colors";
import { collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { fetchAllProfessionals, fetchAvailability } from '../../../firebase/fetchData';
import AdminSearchBar from './adminSearchBar';
// import PsychiatristList from '@/components/psychiatrists/PsychiatristList';
import { useAuth } from '../../../contexts/AuthContext';

// options for fuzzy search. currently only searches by name and title
const fuseOptions = {
  keys: ['firstName', 'lastName', 'position'],
  threshold: 0.5,
  findAllMatches: true,
  distance: 5,
  ignoreLocation: true,
  useExtendedSearch: true,
};

interface SearchBarProps {
  setFilteredPsychiatrists;
  setSubmittedFiltersLength
}

const AdminFilterBar: React.FC<SearchBarProps> = ({ setFilteredPsychiatrists, setSubmittedFiltersLength }) => {
  const router = useRouter();
  const { user } = useAuth();
  const { userId } = router.query;

  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState("");
  const [filters, setFilters] = useState([]);
  const [submittedFilters, setSubmittedFilters] = useState({});
  const [monday, setMonday] = useState(false);
  const [tuesday, setTuesday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [friday, setFriday] = useState(false);
  const [saturday, setSaturday] = useState(false);
  const [sunday, setSunday] = useState(false);
  const [allDays, setAllDays] = useState(false);
  const [english, setEnglish] = useState(false);
  const [twi, setTwi] = useState(false);
  const [fante, setFante] = useState(false);
  const [ewe, setEwe] = useState(false);
  const [ga, setGa] = useState(false);
  const [hausa, setHausa] = useState(false);
  const [allLanguages, setAllLanguages] = useState(false);
  const [male, setMale] = useState(false);
  const [female, setFemale] = useState(false);
  const [otherGender, setOtherGender] = useState(false);
  const [allGenders, setAllGenders] = useState(false);
  const [approved, setApproved] = useState(false);
  const [pending, setPending] = useState(false);
  const [allStatus, setAllStatus] = useState(false);

  const [psychiatrists, setPsychiatrists] = useState<IPsychiatrist[]>([]);
  const [psychiatristAvailabilities, setPsychiatristAvailabilities] = useState<Record<string, string[]>>({});

  //finds total length of submittedFilters
  useEffect(() => {
    // Calculate the total length of arrays in submittedFilters
    let totalLength = Object.values(submittedFilters)
      .filter((value): value is any[] => Array.isArray(value)) // Type guard to filter array values
      .reduce((sum, arr) => sum + arr.length, 0);

    if (searchTerm !== "") {
      totalLength += 1;
    }
    // Set the total length
    setSubmittedFiltersLength(totalLength);
  }, [submittedFilters]);

  // Get all psychiatrists from the database
  useEffect(() => {
    async function fetchData() {
      try {
        if (user) {
          console.log("HERE")
          const fetchedPsychiatrists: IPsychiatrist[] = await fetchAllProfessionals();
          setPsychiatrists(fetchedPsychiatrists);
          setFilteredPsychiatrists(fetchedPsychiatrists);
        }
      } catch (err: any) {
        console.error(err.message);
      }
    }
    fetchData();
  }, [router]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (user) {
          // console.log("HERE")
          const fetchedPsychiatrists: IPsychiatrist[] = await fetchAllProfessionals();
          setPsychiatrists(fetchedPsychiatrists);
        }
      } catch (err: any) {
        console.error(err.message);
      }
    }
    fetchData();
  }, [submittedFilters, submittedSearchTerm]);

  // Processes all psychiatrists availabilities to a dictionary mapping each psychiatrist's uid to their availabilities in the form of the days of the week
  useEffect(() => {
    const processPsychiatrists = async () => {
      const promises = psychiatrists.map(async (psychiatrist) => {
        const psychiatristId = psychiatrist.uid;
        const psychiatristAvailabilityToDaysOfWeek = psychiatrist.weeklyAvailability;
        setPsychiatristAvailabilities((prev) => ({ ...prev, [psychiatristId]: psychiatristAvailabilityToDaysOfWeek }));
      });
      await Promise.all(promises);
    };
    processPsychiatrists();
  }, [psychiatrists]);

  const fuse = useMemo(() => new Fuse(psychiatrists, fuseOptions), []);

  // Returns true if arr1 contains every element in arr2
  function containsAll(arr1: string[], arr2: string[]): boolean {
    if (arr1 && arr2) {
      return arr2.every(item => arr1.includes(item))
    }
    else if (!arr2) { return true }
    else { return false }
  }

  // Returns true if arr1 contains at least one element in arr2
  function containsOneOf(arr1: string[], arr2: string[]): boolean {
    if (arr1 && arr2) {
      if (arr2.length === 0) { return true }
      return arr2.some(item => arr1.includes(item))
    }
    else if (!arr2) { return true }
    else { return false }
  }

  // Returns true if gender is contained in genderArray
  function containsGender(arr1: number[], arr2: number[]): boolean {
    if (arr1 && arr2) {
      if (arr2.length === 0) { return true }
      return arr2.some(item => arr1.includes(item))
    }
    else if (!arr2) { return true }
    else { return false }
  }

  const matchesTerm = (psychiatrist: any, term: string) => {
    return psychiatrist.firstName?.toLowerCase().includes(term.toLowerCase()) ||
      psychiatrist.lastName?.toLowerCase().includes(term.toLowerCase()) ||
      psychiatrist.position?.toLowerCase().includes(term.toLowerCase());
  };

  // Filters psychiatrists by search and/or selected filters
  const processSearchFilter = () => {

    const terms = submittedSearchTerm.trim().split(/\s+/);
    let results = psychiatrists;
    console.log(submittedSearchTerm);
    console.log(terms);

    // Updates result by search term (first names, last names, and/or titles)
    // Handles searches with three terms
    if (terms.length > 0) {
      results = psychiatrists.filter((psychiatrist) =>
        terms.some((term) => matchesTerm(psychiatrist, term))
      );
    };

    console.log(results);

    // Updates results by the selected filters
    const filterResults = results.filter((psychiatrist) => {
      return (
        containsOneOf(psychiatristAvailabilities[psychiatrist.uid], submittedFilters['days']) &&
        containsOneOf(psychiatrist.language, submittedFilters['languages']) &&
        containsGender([psychiatrist.gender], submittedFilters['genders']) &&
        containsOneOf([psychiatrist.status], submittedFilters['status']));
    });

    return filterResults;
  };

  const resetSearchBar = () => {
    setSearchTerm("")
    setSubmittedSearchTerm("")
    setFilters([])
    setSubmittedFilters({})
  }

  var searchFilterResults = submittedSearchTerm !== "" || submittedFilters ? processSearchFilter() : psychiatrists;

  useEffect(() => {
    // If there is a search term or there are filters selected, process the search/filter
    // Else, return all psychiatrists
    searchFilterResults = submittedSearchTerm !== "" || submittedFilters ? processSearchFilter() : psychiatrists;
    if (searchFilterResults.length >= 0) {
      setFilteredPsychiatrists(searchFilterResults);
    }
  }, [submittedFilters, submittedSearchTerm])

  return (
    <div className={'flex flex-col mb-20 md:mb-6 lg:mb-0'}>
      <div className='flex justify-center md:pb-8 lg:pb-8'>
        <AdminSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}
          submittedSearchTerm={submittedSearchTerm} setSubmittedSearchTerm={setSubmittedSearchTerm}
          filters={filters} setFilters={setFilters}
          submittedFilters={submittedFilters} setSubmittedFilters={setSubmittedFilters}
          monday={monday} setMonday={setMonday}
          tuesday={tuesday} setTuesday={setTuesday}
          wednesday={wednesday} setWednesday={setWednesday}
          thursday={thursday} setThursday={setThursday}
          friday={friday} setFriday={setFriday}
          saturday={saturday} setSaturday={setSaturday}
          sunday={sunday} setSunday={setSunday}
          allDays={allDays} setAllDays={setAllDays}
          english={english} setEnglish={setEnglish}
          twi={twi} setTwi={setTwi}
          fante={fante} setFante={setFante}
          ewe={ewe} setEwe={setEwe}
          ga={ga} setGa={setGa}
          hausa={hausa} setHausa={setHausa}
          allLanguages={allLanguages} setAllLanguages={setAllLanguages}
          male={male} setMale={setMale}
          female={female} setFemale={setFemale}
          otherGender={otherGender} setOtherGender={setOtherGender}
          allGenders={allGenders} setAllGenders={setAllGenders}
          approved={approved} setApproved={setApproved}
          pending={pending} setPending={setPending}
          allStatus={allStatus} setAllStatus={setAllStatus} />
      </div>
    </div>
  );
};

export default AdminFilterBar;