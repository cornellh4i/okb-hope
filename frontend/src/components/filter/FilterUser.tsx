/** eslint-disable */

import { useEffect, useState } from "react";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import chevron_left from "@/assets/chevron_left";
import chevron_right from "@/assets/chevron_right";
import FilterBar from "./FilterBar";

import FilterUserTable from "./FilterUserTable";
import FilterBarTwo from "./FilterBarTwo";

export interface UserType {
    active: Timestamp;
    created: Timestamp;
    name: string;
    patient: boolean;
    username: string;
    id: string;
}

const FilterUser = () => {
    /**
     * Controls the view of users, separated by patients and psychiatrists. 
     * patientView is true if we are on the patient view and false if we 
     * are on the psychiatrist view.
     */
    const [patientView, setPatientView] = useState<boolean>(true);
    const [userData, setUserData] = useState<UserType[]>([]);
    // Records for selected tab based on patientView
    const tabData = userData.filter(u => (u.patient === patientView));
    // User is currently on this page
    const [currentPage, setCurrentPage] = useState(1);

    // Number of records to be displayed on each page   
    const recordsPerPage = 10;
    // const [recordsPerPage, setRecordsPerPage] = useState(10);
    // Index of the last record on the current page
    const indexOfLastRecord = currentPage * recordsPerPage;
    // Index of the first record on the current page
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

    // Records to be displayed on the current page filtered based on patientView
    const currentRecords = tabData.slice(indexOfFirstRecord, indexOfLastRecord);
    // The total number of pages
    const numPages = tabData.length === 0 ? 1 : Math.ceil(tabData.length / recordsPerPage)

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

    /**
     * Retrieves all the users from firebase collection. Separates them into
     * patients and psychiatrists. Re-rendered only on firebase change. 
     */
    const userRef = collection(db, "users");

    useEffect(() => {
        async function fetchUsers() {
            const userSnapshot = await getDocs(userRef);
            const users: UserType[] = userSnapshot.docs.map((doc) => (
                { ...doc.data(), id: doc.id } as UserType)
            );
            setUserData(users);
        }
        fetchUsers()

    }, [userRef]);

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

                {/* Conditional rendering based on setPatientView */}
                {patientView ? <FilterBar /> : <FilterBarTwo />}

            </div>
            {/* Need to change this to the length of the query rather than just userData */}
            <div className="text-lg font-bold ml-4">{tabData.length} results</div>
            <FilterUserTable currentRecords={currentRecords} />
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


export default FilterUser;