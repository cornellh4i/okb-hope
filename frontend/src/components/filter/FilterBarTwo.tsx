/** eslint-disable */
import { useState } from 'react';
import chevron_down from "@/assets/chevron_down";
import SearchBarAdmin from '../SearchBarAdmin';


const FilterBarTwo = () => {
    // Search Bar
    const [searchTerm, setSearchTerm] = useState("");
    const handleSearch = (newSearchTerm: string) => {
        setSearchTerm(newSearchTerm);
    };
    // Options for dropdown menu
    const weeklyAvailability = ["Monday", "Tuesday"]
    const language = ["English"]
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
            <div className="Search Name or Title">
                <SearchBarAdmin onSearch={(handleSearch)} />
            </div>
            {/* <input type="text" placeholder="Search Name" onChange={handleSearch} className="btn btn-sm border border-solid bg-white text-gray-500 italic text-left normal-case hover:bg-white" /> */}

            <div className="dropdown">
                <label tabIndex={0} className="btn btn-sm flex gap-16 m-1 border border-solid bg-white text-gray-500 italic normal-case">Weekly Availability {chevron_down}</label>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52" style={{ width: '210px', height: '36px', left: '436px', borderRadius: '8px', borderWidth: '1px', borderStyle: 'solid', borderColor: '#5F5F5F', justifyContent: 'space-between', padding: '8px 16px', backgroundColor: '#FFFDFD', color: '#5F5F5F' }}>
                    {weeklyAvailability.map((e) => <li>{e}</li>)}
                </ul>
            </div>
            <div className="dropdown">
                <label tabIndex={0} className="btn btn-sm flex gap-16 m-1 border border-solid bg-white text-gray-500 italic normal-case">Language {chevron_down}</label>
                <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                    style={{
                        display: 'flex',
                        width: '210px',
                        height: '36px',
                        padding: '8px 16px',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexShrink: 0,
                        borderRadius: '8px',
                        border: '1px solid var(--dark-grey, #5F5F5F)',
                        background: 'var(--white, #FFFDFD)',
                        color: 'var(--med-gray, #9A9A9A)',
                        fontFamily: 'Montserrat',
                        fontSize: '12px',
                        fontStyle: 'italic',
                        fontWeight: '400',
                        lineHeight: 'normal',
                    }}
                >
                    {language.map((e) => <li>{e}</li>)}
                </ul>
            </div>
            <div className="dropdown">
                <label tabIndex={0} className="btn btn-sm flex gap-16 m-1 border border-solid bg-white text-gray-500 italic normal-case">Gender {chevron_down}</label>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                    style={{
                        display: 'flex',
                        width: '210px',
                        height: '36px',
                        padding: '8px 16px',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexShrink: 0,
                        borderRadius: '8px',
                        border: '1px solid var(--dark-grey, #5F5F5F)',
                        background: 'var(--white, #FFFDFD)',
                        color: 'var(--med-gray, #9A9A9A)',
                        fontFamily: 'Montserrat',
                        fontSize: '12px',
                        fontStyle: 'italic',
                        fontWeight: '400',
                        lineHeight: 'normal',
                    }}
                >
                    {genders.map((e) => <li>{e}</li>)}
                </ul>
            </div>
            <button
                style={{
                    borderRadius: '10px',
                    border: '1px solid var(--OKB-Blue, #195BA5)',
                    background: 'var(--white, #FFFDFD)',
                    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                    display: 'flex',
                    padding: '10px 46px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                }}
                className="btn flex flex-row justify-center items-center gap-2.5 rounded-xl bg-[#DEDEDE] normal-case text-gray-500 text-lg border-none px-14" onClick={filter}
            >
                <span
                    style={{
                        width: '34px',
                        height: '16px',
                        color: 'var(--OKB-Blue, #195BA5)',
                        fontFamily: 'Montserrat',
                        fontSize: '12px',
                        fontStyle: 'normal',
                        fontWeight: '700',
                        lineHeight: 'normal',
                    }}
                >
                    Filter
                </span>
            </button>
        </div>
    )
}

export default FilterBarTwo;