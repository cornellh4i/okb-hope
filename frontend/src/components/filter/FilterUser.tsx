import { useEffect, useState } from "react";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import chevron_left from "@/assets/chevron_left";
import chevron_right from "@/assets/chevron_right";
import FilterBar from "./FilterBar";

import FilterUserTable from "./FilterUserTable";
import FilterBarTwo from "./FilterBarTwo";
import FilterCard from "./FilterCard";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";

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
    const [clientView, setClientView] = useState(true);
    const [psychiatristView, setPsychiatristView] = useState(false);
    const [userData, setUserData] = useState<UserType[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const [numPages, setNumPages] = useState(1);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

    useEffect(() => {
        async function fetchUsers() {
            const userSnapshot = await getDocs(collection(db, "users"));
            const users: UserType[] = userSnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    ...data,
                    id: doc.id,
                } as UserType;
            });
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

    const handleSelectedUsers = (users) => {
        setSelectedUsers(users);
    };

    const handleClick = () => {
        setPatientView((prevPatientView) => !prevPatientView);
      };

    const handleClientClick = () => {
    setClientView(true);
    setPsychiatristView((prev) => !prev); // Toggle the state of the second button
    };

    const handlePsychiatristClick = () => {
    setClientView((prev) => !prev); // Toggle the state of the first button
    setPsychiatristView(true);
    };  


    return (
        <div className="flex flex-col gap-8">
            <div className="mt-5 mb-5 ml-36">
            <button
                className={`tab relative ${
                    clientView ? "text-sky-700 border-b-2 border-sky-700" : "text-slate-300 border-b-2 border-slate-300"
                } text-3xl`}
                onClick={handleClientClick}
            >
                    <span className="relative z-10 ">Clients</span>
                    {/* <span
                        className={`block absolute left-0 bottom-0 w-full h-0.5 ${
                        clientView ? "bg-sky-700" : "bg-slate-300"
                        } transition-transform transform origin-bottom scale-x-2 group-hover:scale-x-100`}
                    ></span> */}
                </button>

                <button
                    className={`tab tab-bordered relative ${
                        psychiatristView ? "text-sky-700 border-b-2 border-sky-700" : "text-slate-300 border-b-2 border-slate-300"
                    } text-3xl`}
                    onClick={handlePsychiatristClick}
                >
                    <span className="relative z-10">Psychiatrists</span>
                    {/* <span
                        className={`block absolute left-0 bottom-0 w-full h-0.5 ${
                        psychiatristView ? "bg-sky-700" : "bg-slate-300"
                        } transition-transform transform origin-bottom scale-x-2 group-hover:scale-x-100`}
                    ></span> */}
                </button>
            </div>
            {clientView ? <FilterBar onDelete={handleDeleteUser} userList={selectedUsers} /> : <FilterBarTwo onDelete={handleDeleteUser} userList={selectedUsers} />}
            <FilterUserTable currentRecords={currentRecords} onDelete={handleDeleteUser} selectedUsers={(users) => handleSelectedUsers(users)} />
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
