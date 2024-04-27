import ChevronDown from '@/assets/chevron_down';
import { useState } from "react";
import SearchBarAdmin from '../SearchBarAdmin';
import Trash from '@/assets/trash.svg';
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import FilterModal from "./FilterModal"
import okb_colors from '@/colors';

const FilterBar = ({ onDelete, userList }) => {
    const ageGroups = ["Below 19", "20-30", "30-40", "40-50", "Over 50"];
    const genders = ["Male", "Female"];
    const conditions = ["N/A", "Test"];
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleSearch = (newSearchTerm: string) => {
        setSearchTerm(newSearchTerm);
    };

    const filter = () => {
        console.log("Filter successful");
    }

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
        <div className="flex flex-row justify-center items-center gap-2 mx-36">
            <div className="Search Name or Title">
                <SearchBarAdmin onSearch={handleSearch} />
            </div>

            <div className="h-12 px-6 py-3 bg-white rounded-lg border border-zinc-600 justify-between items-center inline-flex">
                <div className="dropdown">
                    <label tabIndex={0} className="text-neutral-400 flex gap-25 m-1 text-base font-normal">Age Group<ChevronDown color={okb_colors.med_gray} /></label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        {ageGroups.map((e) => <li key={e}>{e}</li>)}
                    </ul>
                </div>
            </div>

            <div className="h-12 px-6 py-3 bg-white rounded-lg border border-zinc-600 justify-between items-center inline-flex">
                <div className="dropdown">
                    <label tabIndex={0} className="text-neutral-400 flex gap-5 m-1 text-base font-normal">Gender<ChevronDown color={okb_colors.med_gray} /></label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        {genders.map((e) => <li key={e}>{e}</li>)}
                    </ul>
                </div>
            </div>

            <div className="h-12 px-6 py-3 bg-white rounded-lg border border-zinc-600 justify-between items-center inline-flex">
                <div className="dropdown">
                    <label tabIndex={0} className="text-neutral-400 flex gap-5 m-1 text-base font-normal">Conditions<ChevronDown color={okb_colors.med_gray} /></label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        {conditions.map((e) => <li key={e}>{e}</li>)}
                    </ul>
                </div>
            </div>

            <button className="px-8 py-3 bg-white rounded-2xl border border-sky-700 justify-center items-center gap-2.5 inline-flex" onClick={filter}>
                <div className="text-sky-700 text-base font-bold text-center">Filter</div>
            </button>
            <figure className={`cursor-pointer`} onClick={openDeleteModal}>
                <Trash />
            </figure>

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

export default FilterBar;
