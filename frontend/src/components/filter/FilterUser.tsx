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
            <div className="m-auto">
                <button
                    className={`tab tab-bordered ${patientView ? "tab-active" : ""}`}
                    onClick={() => setPatientView(true)}
                >
                    Patients
                </button>
                <button
                    className={`tab tab-bordered ${patientView ? "" : "tab-active"}`}
                    onClick={() => setPatientView(false)}
                >
                    Psychiatrists
                </button>

                {/* Conditional rendering based on setPatientView */}
                {patientView ? <FilterBar /> : <FilterBarTwo />}


            </div>
            <div className="text-lg font-bold ml-4">{userData.length} results</div>
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
