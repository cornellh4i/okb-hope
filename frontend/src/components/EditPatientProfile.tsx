/** eslint-disable */

import React, { ChangeEvent, use, useEffect, useState } from 'react';
import { db, auth, uploadProfilePic } from '../../firebase/firebase';
import { doc, setDoc, updateDoc } from "firebase/firestore";
import Link from "next/link";
import Chevron_down from "@/assets/chevron_down.svg";
import Vertical_line from "@/assets/vertical_line.svg";
import Upload from "@/assets/upload.svg";
import okb_colors from "@/colors";
import { IUser } from '@/schema';
import router from 'next/router';
import { fetchDocumentId, fetchPatientDetails } from '../../firebase/fetchData';
import { useAuth } from '../../contexts/AuthContext';
import Cancel from "@/assets/cancel.svg";
import SaveChanges from "@/assets/save_changes.svg";
import { Checkbox, FormControlLabel } from '@mui/material';

const EditPatientProfile = () => {
  const { user } = useAuth();
  const uid = auth.currentUser?.uid;
  const [docId, setDocId] = useState<string | undefined>(undefined);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState(0);
  const [ageRange, setAgeRange] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [prefLanguages, setPrefLanguages] = useState<{ [key: string]: boolean }>({
    English: false,
    Ga: false,
    Twi: false,
    Hausa: false,
    Fante: false,
    Ewe: false,
    Other: false,
  });
  const [otherLanguage, setOtherLanguage] = useState('');
  const [previousTherapyExperience, setPreviousTherapyExperience] = useState('');
  const [lastTherapyTimeframe, setLastTherapyTimeframe] = useState('');
  const [concerns, setConcerns] = useState<{ [key: string]: boolean }>(
    { 'My Relationships': false, 'Addiction': false, 'Suicidal Thoughts': false, 'Family Distress': false, 'Substance Abuse': false, 'Academic Distress': false, 'Social Anxiety': false, 'Depression': false, 'Other': false });
  const [otherConcern, setOtherConcern] = useState('');

  const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);
  const [isAgeDropdownOpen, setIsAgeDropdownOpen] = useState(false);
  const [isPreviousTherapyDropdownOpen, setIsPreviousTherapyDropdownOpen] = useState(false);
  const [isLastTherapyTimeframeDropdownOpen, setIsLastTherapyTimeframeDropdownOpen] = useState(false);

  const genderList = ["Male", "Female", "Other"];
  const ageRanges = ["18-24", "25-34", "35-44", "45-54", "55-64", "65 and over"];
  const predefinedLanguages = ["English", "Ga", "Twi", "Hausa", "Fante", "Ewe"];
  const spokenWithCounselor = ["Yes", "No"];
  const lastTimeSpoke = ["Within the last month", "Within the last 6 months", "Within the last year", "Over a year ago", "I have never spoken with a counselor/therapist before"];
  const predefinedConcerns = ["My Relationships", "Addiction", "Suicidal Thoughts", "Family Distress", "Substance Abuse", "Academic Distress", "Social Anxiety", "Depression"];

  useEffect(() => {
    const fetchDocId = async () => {
      if (uid) {
        const documentId = await fetchDocumentId("patients", uid);
        setDocId(documentId);
      }
    }
    fetchDocId();
  }, [docId]);

  useEffect(() => {
    const fetchUser = async () => {
      if (uid) {
        const data = await fetchPatientDetails(uid);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setGender(data.gender);
        setAgeRange(data.ageRange);
        setPreviousTherapyExperience(data.previousTherapyExperience);
        setLastTherapyTimeframe(data.lastTherapyTimeframe);

        const updatedLanguages = { ...prefLanguages };
        data.prefLanguages.forEach(lang => {
          if (predefinedLanguages.includes(lang)) {
            updatedLanguages[lang] = true;
          } else {
            updatedLanguages['Other'] = true;
            setOtherLanguage(lang);
          }
        });
        setPrefLanguages(updatedLanguages);

        const updatedConcerns = { ...concerns };
        data.concerns.forEach(concern => {
          if (predefinedConcerns.includes(concern)) {
            updatedConcerns[concern] = true;
          } else {
            updatedConcerns['Other'] = true;
            setOtherConcern(concern);
          }
        });
        setConcerns(updatedConcerns);
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

  const handleGenderChange = (value) => {
    const newGender = value === "Male" ? 0 : (value === "Female" ? 1 : 2);
    setGender(newGender);
  }

  const handleAgeChange = (ageRange) => {
    setAgeRange(ageRange);
  }

  const handleLanguageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedLanguage = event.target.value;
    const updatedLanguages = { ...prefLanguages, [selectedLanguage]: event.target.checked };
    if (selectedLanguage === 'Other' && !event.target.checked) {
      setOtherLanguage('');
    }
    setPrefLanguages(updatedLanguages);
  };

  const handleOtherLanguageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOtherLanguage(event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1));
  };

  const handlePreviousTherapyExperienceChange = (value) => {
    setPreviousTherapyExperience(value);
  }

  const handleLastTimeSpokeChange = (value) => {
    setLastTherapyTimeframe(value);
  }

  const handleConcernChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedConcern = event.target.value;
    const updatedConcerns = { ...concerns, [selectedConcern]: event.target.checked };
    if (selectedConcern === 'Other' && !event.target.checked) {
      setOtherConcern('');
    }
    setConcerns(updatedConcerns);
  };

  const handleOtherConcernChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOtherConcern(event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1));
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  const handleSaveChanges = async () => {
    const selectedLanguages = Object.keys(prefLanguages).filter(lang => prefLanguages[lang]);
    const selectedConcerns = Object.keys(concerns).filter(concern => concerns[concern]);
    if (prefLanguages['Other'] && otherLanguage === "") {
      alert("You selected 'Other' for language(s) you speak. Please type in the other language(s).");
      return;
    } else if (concerns['Other'] && otherConcern === "") {
      alert("You selected 'Other' for concern(s). Please type in the other concern(s).");
      return;
    }

    if (selectedFile && uid) {
      await uploadProfilePic(selectedFile, uid, false);
    }

    const userRef = doc(db, "patients", docId ?? "");
    await updateDoc(userRef, {
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      ageRange: ageRange,
      prefLanguages: selectedLanguages.includes('Other') && otherLanguage ? [...selectedLanguages.filter(lang => lang !== 'Other'), otherLanguage] : selectedLanguages,
      previousTherapyExperience: previousTherapyExperience,
      lastTherapyTimeframe: lastTherapyTimeframe,
      concerns: selectedConcerns.includes('Other') && otherConcern ? [...selectedConcerns.filter(concern => concern !== 'Other'), otherConcern] : selectedConcerns,
    })
    router.push(`/${user?.userType}/${uid}/dashboard`);
  };

  const handleCancel = () => {
    router.push(`/${user?.userType}/${uid}/dashboard`);
  }

  return (
    <div className="flex justify-center">
      <div className="card md:w-2/3 w-full">
        <div className="card-body flex gap-4">
          <text className="card-title text-4xl font-montserrat">Edit Profile</text>
          {/* Text input fields */}
          <div className="flex flex-col md:flex-row justify-between">
            {/* First Name */}
            <div tabIndex={0} className="flex form-control w-full md:w-1/2 mr-10">
              <div className="label-container">
                <label className="label">
                  <span className="text-lg font-montserrat font-semibold">First Name (Required)</span>
                </label>
              </div>
              <div className="flex items-center">
                <Vertical_line className=""></Vertical_line>
                <input type="text" value={firstName} placeholder="Type here" className={`input input-bordered w-full rounded-xl border-2 ml-3 font-montserrat`} style={{ borderColor: okb_colors.light_blue, color: okb_colors.dark_gray }} onChange={handleFirstNameChange} />
              </div>
            </div>

            {/* Last Name */}
            <div tabIndex={0} className="form-control w-full md:w-1/2 pr-0">
              <label className="label">
                <span className="text-lg font-montserrat font-semibold">Last Name (Required)</span>
              </label>
              <div className="flex items-center">
                <Vertical_line className=""></Vertical_line>
                <input type="text" value={lastName} onChange={handleLastNameChange} placeholder="Type here" className="input input-bordered w-full rounded-xl border-2 ml-3 font-montserrat" style={{ borderColor: okb_colors.light_blue, color: okb_colors.dark_gray }} />
              </div>
            </div>
          </div>

          {/* Gender */}
          <div className="dropdown dropdown-bottom" style={{ position: 'relative' }}>
            <div tabIndex={0} className="form-control w-full cursor-pointer">
              <label className="label">
                <span className="text-lg font-montserrat font-semibold">Gender (Required)</span>
              </label>
              <div className="flex items-center">
                <Vertical_line className=""></Vertical_line>
                <div className="flex flex-col items-start w-full justify-center align-center gap-2.5 relative">
                  <div className="input-container w-full ml-3" onClick={() => { setIsGenderDropdownOpen(!isGenderDropdownOpen) }}>
                    <div
                      className="input input-bordered w-full rounded-xl border-2 pl-10 bg-white font-montserrat"
                      style={{ display: 'flex', alignItems: 'center', backgroundColor: "white", borderColor: okb_colors.light_blue, color: okb_colors.dark_gray, width: "calc(100% - 0.75rem)", cursor: 'pointer', userSelect: 'none' }}
                    >
                      {gender === 0 ? "Male" : (gender === 1 ? "Female" : "Other")}
                    </div>
                  </div>
                  <div id="chevron" className="flex flex-col absolute items-center justify-center align-center transform translate-x-8">
                    <Chevron_down ></Chevron_down>
                  </div>
                </div>
              </div>
            </div>
            <div id="gender_dropdown" className='flex items-end pl-4' style={{ width: 'calc(100% - 1rem)', position: 'absolute', left: '0', zIndex: '999' }}>
              {isGenderDropdownOpen && (
                <ul tabIndex={0} className={`menu dropdown-content flex p-2 shadow bg-base-100 rounded-box w-full border-2`} style={{ borderColor: okb_colors.light_blue }}>
                  {genderList.map((value) => (
                    <label key={value} className="label cursor-pointer">
                      <span className="label-text font-montserrat" style={{ color: okb_colors.dark_gray }}>{value}</span>
                      <input
                        type="radio"
                        className="radio"
                        name="gender"
                        checked={gender === 0 ? value === "Male" : (gender === 1 ? value === "Female" : value === "Other")}
                        onChange={() => handleGenderChange(value)}
                      />
                    </label>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Profile Image */}
          <div tabIndex={0} className="form-control w-full flex flex-col items-start">
            <label className="label">
              <span className="text-lg font-montserrat font-semibold">Profile Image</span>
            </label>
            <div id="Frame542" className="flex items-center justify-center w-full gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="4" height="204" viewBox="0 0 4 204" fill="none">
                <path d="M2 2L2.00001 202" stroke="#519AEB" stroke-width="3" stroke-linecap="round" />
              </svg>
              <div className="flex flex-col items-start w-full gap-2.5">
                <div className="flex w-full justify-center align-center relative" >
                  <div id="Frame278" className="flex flex-col absolute items-center justify-center align-center left-1/2 transform translate-x-[-50%] translate-y-[50%] z-10">
                    <Upload />
                    <label>
                      <span className="font-montserrat text-xs italic" style={{ color: okb_colors.dark_gray }}>
                        {fileName || 'Upload Image'}
                      </span>
                    </label>
                  </div>
                  <div className="input-container w-full relative" >
                    <span 
                      className="absolute top-0 left-0 right-0 bottom-0 border-2 rounded-lg flex items-center justify-center" 
                      style={{ borderColor: okb_colors.light_blue, height: 200 }}
                    />
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="input input-bordered border-2 opacity-0" 
                      style={{ borderColor: okb_colors.light_blue, height: 200, width: "100%" }} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Age */}
          <div className="dropdown dropdown-bottom" style={{ position: 'relative' }}>
            <div tabIndex={0} className="form-control w-full cursor-pointer">
              <label className="label">
                <span className="text-lg font-montserrat font-semibold">What is your age? (Required)</span>
              </label>
              <div className="flex items-center">
                <Vertical_line className=""></Vertical_line>
                <div className="flex flex-col items-start w-full justify-center align-center gap-2.5 relative">
                  <div className="input-container w-full ml-3" onClick={() => { setIsAgeDropdownOpen(!isAgeDropdownOpen) }}>
                    <div
                      className="input input-bordered w-full rounded-xl border-2 pl-10 bg-white font-montserrat"
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
            <div id="age_dropdown" className='flex items-end pl-4' style={{ width: 'calc(100% - 1rem)', position: 'absolute', left: '0', zIndex: '999' }}>
              {isAgeDropdownOpen && (
                <ul tabIndex={0} className={`menu dropdown-content flex p-2 shadow bg-base-100 rounded-box w-full border-2`} style={{ borderColor: okb_colors.light_blue }}>
                  {ageRanges.map((value) => (
                    <label key={value} className="label cursor-pointer">
                      <span className="label-text font-montserrat" style={{ color: okb_colors.dark_gray }}>{value}</span>
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
              )}
            </div>
          </div>


          {/* Preferred Languages */}
          <div tabIndex={0} className="form-control w-full">
            <label className="label">
              <span className="text-lg font-montserrat font-semibold">Language(s) Spoken (Required)</span>
            </label>
            <div className="flex flex-row gap-3">
              <div className='flex items-center font-montserrat border-l-[3px] rounded-sm' style={{ borderColor: okb_colors.light_blue }}>
                <div className='flex flex-wrap ml-3'>
                  {predefinedLanguages.map((lang) => (
                    <FormControlLabel
                      key={lang}
                      control={
                        <Checkbox
                          checked={prefLanguages[lang]}
                          value={lang}
                          onChange={handleLanguageChange}
                        />
                      }
                      label={<span className="font-montserrat" style={{ fontWeight: 300, fontSize: 18, color: okb_colors.dark_gray }}>{lang}</span>}
                    />
                  ))}
                  <div className='flex flex-row items-center'>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={prefLanguages['Other']}
                          value="Other"
                          onChange={handleLanguageChange}
                        />
                      }
                      label={<span className="font-montserrat" style={{ fontWeight: 300, fontSize: 18, color: okb_colors.dark_gray }}>Other</span>}
                    />
                    {prefLanguages['Other'] && (
                      <div className='flex items-center justify-start ml-2'>
                        <input
                          value={otherLanguage}
                          onChange={handleOtherLanguageChange}
                          placeholder="Type here"
                          className={`input input-bordered w-full resize-none border-2 rounded-2xl placeholder:italic py-2.5 px-6`}
                          style={{
                            borderColor: okb_colors.light_blue, color: okb_colors.dark_gray
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Previous Therapy Experience */}
          <div className="dropdown dropdown-bottom" style={{ position: 'relative' }}>
            <div tabIndex={0} className="form-control w-full cursor-pointer">
              <div className="label">
                <span className="text-lg font-montserrat font-semibold">Have you spoken with a counselor/therapist before? (Required)</span>
              </div>
              <div className="flex items-center">
                <Vertical_line></Vertical_line>
                <div className="flex flex-col items-start w-full justify-center align-center gap-2.5 relative">
                  <div className="input-container w-full ml-3">
                    <div
                      className="input input-bordered w-full rounded-xl border-2 pl-10 bg-white font-montserrat"
                      style={{ display: 'flex', alignItems: 'center', backgroundColor: "white", borderColor: okb_colors.light_blue, color: okb_colors.dark_gray, width: "calc(100% - 0.75rem)", cursor: 'pointer', userSelect: 'none' }}
                      onClick={() => setIsPreviousTherapyDropdownOpen(!isPreviousTherapyDropdownOpen)}
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
            <div id="previous_therapy_dropdown" className='flex items-end pl-4' style={{ width: 'calc(100% - 1rem)', position: 'absolute', left: '0', zIndex: '999' }}>
              {isPreviousTherapyDropdownOpen && (
                <ul tabIndex={0} className={`menu dropdown-content flex p-2 shadow bg-base-100 rounded-box w-full border-2`} style={{ borderColor: okb_colors.light_blue }}>
                  {spokenWithCounselor.map((value) => (
                    <label key={value} className="label cursor-pointer">
                      <span className="label-text font-montserrat" style={{ color: okb_colors.dark_gray }} onClick={() => handlePreviousTherapyExperienceChange(value)}>
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
              )}
            </div>
          </div>

          {/* Last Time Speaking to a Therapist */}
          <div className="dropdown dropdown-bottom" style={{ position: 'relative' }}>
            <div tabIndex={0} className="form-control w-full cursor-pointer">
              <label className="label">
                <span className="text-lg font-montserrat font-semibold">When was the last time you spoke with one? (Required)</span>
              </label>
              <div className="flex items-center">
                <div className="flex flex-col items-start w-full justify-center align-center gap-2.5 relative border-l-[3px] rounded-sm" style={{ borderColor: okb_colors.light_blue }}>
                  <div className="input-container w-full ml-3">
                    <div
                      className="input input-bordered w-full rounded-xl border-2 pl-10 bg-white font-montserrat h-full p-2"
                      style={{ display: 'flex', alignItems: 'center', backgroundColor: "white", borderColor: okb_colors.light_blue, color: okb_colors.dark_gray, width: "calc(100% - 0.75rem)", cursor: 'pointer', userSelect: 'none' }}
                      onClick={() => setIsLastTherapyTimeframeDropdownOpen(!isLastTherapyTimeframeDropdownOpen)}
                    >
                      {lastTherapyTimeframe}
                    </div>
                  </div>
                  <div id="chevron" className="flex flex-col absolute items-center justify-center align-center transform translate-x-8">
                    <Chevron_down></Chevron_down>
                  </div>
                </div>
              </div>
            </div>
            <div id="last_therapy_dropdown" className='flex items-end pl-4' style={{ width: 'calc(100% - 1rem)', position: 'absolute', left: '0', zIndex: '999' }}>
              {isLastTherapyTimeframeDropdownOpen && (
                <ul tabIndex={0} className={`menu dropdown-content flex p-2 shadow bg-base-100 rounded-box w-full border-2`} style={{ borderColor: okb_colors.light_blue }}>
                  {lastTimeSpoke.map((value) => (
                    <label key={value} className="label cursor-pointer">
                      <span className="label-text font-montserrat" style={{ color: okb_colors.dark_gray }} onClick={() => handleLastTimeSpokeChange(value)}>
                        {value}
                      </span>
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
              )}
            </div>
          </div>


          {/* Concerns */}
          <div tabIndex={0} className="form-control w-full">
            <label className="label">
              <span className="text-lg font-montserrat font-semibold">Are there any specific concerns you would like to discuss with your counselor? (Required)</span>
            </label>
            <div className="flex flex-row gap-3">
              <div className='flex items-center font-montserrat border-l-[3px] rounded-sm' style={{ borderColor: okb_colors.light_blue }}>
                <div className='flex flex-wrap ml-3'>
                  {predefinedConcerns.map((concern) => (
                    <FormControlLabel
                      key={concern}
                      control={
                        <Checkbox
                          checked={concerns[concern]}
                          value={concern}
                          onChange={handleConcernChange}
                        />
                      }
                      label={<span className="font-montserrat" style={{ fontWeight: 300, fontSize: 18, color: okb_colors.dark_gray }}>{concern}</span>}
                    />
                  ))}
                  <div className='flex flex-row items-center'>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={concerns['Other']}
                          value="Other"
                          onChange={handleConcernChange}
                        />
                      }
                      label={<span className="font-montserrat" style={{ fontWeight: 300, fontSize: 18, color: okb_colors.dark_gray }}>Other</span>}
                    />
                    {concerns['Other'] && (
                      <div className='flex items-center justify-start ml-2'>
                        <input
                          value={otherConcern}
                          onChange={handleOtherConcernChange}
                          placeholder="Type here"
                          className={`input input-bordered w-full resize-none border-2 rounded-2xl placeholder:italic py-2.5 px-6`}
                          style={{
                            borderColor: okb_colors.light_blue, color: okb_colors.dark_gray
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="card-actions justify-end pt-10">
            <Cancel onClick={handleCancel} style={{ cursor: 'pointer' }} />
            <SaveChanges onClick={handleSaveChanges} style={{ cursor: 'pointer' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditPatientProfile;