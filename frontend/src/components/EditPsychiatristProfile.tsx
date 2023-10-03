import React, {useState} from 'react';
import Link from "next/link";
import chevron_down from "@/assets/chevron_down";
import colors from "@/colors";

const EditPsychiatristProfile = ({psychiatrist}) => {
  const {firstName, lastName} = psychiatrist;
  const language = ["English","Ga","Twi","Hausa"]
  const genders = ["Male", "Female", "Other"]

  const [selectedGender, setSelectedGender] = useState('');
  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
  }
  
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  
  ;
  
  return (
    <div className="flex justify-center">
      <div className="card w-2/3">
        <div className="card-body">
          <text className="card-title font-montserrat text-4xl">Edit Profile</text>
          {/* Text input fields */}

<div className="flex flex-row justify-between">
            {/* First Name */}
            <div className="form-control w-1/2 mr-10">
              <label className="label">
                <span className="text-lg">First Name (Required)</span>
              </label>
              <input type="text" placeholder="Type here" className={`input input-bordered w-full border-[${colors.light_blue}] border-2`} />
            </div>

            {/* Last Name */}
            <div className="form-control w-1/2 pr-0">
              <label className="label">
                <span className="text-lg">Last Name (Required)</span>
              </label>
              <input type="text" placeholder="Type here" className="input input-bordered w-full border-2" />
            </div>
            </div>

            <div className="form-control w-full h-96 flex">
              <label className="label">
                <span className="text-lg">Profile Image (Required)</span>
              </label>
              <div className="flex items-center justify-center">
              
              </div>
              <input type="file" placeholder="image/" className="input input-bordered w-full h-96 border-2" />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="text-lg">Current Position (Required)</span>
              </label>
              <input type="text" placeholder="Type here" className="input input-bordered w-full border-2" />
            </div>

            <div className="dropdown dropdown-bottom">
              <div tabIndex={0} className="form-control w-full">
                <label className="label">
                  <span className="text-lg">Languages Spoken (Required)</span>
                </label>
                <div className="input-icon">
                  <span>{chevron_down}</span>

                  <input type="text" placeholder="Select" className="input input-bordered w-full" disabled/>
                  
                </div>
              </div>
              <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-full">
                {language.map((e) => <label key={e} className="label cursor-pointer">
                    <span className="label-text">{e}</span>
                    <input
                      type="checkbox"
                      className="checkbox"
                      value={e}
                      // checked={selectedGenders.includes(gender)}
                      // onChange={handleCheckboxChange}
                    />
                  </label>)}
              </ul>
            </div>

            <div className="dropdown dropdown-bottom">
              <div tabIndex={0} className="form-control w-full">
                <label className="label">
                  <span className="text-lg">Gender (Required) {chevron_down}</span>
                </label>
                <input type="text" placeholder="Select" className="input input-bordered w-full" disabled/>
              </div>
              <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-full">
              {genders.map((gender) => (
                <li key={gender} onClick={() => handleGenderChange(gender)} className={`${
                  selectedGender === gender ? 'bg-primary' : ''
                } cursor-pointer`}
              >
                {gender}
                </li>))}
              </ul>
            </div>

          <div className="card-actions justify-end">
            <Link href="/psych_profile">
            <button className="btn btn-outline">Cancel</button>
            </Link>
            
            <button className={`btn bg-${colors.light_blue}`}>Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditPsychiatristProfile;