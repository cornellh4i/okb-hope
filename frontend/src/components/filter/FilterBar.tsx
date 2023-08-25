import chevron_left from "@/assets/chevron_left";
import chevron_right from "@/assets/chevron_right";
import chevron_down from "@/assets/chevron_down";

const FilterBar = () => {
    // Options for dropdown menu
    const ageGroups = ["Below 19", "20-30", "30-40", "40-50", "Over 50"]
    const genders = ["Male", "Female"]

    /**
     * Handles all the filter processing before the users are 
     * mapped onto the screen. 
     */
    const filter = () => {
        console.log("Filter successful");
    }

    return (
        <div className="flex flex-row justify-center items-center p-0 gap-2">
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

export default FilterBar;