import React, { useEffect, useState } from 'react';
import { ChangeEvent } from 'react';
import Chevron_down from "@/assets/chevron_down.svg";
import Vertical_line from "@/assets/vertical_line.svg";
import Upload from "@/assets/upload.svg";
import okb_colors from "@/colors";
import router from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import { auth, db, uploadProfilePic } from '../../firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { fetchDocumentId, fetchProfessionalData } from '../../firebase/fetchData';
import Cancel from "@/assets/cancel.svg";
import SaveChanges from "@/assets/save_changes.svg";
import { Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';

const EditPsychiatristProfile = ({ psychiatrist }) => {
  const uid = auth.currentUser?.uid;
  const [docId, setDocId] = useState<string | undefined>(undefined);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState(0);
  const [position, setPosition] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [calendlyLink, setCalendlyLink] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');

  const [languages, setLanguages] = useState<{ [key: string]: boolean }>({
    English: false,
    Ga: false,
    Twi: false,
    Hausa: false,
    Fante: false,
    Ewe: false,
    Other: false,
  });
  const [otherLanguage, setOtherLanguage] = useState('');
  const [weeklyAvailability, setWeeklyAvailability] = useState<string[]>([]);
  const [checkedAvailability, setCheckedAvailability] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });
  const [workingHours, setWorkingHours] = useState({});

  const [isPositionDropdownOpen, setIsPositionDropdownOpen] = useState(false);
  const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);

  const positions = ["Psychiatrist", "Psychologist", "Mental Health Nurse", "Counselor"];
  const predefinedLanguages = ["English", "Ga", "Twi", "Hausa", "Fante", "Ewe"];
  const genderList = ["Male", "Female", "Other"];
  const availability = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  useEffect(() => {
    const fetchDocId = async () => {
      if (uid) {
        const documentId = await fetchDocumentId("psychiatrists", uid);
        setDocId(documentId);
      }
    }
    fetchDocId();
  }, [docId]);

  useEffect(() => {
    const fetchUser = async () => {
      if (uid) {
        const data = await fetchProfessionalData(uid);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setGender(data.gender);
        setPosition(data.position);
        setLocation(data.location);
        setDescription(data.description);
        setCalendlyLink(data.calendly || '');

        setWeeklyAvailability(data.weeklyAvailability);
        const initialCheckedAvailability = {
          Monday: data.weeklyAvailability.includes('Monday'),
          Tuesday: data.weeklyAvailability.includes('Tuesday'),
          Wednesday: data.weeklyAvailability.includes('Wednesday'),
          Thursday: data.weeklyAvailability.includes('Thursday'),
          Friday: data.weeklyAvailability.includes('Friday'),
          Saturday: data.weeklyAvailability.includes('Saturday'),
          Sunday: data.weeklyAvailability.includes('Sunday'),
        };
        setCheckedAvailability(initialCheckedAvailability);
        setWorkingHours(data.workingHours);

        const updatedLanguages = { ...languages };
        data.language.forEach(lang => {
          if (predefinedLanguages.includes(lang)) {
            updatedLanguages[lang] = true;
          } else {
            updatedLanguages['Other'] = true;
            setOtherLanguage(lang);
          }
        });
        setLanguages(updatedLanguages);
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

  const handlePositionChange = (value: string) => {
    setPosition(value);
    setIsPositionDropdownOpen(false);
  }

  const handleLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedLocation = (event.target.value);
    const loc = selectedLocation.split(' ');
    const fixCase = loc.map(loc => loc.charAt(0).toUpperCase() + loc.slice(1).toLowerCase()
    );
    const result = fixCase.join(' ');
    setLocation(result);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  }

  const handleLanguageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedLanguage = event.target.value;
    const updatedLanguages = { ...languages, [selectedLanguage]: event.target.checked };
    if (selectedLanguage === 'Other' && !event.target.checked) {
      setOtherLanguage('');
    }
    setLanguages(updatedLanguages);
  };

  const handleOtherLanguageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOtherLanguage(event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1));
  };

  const handleWeeklyAvailability = (event) => {
    const { value, checked } = event.target;
    if (!checked) {
      setWorkingHours((prev) => ({
        ...prev,
        [value]: { start: '', end: '' }
      }));
    }
    setCheckedAvailability((prev) => ({
      ...prev,
      [value]: checked,
    }));

    setWeeklyAvailability(prevState => {
      if (checked) {
        return [...prevState, value];
      } else {
        return prevState.filter(day => day !== value);
      }
    });
  };

  const handleWorkingHoursChange = (day, type, value) => {
    setWorkingHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [type]: value,
      },
    }));
  };

  const handleCalendlyLinkChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCalendlyLink(event.target.value);
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  const isWorkingHoursValid = () => {
    for (const day in workingHours) {
      if (checkedAvailability[day]) {
        if (!workingHours[day]?.start || !workingHours[day]?.end) {
          return false;
        }
      }
    }
    return true;
  };

  const handleCancel = () => {
    router.push(`/psychiatrist/${uid}/psych_dashboard`);
  }

  const handleSaveChanges = async () => {
    const selectedLanguages = Object.keys(languages).filter(lang => languages[lang]);
    if (languages['Other'] && otherLanguage === "") {
      alert("You selected 'Other' for language(s) you speak. Please type in the other language(s).");
      return;
    } else if (!isWorkingHoursValid()) {
      alert("Please enter both start and end time for selected days.");
      return;
    }

    if (selectedFile && uid) {
      await uploadProfilePic(selectedFile, uid, true);
    }

    const userRef = doc(db, "psychiatrists", docId ?? "");
    await updateDoc(userRef, {
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      position: position,
      location: location,
      description: description,
      language: selectedLanguages.includes('Other') && otherLanguage ? [...selectedLanguages.filter(lang => lang !== 'Other'), otherLanguage] : selectedLanguages,
      weeklyAvailability: weeklyAvailability,
      workingHours: workingHours,
      calendly: calendlyLink
    })
    router.push(`/psychiatrist/${uid}/psych_dashboard`);
  };

  return (
    <div className="flex justify-center">
      <div className="card md:w-2/3 w-full">
        <div className="card-body flex gap-4">
          <text className="card-title font-montserrat text-4xl">Edit Profile</text>
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
                <input type="text" value={firstName} placeholder="Type here" className={`input input-bordered w-full border-2 ml-3 font-montserrat`} style={{ borderColor: okb_colors.light_blue, color: okb_colors.dark_gray }} onChange={handleFirstNameChange} />
              </div>
            </div>

            {/* Last Name */}
            <div tabIndex={0} className="form-control w-full md:w-1/2 pr-0">
              <label className="label">
                <span className="text-lg font-montserrat font-semibold">Last Name (Required)</span>
              </label>
              <div className="flex items-center">
                <Vertical_line className=""></Vertical_line>
                <input type="text" value={lastName} onChange={handleLastNameChange} placeholder="Type here" className="input input-bordered w-full border-2 ml-3 font-montserrat" style={{ borderColor: okb_colors.light_blue, color: okb_colors.dark_gray }} />
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

          {/* Current Position */}
          <div className="dropdown dropdown-bottom" style={{ position: 'relative' }}>
            <div tabIndex={0} className="form-control w-full cursor-pointer">
              <div className="label">
                <span className="text-lg font-montserrat font-semibold">Current Position (Required)</span>
              </div>
              <div className="flex items-center">
                <Vertical_line></Vertical_line>
                <div id="position" className="flex flex-col items-start w-full justify-center align-center gap-2.5 relative">
                  <div className="input-container w-full ml-3" onClick={() => setIsPositionDropdownOpen(!isPositionDropdownOpen)}>
                    <div
                      className="input input-bordered w-full border-2 rounded-xl pl-10 bg-white font-montserrat"
                      style={{ display: 'flex', alignItems: 'center', backgroundColor: "white", borderColor: okb_colors.light_blue, color: okb_colors.dark_gray, width: "calc(100% - 0.75rem)", cursor: 'pointer', userSelect: 'none' }}
                    >
                      {position}
                    </div>
                  </div>
                  <div id="chevron" className="flex flex-col absolute items-center justify-center align-center transform translate-x-8">
                    <Chevron_down></Chevron_down>
                  </div>
                </div>
              </div>
            </div>
            <div id="position_dropdown" className='flex items-end pl-4' style={{ width: 'calc(100% - 1rem)', position: 'absolute', left: '0', zIndex: '999' }}>
              {isPositionDropdownOpen && (
                <ul tabIndex={0} className={`menu dropdown-content flex p-2 shadow bg-base-100 rounded-box w-full border-2`} style={{ borderColor: okb_colors.light_blue }}>
                  {positions.map((value) => (
                    <label key={value} className="label cursor-pointer">
                      <span className="label-text font-montserrat" style={{ color: okb_colors.dark_gray }} onClick={() => handlePositionChange(value)}>
                        {value}
                      </span>
                      <input
                        type="radio"
                        className="radio"
                        name="position"
                        checked={position === value}
                        onChange={() => handlePositionChange(value)}
                      />
                    </label>
                  ))}
                  {!positions.includes(position) && (
                    <label className="label cursor-pointer">
                      <span className="label-text font-montserrat" onClick={() => handlePositionChange(position)}>
                        Other
                      </span>
                      <input
                        type="radio"
                        className="radio"
                        name="position"
                        checked={!positions.includes(position)}
                        onChange={() => handlePositionChange(position)}
                      />
                    </label>
                  )}
                </ul>
              )}
            </div>
          </div>

          {/* Location */}
          <div tabIndex={0} className="flex form-control w-full mr-10">
            <div className="label-container">
              <label className="label">
                <span className="text-lg font-montserrat font-semibold">Work Location (Required)</span>
              </label>
            </div>
            <div className="flex items-center">
              <Vertical_line className=""></Vertical_line>
              <input type="text" value={location} placeholder="Type here" className={`input input-bordered w-full rounded-xl border-2 ml-3 font-montserrat`} style={{ borderColor: okb_colors.light_blue, color: okb_colors.dark_gray }} onChange={handleLocationChange} />
            </div>
          </div>

          {/* Calendly Link */}
          <div tabIndex={0} className="flex form-control w-full mr-10">
            <div className="label-container">
              <label className="label">
                <span className="text-lg font-montserrat font-semibold">Calendly Link</span>
              </label>
            </div>
            <div className="flex items-center">
              <Vertical_line className=""></Vertical_line>
              <input 
                type="text" 
                value={calendlyLink} 
                placeholder="Enter your Calendly link" 
                className={`input input-bordered w-full rounded-xl border-2 ml-3 font-montserrat`} 
                style={{ borderColor: okb_colors.light_blue, color: okb_colors.dark_gray }} 
                onChange={handleCalendlyLinkChange} 
              />
            </div>
          </div>

          {/* About Me Description */}
          <div tabIndex={0} className="form-control w-full">
            <label className="label">
              <span className="text-lg font-montserrat font-semibold">About Me Description (Required)</span>
            </label>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="4" height="144" viewBox="0 0 4 144" fill="none">
                <path d="M2 2L2.00001 142" stroke="#519AEB" stroke-width="3" stroke-linecap="round" />
              </svg>
              <div id="Frame412" className="flex flex-col items-center w-full gap-2.5">
                <div id="Frame407" className="flex w-full justify-center align-center" >
                  <textarea placeholder="Type here" value={description} onChange={(e) => handleDescriptionChange(e)} className="input input-bordered w-full border-2 ml-3 pt-3 font-montserrat" style={{ borderColor: okb_colors.light_blue, color: okb_colors.dark_gray, height: "140px" }}></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* Languages Spoken */}
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
                          checked={languages[lang]}
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
                          checked={languages['Other']}
                          value="Other"
                          onChange={handleLanguageChange}
                        />
                      }
                      label={<span className="font-montserrat" style={{ fontWeight: 300, fontSize: 18, color: okb_colors.dark_gray }}>Other</span>}
                    />
                    {languages['Other'] && (
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

          {/* Working Hours */}
          <div className='flex flex-col gap-y-3'>
            <span className='text-lg font-semibold font-montserrat'>
              Working Hour(s) (Required)
            </span>
            <div className='flex flex-col md:flex-wrap border-l-[3px] rounded-sm' style={{ borderColor: okb_colors.light_blue }}>
              {availability.map((day) => (
                <div key={day} className='flex flex-col gap-3 ml-3'>
                  <FormControlLabel
                    control={<Checkbox checked={checkedAvailability[day]} value={day} onChange={handleWeeklyAvailability} />}
                    label={<span style={{ fontWeight: 300, fontSize: 18, color: okb_colors.dark_gray }}>{day}</span>}
                  />
                  {checkedAvailability[day] && (
                    <div className='flex flex-row gap-3 ml-6'>
                      <TextField
                        label="Start Time"
                        type="time"
                        value={workingHours[day]?.start || ''}
                        onChange={(e) => handleWorkingHoursChange(day, 'start', e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ step: 300, style: { color: okb_colors.dark_gray } }}
                      />
                      <TextField
                        label="End Time"
                        type="time"
                        value={workingHours[day]?.end || ''}
                        onChange={(e) => handleWorkingHoursChange(day, 'end', e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ step: 300, style: { color: okb_colors.dark_gray } }}
                      />
                    </div>
                  )}
                </div>
              ))}
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

export default EditPsychiatristProfile;