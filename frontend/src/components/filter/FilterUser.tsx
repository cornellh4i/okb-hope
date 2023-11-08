import { useEffect, useState } from "react";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import chevron_left from "@/assets/chevron_left";
import chevron_right from "@/assets/chevron_right";
import FilterBar from "./FilterBar";

import FilterUserTable from "./FilterUserTable";
import FilterBarTwo from "./FilterBarTwo";
import FilterCard from "./FilterCard";

export interface UserType {
    active: Timestamp;
    created: Timestamp;
    name: string;
    patient: boolean;
    username: string;
    id: string;
}

const FilterUser = () => {
    const [patientView, setPatientView] = useState<boolean>(true);
    const [userData, setUserData] = useState<UserType[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const [numPages, setNumPages] = useState(1);

    useEffect(() => {
        async function fetchUsers() {
            const userSnapshot = await getDocs(collection(db, "users"));
            const users: UserType[] = userSnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            } as UserType));
            setUserData(users);


            // Calculate the number of pages based on all user records
            setNumPages(Math.ceil(users.length / recordsPerPage));
        }
        fetchUsers();
    }, [recordsPerPage]);

    // Pagination logic to calculate currentRecords based on currentPage
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = userData.slice(indexOfFirstRecord, indexOfLastRecord);
    const nextPage = () => {
        if (currentPage < numPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleDeleteUser = (userId) => {
        // Update the user data in the state
        setUserData((prevUserData) => prevUserData.filter((user) => user.id !== userId));
        window.location.reload();
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="mt-5 mb-5 ml-36">
                <button
                    className={`tab tab-bordered ${patientView ? "tab-active text-blue-800 border-b-4" : "text-blue-500 border-b-2"} text-3xl`}
                    onClick={() => setPatientView(true)}
                >
                    Clients
                </button>
                <button
                    className={`tab tab-bordered ${patientView ? "text-blue-500 border-b-2" : "tab-active text-blue-800 border-b-4"} text-3xl`}
                    onClick={() => setPatientView(false)}
                >
                    Psychiatrists
                </button>

            </div>
            {/* Conditional rendering based on setPatientView */}
            {patientView ? <FilterBar /> : <FilterBarTwo />}
            <FilterUserTable currentRecords={currentRecords} onDelete={handleDeleteUser} />
            <div className="pagination flex items-center m-auto">
                <div className="flex mb-5">
                    <button className="" onClick={prevPage}>
                        {chevron_left}
                    </button>
                    <div className="border-2 border-solid border-gray-300 px-6">{currentPage}</div>
                    <button className="" onClick={nextPage}>
                        {chevron_right}
                    </button>
                </div>
                <div className="mb-5">Page {currentPage} of {numPages}</div>
            </div>
        </div>
    );
};

export default FilterUser;
