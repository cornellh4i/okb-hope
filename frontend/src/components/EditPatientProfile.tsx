import React from 'react';


const EditPatientProfile = () => {
  return (
    <div className="flex justify-center">
      <div className="card w-2/3">
        <div className="card-body">
          <text className="card-title text-4xl">Edit Profile</text>
          {/* Text input fields */}
            <div className="form-control w-full">
              <label className="label">
                <span className="text-lg">First Name (Required)</span>
              </label>
              <input type="text" placeholder="Type here" className="input input-bordered w-full" />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="text-lg">Last Name (Required)</span>
              </label>
              <input type="text" placeholder="Type here" className="input input-bordered w-full" />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="text-lg">Are there any specific concerns you would like to discuss with your counselor?</span>
              </label>
              <input type="text" placeholder="Type here" className="input input-bordered w-full" />
            </div>

            <div className="dropdown dropdown-bottom">
              <div tabIndex={0} className="form-control w-full">
                <label className="label">
                  <span className="text-lg">Have you spoken with a counselor/therapist before?</span>
                </label>
                <input type="text" placeholder="Select" className="input input-bordered w-full" disabled/>
              </div>
              <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-full">
                  <li><a>Yes</a></li>
                  <li><a>No</a></li>
              </ul>
            </div>

            <div className="dropdown dropdown-bottom">
              <div tabIndex={0} className="form-control w-full">
                <label className="label">
                  <span className="text-lg">When was the last time you spoke to one?</span>
                </label>
                <input type="text" placeholder="Select" className="input input-bordered w-full" disabled/>
              </div>
              <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-full">
                  <li><a>Within the last month</a></li>
                  <li><a>Within the last 6 months</a></li>
                  <li><a>Within the last year</a></li>
                  <li><a>Over a year ago</a></li>
                  <li><a>I have never spoken with a counselor/therapist before.</a></li>
              </ul>
            </div>

            <div className="dropdown dropdown-bottom">
              <div tabIndex={0} className="form-control w-full">
                <label className="label">
                  <span className="text-lg">What is your age?</span>
                </label>
                <input type="text" placeholder="Select" className="input input-bordered w-full" disabled/>
              </div>
              <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-full">
                  <li><a>18-24</a></li>
                  <li><a>25-34</a></li>
                  <li><a>35-44</a></li>
                  <li><a>45-54</a></li>
                  <li><a>55-64</a></li>
                  <li><a>65 and over</a></li>
              </ul>
            </div>

            <div className="dropdown dropdown-bottom">
              <div tabIndex={0} className="form-control w-full">
                <label className="label">
                  <span className="text-lg">What is your preferred language?</span>
                </label>
                <input type="text" placeholder="Select" className="input input-bordered w-full" disabled/>
              </div>
              <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-full">
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">English</span>
                    <input type="checkbox" className="checkbox" />
                  </label>
                  <label className="label cursor-pointer">
                    <span className="label-text">Ga</span>
                    <input type="checkbox" className="checkbox" />
                  </label>
                  <label className="label cursor-pointer">
                    <span className="label-text">Twi</span>
                    <input type="checkbox" className="checkbox" />
                  </label>
                  <label className="label cursor-pointer">
                    <span className="label-text">Hausa</span>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </div>
              </ul>
            </div>

            <div className="dropdown dropdown-bottom">
              <div tabIndex={0} className="form-control w-full">
                <label className="label">
                  <span className="text-lg">What kind of counselor do you want to speak with?</span>
                </label>
                <input type="text" placeholder="Select" className="input input-bordered w-full" disabled/>
              </div>
              <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-full">
                  <li><a>Male</a></li>
                  <li><a>Female</a></li>
                  <li><a>No preference</a></li>
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

export default EditPatientProfile;