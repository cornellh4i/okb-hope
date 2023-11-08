import chevron_down from "@/assets/chevron_down";
import { useState } from "react";
import SearchBarAdmin from '../SearchBarAdmin';

const FilterBar = () => {
    const ageGroups = ["Below 19", "20-30", "30-40", "40-50", "Over 50"];
    const genders = ["Male", "Female"];
    const conditions = ["N/A", "Test"];
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (newSearchTerm: string) => {
        setSearchTerm(newSearchTerm);
    };

    const filter = () => {
        console.log("Filter successful");
    }

    return (
        <div className="flex flex-row justify-center items-center gap-2 mx-36">
            <div className="Search Name or Title">

                <SearchBarAdmin onSearch={handleSearch} />
            </div>

            <div className="h-12 px-6 py-3 bg-white rounded-lg border border-zinc-600 justify-between items-center inline-flex">
                <div className="dropdown">
                    <label tabIndex={0} className="text-neutral-400 flex gap-16 m-1 text-base font-normal">Age Group{chevron_down}</label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        {ageGroups.map((e) => <li key={e}>{e}</li>)}
                    </ul>
                </div>
            </div>

            <div className="h-12 px-6 py-3 bg-white rounded-lg border border-zinc-600 justify-between items-center inline-flex">
                <div className="dropdown">
                    <label tabIndex={0} className="text-neutral-400 flex gap-16 m-1 text-base font-normal">Gender{chevron_down}</label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        {genders.map((e) => <li key={e}>{e}</li>)}
                    </ul>
                </div>
            </div>

            <div className="h-12 px-6 py-3 bg-white rounded-lg border border-zinc-600 justify-between items-center inline-flex">
                <div className="dropdown">
                    <label tabIndex={0} className="text-neutral-400 flex gap-16 m-1 text-base font-normal">Conditions{chevron_down}</label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        {conditions.map((e) => <li key={e}>{e}</li>)}
                    </ul>
                </div>
            </div>

            <button className="px-8 py-3 bg-white rounded-2xl border border-sky-700 justify-center items-center gap-2.5 inline-flex" onClick={filter}>
                <div className="text-sky-700 text-base font-bold text-center">Filter</div>
            </button>
        </div>
    );
}

export default FilterBar;
