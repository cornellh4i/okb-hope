import React from 'react';
import chevron_down from "@/assets/chevron_down";

const EditPsychiatristProfile = () => {
  const language = ["English","Ga","Twi","Hausa"]
  const genders = ["Male", "Female", "Other"]
  
  return (
    <div className="flex justify-center">
      <div className="card w-2/3">
        <div className="card-body">
          <text className="card-title text-4xl">Edit Profile</text>
          {/* Text input fields */}

<div className="flex flex-row">
            {/* First Name */}
            <div className="form-control w-1/2 pl-0">
              <label className="label">
                <span className="text-lg">First Name (Required)</span>
              </label>
              <input type="text" placeholder="Type here" className="input input-bordered w-full pl-0 border-2" />
            </div>

            {/* Last Name */}
            <div className="form-control w-1/2 pr-0">
              <label className="label">
                <span className="text-lg">Last Name (Required)</span>
              </label>
              <input type="text" placeholder="Type here" className="input input-bordered w-full pr-0 border-2" />
            </div>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="text-lg">Profile Image (Required)</span>
              </label>
              <input type="file" placeholder="image/" className="input input-bordered w-full" />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="text-lg">Current Position (Required)</span>
              </label>
              <input type="text" placeholder="Type here" className="input input-bordered w-full" />
            </div>

            <div className="dropdown dropdown-bottom">
              <div tabIndex={0} className="form-control w-full">
                <label className="label">
                  <span className="text-lg">Languages Spoken (Required) {chevron_down}</span>
                </label>
                <input type="text" placeholder="Select" className="input input-bordered w-full" disabled/>
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
              {genders.map((e) => <li>{e}</li>)}
              </ul>
            </div>

          <div className="card-actions justify-end">
            <button className="btn btn-outline">Cancel</button>
            <button className="btn">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditPsychiatristProfile;