import chevron_down from "@/assets/chevron_down";
import { useState, useMemo, useEffect } from 'react';
import AdminSearchBarPatients from './adminSearchBarPatients';
import Trash from '@/assets/trash.svg';
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import FilterModal from "./FilterModal";
import Fuse from 'fuse.js';
import { IAvailability, IPsychiatrist, IPatient } from '@/schema';
import colors from "@/colors";
import { collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { fetchAllProfessionals, fetchAvailability, fetchAllPatients } from '../../../firebase/fetchData';
// import PsychiatristList from '@/components/psychiatrists/PsychiatristList';
import { useAuth } from '../../../contexts/AuthContext';

interface SearchBarPatientProps {
  onDelete;
  userList;
  setFilteredPatients;
  setSubmittedFiltersLength
}

const AdminFilterBarPatients: React.FC<SearchBarPatientProps> = ({ onDelete, userList, setFilteredPatients, setSubmittedFiltersLength }) => {
  const router = useRouter();
  const { user } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState("");
  const [filters, setFilters] = useState([]);
  const [submittedFilters, setSubmittedFilters] = useState({});
  const [eighteen, setEighteen] = useState(false);
  const [twentyfive, setTwentyfive] = useState(false);
  const [thirtyfive, setThirtyfive] = useState(false);
  const [fourtyfive, setFourtyfive] = useState(false);
  const [fiftyfive, setFiftyfive] = useState(false);
  const [sixtyfive, setSixtyfive] = useState(false);
  const [allAgeRanges, setAllAgeRanges] = useState(false);

  const [male, setMale] = useState(false);
  const [female, setFemale] = useState(false);
  const [otherGender, setOtherGender] = useState(false);
  const [allGenders, setAllGenders] = useState(false);

  const [relationship, setRelationship] = useState(false);
  const [addiction, setAddiction] = useState(false);
  const [suicidal, setSuicidal] = useState(false);
  const [family, setFamily] = useState(false);
  const [substance, setSubstance] = useState(false);
  const [academic, setAcademic] = useState(false);
  const [social, setSocial] = useState(false);
  const [depression, setDepression] = useState(false);
  const [other, setOther] = useState(false);
  const [allConcerns, setAllConcerns] = useState(false);

  const [patients, setPatients] = useState<IPatient[]>([]);

  // const ageGroups = ["Below 19", "20-30", "30-40", "40-50", "Over 50"];
  // const genders = ["Male", "Female"];
  // const conditions = ["N/A", "Test"];

  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  //finds total length of submittedFilters
  useEffect(() => {
    // Calculate the total length of arrays in submittedFilters
    let totalLength = Object.values(submittedFilters)
      .filter((value): value is any[] => Array.isArray(value)) // Type guard to filter array values
      .reduce((sum, arr) => sum + arr.length, 0);

    if (searchTerm !== '') {
      totalLength += 1;
    }
    // Set the total length
    setSubmittedFiltersLength(totalLength);
  }, [submittedFilters]);

  // Get all patients from the database
  useEffect(() => {
    async function fetchData() {
      try {
        if (user) {
          const fetchedPatients: IPatient[] = await fetchAllPatients();
          setPatients(fetchedPatients);
          setFilteredPatients(fetchedPatients);
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
          const fetchedPatients: IPatient[] = await fetchAllPatients();
          setPatients(fetchedPatients);
        }
      } catch (err: any) {
        console.error(err.message);
      }
    }
    fetchData();
  }, [submittedFilters, submittedSearchTerm]);

  // const fuse = useMemo(() => new Fuse(psychiatrists, fuseOptions), []);

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

  const matchesTerm = (patient: any, term: string) => {
    return patient.firstName?.toLowerCase().includes(term.toLowerCase()) ||
      patient.lastName?.toLowerCase().includes(term.toLowerCase())
  };

  // Filters psychiatrists by search and/or selected filters
  const processSearchFilter = () => {
    const terms = submittedSearchTerm.trim().split(/\s+/);
    let results = patients;

    // Updates result by search term (first names, last names, and/or titles)
    // Handles searches with three terms
    if (terms.length > 0) {
      results = patients.filter((patients) =>
        terms.some((term) => matchesTerm(patients, term))
      );
    };

    // Updates results by the selected filters
    const filterResults = results.filter((patient) => {
      return (
        containsOneOf([patient.ageRange], submittedFilters['ageRange']) &&
        containsGender([patient.gender], submittedFilters['genders']) &&
        containsOneOf(patient.concerns, submittedFilters['concerns']));
    });

    return filterResults;
  };

  // const resetSearchBar = () => {
  //   setSearchTerm("")
  //   setSubmittedSearchTerm("")
  //   setFilters([])
  //   setSubmittedFilters({})
  // }

  var searchFilterResults = submittedSearchTerm !== "" || submittedFilters ? processSearchFilter() : patients;

  useEffect(() => {
    // If there is a search term or there are filters selected, process the search/filter
    // Else, return all psychiatrists
    searchFilterResults = submittedSearchTerm !== "" || submittedFilters ? processSearchFilter() : patients;
    if (searchFilterResults.length >= 0) {
      setFilteredPatients(searchFilterResults);
    }
  }, [submittedFilters, submittedSearchTerm])

  async function deleteUsers(userIds: string[]) {
    for (const uid of userIds) {
      await deleteDoc(doc(db, "users", uid));
    }
  }

  const handleDeleteUsers = async () => {
    try {
      await deleteUsers(userList);
      onDelete(selectedUserIds);
      setSelectedUserIds([]);
    } catch (error) {
      console.error("Error deleting users:", error);
    }
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };


  return (
    <div className={'flex flex-col mb-20 md:mb-6 lg:mb-0'}>
      <div className='flex justify-center md:pb-8 lg:pb-8'>
        <AdminSearchBarPatients searchTerm={searchTerm} setSearchTerm={setSearchTerm}
          submittedSearchTerm={submittedSearchTerm} setSubmittedSearchTerm={setSubmittedSearchTerm}
          filters={filters} setFilters={setFilters}
          submittedFilters={submittedFilters} setSubmittedFilters={setSubmittedFilters}
          eighteen={eighteen} setEighteen={setEighteen} twentyfive={twentyfive} setTwentyfive={setTwentyfive}
          thirtyfive={thirtyfive} setThirtyfive={setThirtyfive} fourtyfive={fourtyfive}
          setFourtyfive={setFourtyfive} fiftyfive={fiftyfive} setFiftyfive={setFiftyfive}
          sixtyfive={sixtyfive} setSixtyfive={setSixtyfive}
          allAgeRanges={allAgeRanges} setAllAgeRanges={setAllAgeRanges}
          male={male} setMale={setMale}
          female={female} setFemale={setFemale}
          otherGender={otherGender} setOtherGender={setOtherGender}
          allGenders={allGenders} setAllGenders={setAllGenders}
          relationship={relationship} setRelationship={setRelationship}
          addiction={addiction} setAddiction={setAddiction}
          suicidal={suicidal} setSuicidal={setSuicidal}
          family={family} setFamily={setFamily}
          substance={substance} setSubstance={setSubstance}
          academic={academic} setAcademic={setAcademic}
          social={social} setSocial={setSocial}
          depression={depression} setDepression={setDepression}
          other={other} setOther={setOther}
          allConcerns={allConcerns} setAllConcerns={setAllConcerns}
          openDeleteModal={openDeleteModal} />
      </div>

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-50 bg-white p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Are you sure?</h2>
            <p className="text-gray-600 mb-2">Deleting a user is an action that cannot be undone.</p>
            <p className="text-gray-600 mb-4">To confirm that you want to remove the selected users, click the delete below.</p>
            <div className="flex justify-center">
              <button
                className="bg-gray-400 text-white px-4 py-2 mr-2 rounded"
                onClick={closeDeleteModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleDeleteUsers}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )
      }
    </div >
  );
}

export default AdminFilterBarPatients;
