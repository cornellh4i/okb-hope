/** eslint-disable */

import React, { ChangeEvent, use, useEffect, useState } from 'react';
import { db, auth } from '../../firebase/firebase';
import { doc, setDoc, updateDoc } from "firebase/firestore";
import Link from "next/link";
import Chevron_down from "@/assets/chevron_down.svg";
import Vertical_line from "@/assets/vertical_line.svg";
import Upload from "@/assets/upload.svg";
import okb_colors from "@/colors";
import { IUser } from '@/schema';
import router from 'next/router';
import { fetchDocumentId, fetchPatientDetails } from '../../firebase/fetchData';

const EditPatientProfile = () => {
  const uid = auth.currentUser?.uid;
  const [docId, setDocId] = useState<string | undefined>(undefined);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [concerns, setConcerns] = useState('');
  const [previousTherapyExperience, setPreviousTherapyExperience] = useState('');
  const [lastTherapyTimeframe, setLastTherapyTimeframe] = useState('');
  const [ageRange, setAgeRange] = useState('');
  const [prefLanguages, setPrefLanguages] = useState<string[]>([]);
  const [genderPref, setGenderPref] = useState(0);

  const spokenWithCounselor = ["Yes", "No"];
  const lastTimeSpoke = ["Within the last month", "Within the last 6 months", "Within the last year", "Over a year ago", "I have never spoken with a counselor/therapist before"];
  const ageRanges = ["18-24", "25-34", "35-44", "45-54", "55-64", "65 and over"];
  const languagesSpoken = ["English", "Ga", "Twi", "Hausa"];
  const preferredGender = ["Male", "Female"];

  useEffect(() => {
    const fetchUser = async () => {
      if (uid) {
        const data = await fetchPatientDetails(uid);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setConcerns(data.concerns);
        setPreviousTherapyExperience(data.previousTherapyExperience);
        setLastTherapyTimeframe(data.lastTherapyTimeframe);
        setAgeRange(data.ageRange);
        setPrefLanguages(data.prefLanguages);
        setGenderPref(data.genderPref);
      }
    }
    fetchUser();
  }, []);

  const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  }

  const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  }

  const handleConcernsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setConcerns(event.target.value);
  }

  const handlePreviousTherapyExperienceChange = (value) => {
    setPreviousTherapyExperience(value);
  }

  const handleLastTimeSpokeChange = (value) => {
    setLastTherapyTimeframe(value);
  }

  const handleAgeChange = (ageRange) => {
    setAgeRange(ageRange);
  }

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    const updatedLanguages = [...prefLanguages];

    if (event.target.checked) {
      updatedLanguages.push(selectedLanguage);
    } else {
      const index = updatedLanguages.indexOf(selectedLanguage);
      if (index !== -1) {
        updatedLanguages.splice(index, 1);
      }
    }
    setPrefLanguages(updatedLanguages);
  };

  const handlePreferredGenderChange = (gender) => {
    const newGenderPref = gender === "Female" ? 1 : 0;
    setGenderPref(newGenderPref);
  }

  useEffect(() => {
    const fetchDocId = async () => {
      if (uid) {
        const documentId = await fetchDocumentId("patients", uid);
        setDocId(documentId);
      }
    }
    fetchDocId();
  }, [docId]);

  const handleSaveChanges = async () => {
    const userRef = doc(db, "patients", docId ?? "");
    await updateDoc(userRef, {
      firstName: firstName,
      lastName: lastName,
      concerns: concerns,
      previousTherapyExperience: previousTherapyExperience,
      lastTherapyTimeframe: lastTherapyTimeframe,
      ageRange: ageRange,
      prefLanguages: prefLanguages,
      genderPref: genderPref
    })
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
                <input type="text" value={firstName} placeholder="Type here" className={`input input-bordered w-full border-2 ml-3`} style={{ borderColor: okb_colors.light_blue }} onChange={handleFirstNameChange} />
              </div>
            </div>

            {/* Last Name */}
            <div tabIndex={0} className="form-control w-1/2 pr-0">
              <label className="label">
                <span className="text-lg">Last Name (Required)</span>
              </label>
              <div className="flex items-center">
                <Vertical_line className=""></Vertical_line>
                <input type="text" value={lastName} onChange={handleLastNameChange} placeholder="Type here" className="input input-bordered w-full border-2 ml-3" style={{ borderColor: okb_colors.light_blue }} />
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div tabIndex={0} className="form-control w-full flex flex-col items-start">
            <label className="label">
              <span className="text-lg">Profile Image</span>
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

          {/* Concerns */}
          <div tabIndex={0} className="form-control w-full">
            <label className="label">
              <span className="text-lg">Are there any specific concerns you would like to discuss with your counselor?</span>
            </label>
            <div className="flex items-center">
              <Vertical_line className=""></Vertical_line>
              <input type="text" value={concerns} onChange={handleConcernsChange} placeholder="Type here" className="input input-bordered w-full border-2 ml-3" style={{ borderColor: okb_colors.light_blue }} />
            </div>
          </div>

          {/* Previous Therapy Experience */}
          <div className="dropdown dropdown-bottom">
            <div tabIndex={0} className="form-control w-full cursor-pointer">
              <div className="label">
                <span className="text-lg">Have you spoken with a counselor/therapist before?</span>
              </div>
              <div className="flex items-center">
                <Vertical_line></Vertical_line>
                <div className="flex flex-col items-start w-full justify-center align-center gap-2.5 relative">
                  <div className="input-container w-full ml-3">
                    <div
                      className="input input-bordered w-full border-2 pl-10 bg-white"
                      style={{ display: 'flex', alignItems: 'center', backgroundColor: "white", borderColor: okb_colors.light_blue, color: okb_colors.dark_gray, width: "calc(100% - 0.75rem)", cursor: 'pointer', userSelect: 'none' }}
                    >
                      {previousTherapyExperience}
                    </div>
                  </div>
                  <div id="chevron" className="flex flex-col absolute items-center justify-center align-center transform translate-x-8">
                    <Chevron_down></Chevron_down>
                  </div>
                </div>
              </div>
            </div>
            <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-full">
              {spokenWithCounselor.map((value) => (
                <label key={value} className="label cursor-pointer">
                  <span className="label-text" onClick={() => handlePreviousTherapyExperienceChange(value)}>
                    {value}
                  </span>
                  <input
                    type="radio"
                    className="radio"
                    name="spokenWithCounselor"
                    checked={previousTherapyExperience === value}
                    onChange={() => handlePreviousTherapyExperienceChange(value)}
                  />
                </label>
              ))}
            </ul>
          </div>

          {/* Last Time Speaking to a Therapist */}
          <div className="dropdown dropdown-bottom">
            <div tabIndex={0} className="form-control w-full cursor-pointer">
              <label className="label">
                <span className="text-lg">If yes, when was the last time you spoke with one?</span>
              </label>
              <div className="flex items-center">
                <Vertical_line></Vertical_line>
                <div className="flex flex-col items-start w-full justify-center align-center gap-2.5 relative">
                  <div className="input-container w-full ml-3" >
                    <div
                      className="input input-bordered w-full border-2 pl-10 bg-white"
                      style={{ display: 'flex', alignItems: 'center', backgroundColor: "white", borderColor: okb_colors.light_blue, color: okb_colors.dark_gray, width: "calc(100% - 0.75rem)", cursor: 'pointer', userSelect: 'none' }}
                    >
                      {lastTherapyTimeframe}
                    </div>
                  </div>
                  <div id="chevron" className="flex flex-col absolute items-center justify-center align-center transform translate-x-8">
                    <Chevron_down ></Chevron_down>
                  </div>
                </div>
              </div>
            </div>
            <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-full">
              {lastTimeSpoke.map((value) => (
                <label key={value} className="label cursor-pointer">
                  <span className="label-text">{value}</span>
                  <input
                    type="radio"
                    className="radio"
                    name="lastTherapyTimeframe"
                    checked={lastTherapyTimeframe === value}
                    onChange={() => handleLastTimeSpokeChange(value)}
                  />
                </label>
              ))}
            </ul>
          </div>

          {/* Age */}
          <div className="dropdown dropdown-bottom">
            <div tabIndex={0} className="form-control w-full cursor-pointer">
              <label className="label">
                <span className="text-lg">What is your age?</span>
              </label>
              <div className="flex items-center">
                <Vertical_line className=""></Vertical_line>
                <div className="flex flex-col items-start w-full justify-center align-center gap-2.5 relative">
                  <div className="input-container w-full ml-3" >
                    <div
                      className="input input-bordered w-full border-2 pl-10 bg-white"
                      style={{ display: 'flex', alignItems: 'center', backgroundColor: "white", borderColor: okb_colors.light_blue, color: okb_colors.dark_gray, width: "calc(100% - 0.75rem)", cursor: 'pointer', userSelect: 'none' }}
                    >
                      {ageRange}
                    </div>
                  </div>
                  <div id="chevron" className="flex flex-col absolute items-center justify-center align-center transform translate-x-8">
                    <Chevron_down ></Chevron_down>
                  </div>
                </div>
              </div>
            </div>
            <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-full">
              {ageRanges.map((value) => (
                <label key={value} className="label cursor-pointer">
                  <span className="label-text">{value}</span>
                  <input
                    type="radio"
                    className="radio"
                    name="age"
                    checked={ageRange === value}
                    onChange={() => handleAgeChange(value)}
                  />
                </label>
              ))}
            </ul>
          </div>

          {/* Preferred Languages */}
          <div className="dropdown dropdown-bottom">
            <div tabIndex={0} className="form-control w-full cursor-pointer">
              <label className="label">
                <span className="text-lg">What are your preferred languages?</span>
              </label>
              <div className="flex items-center">
                <Vertical_line className=""></Vertical_line>
                <div className="flex flex-col items-start w-full justify-center align-center gap-2.5 relative">
                  <div className="input-container w-full ml-3" >
                    <div
                      className="input input-bordered w-full border-2 pl-10 bg-white"
                      style={{ display: 'flex', alignItems: 'center', backgroundColor: "white", borderColor: okb_colors.light_blue, color: okb_colors.dark_gray, width: "calc(100% - 0.75rem)", cursor: 'pointer', userSelect: 'none' }}
                    >
                      {prefLanguages.join(", ")}
                    </div>
                  </div>
                  <div id="chevron" className="flex flex-col absolute items-center justify-center align-center transform translate-x-8">
                    <Chevron_down ></Chevron_down>
                  </div>
                </div>
              </div>
            </div>
            <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-full">
              {languagesSpoken.map((value) => (
                <label key={value} className="label cursor-pointer">
                  <span className="label-text">{value}</span>
                  <input
                    type="checkbox"
                    className="checkbox"
                    name="preferredLanguages"
                    value={value}
                    checked={prefLanguages.includes(value)}
                    onChange={handleLanguageChange}
                  />
                </label>
              ))}
            </ul>
          </div>

          {/* Preferred Counselor Gender */}
          <div className="dropdown dropdown-bottom">
            <div tabIndex={0} className="form-control w-full cursor-pointer">
              <label className="label">
                <span className="text-lg">What kind of counselor do you want to speak with?</span>
              </label>
              <div className="flex items-center">
                <Vertical_line className=""></Vertical_line>
                <div className="flex flex-col items-start w-full justify-center align-center gap-2.5 relative">
                  <div className="input-container w-full ml-3" >
                    <div
                      className="input input-bordered w-full border-2 pl-10 bg-white"
                      style={{ display: 'flex', alignItems: 'center', backgroundColor: "white", borderColor: okb_colors.light_blue, color: okb_colors.dark_gray, width: "calc(100% - 0.75rem)", cursor: 'pointer', userSelect: 'none' }}
                    >
                      {genderPref === 1 ? "Female" : "Male"}
                    </div>
                  </div>
                  <div id="chevron" className="flex flex-col absolute items-center justify-center align-center transform translate-x-8">
                    <Chevron_down ></Chevron_down>
                  </div>
                </div>
              </div>
            </div>
            <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-full">
              {preferredGender.map((gender) => (
                <label key={gender} className="label cursor-pointer">
                  <span className="label-text">{gender}</span>
                  <input
                    type="radio"
                    className="radio"
                    name="gender"
                    checked={genderPref === 0 ? gender === "Male" : gender === "Female"}
                    onChange={() => handlePreferredGenderChange(gender)}
                  />
                </label>
              ))}
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