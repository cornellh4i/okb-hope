import { useState } from 'react';
import chevron_down from "@/assets/chevron_down";
import SearchBarAdmin from '../SearchBarAdmin';

const FilterBarTwo = () => {
    const weeklyAvailability = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const language = ["English", "Ga", "Twi", "Hausa"];
    const genders = ["Male", "Female"];
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
                    <label tabIndex={0} className="text-neutral-400 flex gap-16 m-1 text-base font-normal">Weekly Availability{chevron_down}</label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        {weeklyAvailability.map((e) => <li key={e}>{e}</li>)}
                    </ul>
                </div>
            </div>

            <div className="h-12 px-6 py-3 bg-white rounded-lg border border-zinc-600 justify-between items-center inline-flex">
                <div className="dropdown">
                    <label tabIndex={0} className="text-neutral-400 flex gap-16 m-1 text-base font-normal">Language{chevron_down}</label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        {language.map((e) => <li key={e}>{e}</li>)}
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

            <button className="px-8 py-3 bg-white rounded-2xl border border-sky-700 justify-center items-center gap-2.5 inline-flex" onClick={filter}>
                <div className="text-sky-700 text-base font-bold text-center">Filter</div>
            </button>
        </div>
    );
}

export default FilterBarTwo;
