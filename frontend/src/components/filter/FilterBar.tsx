export default function FilterBar() {
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
            <div className="flex flex-row justify-between items-center p-0 gap-1 order-none grow-0 w-32">Filter By </div>
            <input type="text" placeholder="Search Name" className="input w-full max-w-xs" />
            <div className="dropdown">
                <label tabIndex={0} className="btn m-1">Age Group</label>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    {ageGroups.map((e) => <li><a>{e}</a></li>)}
                </ul>
            </div>
            <div className="dropdown">
                <label tabIndex={0} className="btn m-1">Gender</label>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    {genders.map((e) => <li><a>{e}</a></li>)}
                </ul>
            </div>
            <div className="dropdown">
                <label tabIndex={0} className="btn m-1">Conditions</label>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a>Item 1</a></li>
                    <li><a>Item 2</a></li>
                </ul>
            </div>
            <button className="btn flex flex-row justify-center items-center gap-2.5 rounded-xl bg-[#DEDEDE]" onClick={filter}>
                Filter
            </button>
        </div>
    )
}