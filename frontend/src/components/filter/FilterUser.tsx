import { useEffect, useState } from "react";
import { collection, deleteDoc, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import FilterCard from "./FilterCard";
import chevron_left from "@/Assets/chevron_left";
import chevron_right from "@/Assets/chevron_right";
import chevron_down from "@/Assets/chevron_down";


interface UserType {
    active: Timestamp;
    created: Timestamp;
    name: string;
    patient: boolean;
    username: string;
    id: string;
}

export default function FilterUser() {
    /**
     * Controls the view of users, separated by patients and psychiatrists. 
     * patientView is true if we are on the patient view and false if we 
     * are on the psychiatrist view.
     */
    const [patientView, setPatientView] = useState<boolean>(true);
    const [userData, setUserData] = useState<UserType[]>([]);
    // User is currently on this page
    const [currentPage, setCurrentPage] = useState(1);

    // Number of records to be displayed on each page   
    const recordsPerPage = 2;
    // Index of the last record on the current page
    const indexOfLastRecord = currentPage * recordsPerPage;
    // Index of the first record on the current page
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

    // Records to be displayed on the current page filtered based on patientView
    const currentRecords = userData.filter(u => (u.patient == patientView)).slice(indexOfFirstRecord, indexOfLastRecord);
    // The total number of pages
    const numPages = Math.ceil(userData.length / recordsPerPage)

    /** nextPage moves forward the index of the current page. */
    const nextPage = () => {
        if (currentPage !== numPages)
            setCurrentPage(currentPage + 1)
    }
    /** prevPage moves back the index of the current page. */
    const prevPage = () => {
        if (currentPage !== 1)
            setCurrentPage(currentPage - 1)
    }

    const ageGroups = ["Below 19", "20-30", "30-40", "40-50", "Over 50"]
    const genders = ["Male", "Female"]

    /**
     * Retrieves all the users from firebase collection. Separates them into
     * patients and psychiatrists. Re-rendered only on page refresh. 
     */
    const userRef = collection(db, "Users");

    useEffect(() => {
        async function fetchUsers() {
            const userSnapshot = await getDocs(userRef);
            const users: UserType[] = userSnapshot.docs.map((doc) => (
                { ...doc.data(), id: doc.id } as UserType)
            );
            setUserData(users);
        };
        fetchUsers()

    }, []);

    /**
     * Handles all the filter processing before the users are 
     * mapped onto the screen. 
     */
    const filter = () => {
        console.log("Filter successful");
    }

    const FilterBar = () => {
        return (
            <div className="flex flex-row justify-center items-center p-0 gap-2">
                <div className="flex flex-row justify-between items-center p-0 gap-1 order-none grow-0 w-32 font-bold text-2xl text-gray-500">Filter By</div>
                <input type="text" placeholder="Search Name" className="btn btn-sm border border-solid bg-white text-gray-500 italic text-left normal-case hover:bg-white" />
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-sm flex gap-16 m-1 border border-solid bg-white text-gray-500 italic normal-case">Age Group {chevron_down}</label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        {ageGroups.map((e) => <li><a>{e}</a></li>)}
                    </ul>
                </div>
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-sm flex gap-16 m-1 border border-solid bg-white text-gray-500 italic normal-case">Gender {chevron_down}</label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        {genders.map((e) => <li><a>{e}</a></li>)}
                    </ul>
                </div>
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-sm flex gap-16 m-1 border border-solid bg-white text-gray-500 italic normal-case">Conditions {chevron_down}</label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li>
                    </ul>
                </div>
                <button className="btn flex flex-row justify-center items-center gap-2.5 rounded-xl bg-[#DEDEDE] normal-case text-gray-500 text-lg border-none px-14" onClick={filter}>
                    Filter
                </button>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="m-auto">
                <button
                    className={`tab tab-bordered ${patientView ? 'tab-active' : ''}`}
                    onClick={() => setPatientView(true)}
                >Patients</button>
                <button
                    className={`tab tab-bordered ${patientView ? '' : 'tab-active'}`}
                    onClick={() => setPatientView(false)}
                >Psychiatrists</button>
            </div>
            <FilterBar />
            {/* Need to change this to the length of the query rather than just userData */}
            <div className="text-lg font-bold ml-4">{currentRecords.length} results</div>
            <div>
                {currentRecords && currentRecords.map(user => (
                    <FilterCard
                        key={user.id}
                        name={user.name}
                        username={user.username}
                        created={user.created.toDate().toDateString()}
                        active={user.active.toDate().toDateString()}
                    />
                ))}
            </div>
            <div className="pagination flex items-center m-auto">
                <div className="flex">
                    <button className="" onClick={prevPage}>{chevron_left}</button>
                    <div className="border-2 border-solid border-gray-300 px-6">{currentPage}</div>
                    <button className="" onClick={nextPage}>{chevron_right}</button>
                </div>
                <div>Page {currentPage} of {numPages}</div>
            </div>
        </div>
    )
}
