/** eslint-disable */

import React, { useState } from 'react';
import { db, auth } from '../../firebase/firebase';
import { doc, setDoc } from "firebase/firestore";
import Link from "next/link";
import Chevron_down from "@/assets/chevron_down.svg";
import Vertical_line from "@/assets/vertical_line.svg";
import Upload from "@/assets/upload.svg";
import okb_colors from "@/colors";
import { IUser } from '@/schema';
import router from 'next/router';

const EditPatientProfile = () => {
  const uid = auth.currentUser?.uid;
  const spokenWithCounselor = ["Yes", "No"];
  const lastTimeSpoke = ["Within the last month", "Within the last 6 months", "Within the last year", "Over a year ago", "I have never spoken with a counselor/therapist before"];
  const ageRange = ["18-22", "25-34", "35-44", "45-54", "55-64", "65 and over"];
  const languagesSpoken = ["English", "Ga", "Twi", "Hausa"];
  const preferredGender = ["Male", "Female"];

  const [selectedSpokenWithCounselor, setSelectedSpokenWithCounselor] = useState('');
  const handleSpokenWithCounselorChange = (s) => {
    setSelectedSpokenWithCounselor(s);
  }

  const [selectedLastTimeSpoke, setSelectedLastTimeSpoke] = useState('');
  const handleLastTimeSpokeChange = (s) => {
    setSelectedLastTimeSpoke(s);
  }

  const [selectedAge, setSelectedAge] = useState('');
  const handleAgeChange = (age) => {
    setSelectedAge(age);
  }

  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const handleLanguageChange = (language) => {
    const updatedLanguages = [...selectedLanguages];
    if (language.target.checked) {
      updatedLanguages.push(language.target.value);
    } else {
      const index = updatedLanguages.indexOf(language.target.value);
      if (index !== -1) {
        updatedLanguages.splice(index, 1);
      }
    }
    setSelectedLanguages(updatedLanguages);
  };
  const isLanguageChecked = (item) =>
    selectedLanguages.includes(item) ? true : false;

  const [selectedPreferredGender, setSelectedPreferredGender] = useState('');
  const handlePreferredGenderChange = (gender) => {
    setSelectedPreferredGender(gender);
  }

  {/* Initialize state to store updated data */ }
  const [updatedData, setUpdatedData] = useState({});

  const updateUserProfile = async (uid, updatedData) => {
    try {
      const docRef = doc(db, "users", uid); // Replace "users" with your collection name
      await setDoc(docRef, updatedData, { merge: true }); // Merge the data to update and retain existing values
      console.log("User profile updated successfully!");
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const handleSaveChanges = () => {
    // Call the update function with the UID and updated data
    updateUserProfile(uid, updatedData);
    router.push(`/${uid}/dashboard`);
  };

  const handleCancel = () => {
    router.push(`/${uid}/dashboard`);
  }

  return (
    <div className="flex justify-center">
      <div className="card w-2/3">
        <div className="card-body">
          <text className="card-title text-4xl">Edit Profile</text>
          {/* Text input fields */}
          <div className="flex flex-row justify-between">
            {/* First Name */}
            <div tabIndex={0} className="flex form-control w-1/2 mr-10">
              <div className="label-container">
                <label className="label">
                  <span className="text-lg">First Name (Required)</span>
                </label>
              </div>
              <div className="flex items-center">
                <Vertical_line className=""></Vertical_line>
                <input type="text" placeholder="Type here" className={`input input-bordered w-full border-2 ml-3`} style={{ borderColor: okb_colors.light_blue }} />
              </div>
            </div>

            {/* Last Name */}
            <div tabIndex={0} className="form-control w-1/2 pr-0">
              <label className="label">
                <span className="text-lg">Last Name (Required)</span>
              </label>
              <div className="flex items-center">
                <Vertical_line className=""></Vertical_line>
                <input type="text" placeholder="Type here" className="input input-bordered w-full border-2 ml-3" style={{ borderColor: okb_colors.light_blue }} />
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div tabIndex={0} className="form-control w-full flex flex-col items-start">
            <label className="label">
              <span className="text-lg">Profile Image (Required)</span>
            </label>
            <div id="Frame542" className="flex items-center justify-center w-full gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="4" height="204" viewBox="0 0 4 204" fill="none">
                <path d="M2 2L2.00001 202" stroke="#519AEB" stroke-width="3" stroke-linecap="round" />
              </svg>
              <div className="flex flex-col items-start w-full gap-2.5">
                <div className="flex w-full justify-center align-center" >
                  <div id="Frame278" className="flex flex-col absolute items-center justify-center align-center left-1/2 transform translate-x-[-50%] translate-y-[50%]">
                    <Upload ></Upload>
                    <label>
                      <span className="font-montserrat text-xs " style={{ color: okb_colors.dark_gray }}>Upload Image</span>
                    </label>
                  </div>
                  <div className="input-container w-full relative" >
                    <span className="absolute top-0 left-0 right-0 bottom-0 border-2 rounded-lg flex items-center justify-center" style={{ borderColor: okb_colors.light_blue, height: 200 }}></span>  {/* to hide the Choose File */}
                    <input type="file" placeholder="image/" className="input input-bordered border-2 opacity-0" style={{ borderColor: okb_colors.light_blue, height: 200, width: "100%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div tabIndex={0} className="form-control w-full">
            <label className="label">
              <span className="text-lg">Are there any specific concerns you would like to discuss with your counselor?</span>
            </label>
            <div className="flex items-center">
              <Vertical_line className=""></Vertical_line>
              <input type="text" placeholder="Type here" className="input input-bordered w-full border-2 ml-3" style={{ borderColor: okb_colors.light_blue }} />
            </div>
          </div>

          <div className="dropdown dropdown-bottom">
            <div tabIndex={0} className="form-control w-full">
              <label className="label">
                <span className="text-lg">Have you spoken with a counselor/therapist before?</span>
              </label>
              <div className="flex items-center">
                <Vertical_line className=""></Vertical_line>
                <div className="flex flex-col items-start w-full justify-center align-center gap-2.5 relative">
                  <div className="input-container w-full ml-3" >
                    <input type="text" placeholder="Select" className="input input-bordered w-full border-2 pl-10 bg-white" style={{ backgroundColor: "white", borderColor: okb_colors.light_blue, color: okb_colors.dark_gray, width: "calc(100% - 0.75rem)" }} value={selectedSpokenWithCounselor} disabled />
                  </div>
                  <div id="chevron" className="flex flex-col absolute items-center justify-center align-center transform translate-x-8">
                    <Chevron_down ></Chevron_down>
                  </div>
                </div>
              </div>
            </div>
            <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-full">
              {spokenWithCounselor.map((s) => <label key={s} className="label cursor-pointer">
                <span className="label-text">{s}</span>
                <input
                  type="radio"
                  className="radio"
                  name="gender"
                  value={s}
                  onChange={() => handleSpokenWithCounselorChange(s)}
                />
              </label>)}
            </ul>
          </div>

          <div className="dropdown dropdown-bottom">
            <div tabIndex={0} className="form-control w-full">
              <label className="label">
                <span className="text-lg">When was the last time you spoke to one?</span>
              </label>
              <div className="flex items-center">
                <Vertical_line className=""></Vertical_line>
                <div className="flex flex-col items-start w-full justify-center align-center gap-2.5 relative">
                  <div className="input-container w-full ml-3" >
                    <input type="text" placeholder="Select" className="input input-bordered w-full border-2 pl-10 bg-white" style={{ backgroundColor: "white", borderColor: okb_colors.light_blue, color: okb_colors.dark_gray, width: "calc(100% - 0.75rem)" }} value={selectedLastTimeSpoke} disabled />
                  </div>
                  <div id="chevron" className="flex flex-col absolute items-center justify-center align-center transform translate-x-8">
                    <Chevron_down ></Chevron_down>
                  </div>
                </div>
              </div>
            </div>
            <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-full">
              {lastTimeSpoke.map((s) => <label key={s} className="label cursor-pointer">
                <span className="label-text">{s}</span>
                <input
                  type="radio"
                  className="radio"
                  name="gender"
                  value={s}
                  onChange={() => handleLastTimeSpokeChange(s)}
                />
              </label>)}
            </ul>
          </div>

          <div className="dropdown dropdown-bottom">
            <div tabIndex={0} className="form-control w-full">
              <label className="label">
                <span className="text-lg">What is your age?</span>
              </label>
              <div className="flex items-center">
                <Vertical_line className=""></Vertical_line>
                <div className="flex flex-col items-start w-full justify-center align-center gap-2.5 relative">
                  <div className="input-container w-full ml-3" >
                    <input type="text" placeholder="Select" className="input input-bordered w-full border-2 pl-10 bg-white" style={{ backgroundColor: "white", borderColor: okb_colors.light_blue, color: okb_colors.dark_gray, width: "calc(100% - 0.75rem)" }} value={selectedAge} disabled />
                  </div>
                  <div id="chevron" className="flex flex-col absolute items-center justify-center align-center transform translate-x-8">
                    <Chevron_down ></Chevron_down>
                  </div>
                </div>
              </div>
            </div>
            <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-full">
              {ageRange.map((age) => <label key={age} className="label cursor-pointer">
                <span className="label-text">{age}</span>
                <input
                  type="radio"
                  className="radio"
                  name="gender"
                  value={age}
                  onChange={() => handleAgeChange(age)}
                />
              </label>)}
            </ul>
          </div>

          <div className="dropdown dropdown-bottom">
            <div tabIndex={0} className="form-control w-full">
              <label className="label">
                <span className="text-lg">What is your preferred language?</span>
              </label>
              <div className="flex items-center">
                <Vertical_line className=""></Vertical_line>
                <div className="flex flex-col items-start w-full justify-center align-center gap-2.5 relative">
                  <div className="input-container w-full ml-3" >
                    <input type="text" placeholder="Select" className="input input-bordered w-full border-2 pl-10 bg-white" style={{ backgroundColor: "white", borderColor: okb_colors.light_blue, color: okb_colors.dark_gray, width: "calc(100% - 0.75rem)" }} value={selectedLanguages} disabled />
                  </div>
                  <div id="chevron" className="flex flex-col absolute items-center justify-center align-center transform translate-x-8">
                    <Chevron_down ></Chevron_down>
                  </div>
                </div>
              </div>
            </div>
            <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-full">
              {languagesSpoken.map((e) => <label key={e} className="label cursor-pointer">
                <span className="label-text">{e}</span>
                <input
                  type="checkbox"
                  className="checkbox"
                  value={e}
                  onChange={handleLanguageChange}
                />
              </label>)}
            </ul>
          </div>

          <div className="dropdown dropdown-bottom">
            <div tabIndex={0} className="form-control w-full">
              <label className="label">
                <span className="text-lg">What kind of counselor do you want to speak with?</span>
              </label>
              <div className="flex items-center">
                <Vertical_line className=""></Vertical_line>
                <div className="flex flex-col items-start w-full justify-center align-center gap-2.5 relative">
                  <div className="input-container w-full ml-3" >
                    <input type="text" placeholder="Select" className="input input-bordered w-full border-2 pl-10 bg-white" style={{ backgroundColor: "white", borderColor: okb_colors.light_blue, color: okb_colors.dark_gray, width: "calc(100% - 0.75rem)" }} value={selectedPreferredGender} disabled />
                  </div>
                  <div id="chevron" className="flex flex-col absolute items-center justify-center align-center transform translate-x-8">
                    <Chevron_down ></Chevron_down>
                  </div>
                </div>
              </div>
            </div>
            <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-full">
              {preferredGender.map((gender) => <label key={gender} className="label cursor-pointer">
                <span className="label-text">{gender}</span>
                <input
                  type="radio"
                  className="radio"
                  name="gender"
                  value={gender}
                  onChange={() => handlePreferredGenderChange(gender)}
                />
              </label>)}
            </ul>
          </div>

          <div className="card-actions justify-end">
            <button onClick={handleCancel} className="btn btn-outline">Cancel</button>
            <button className="btn" onClick={handleSaveChanges}>Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditPatientProfile;