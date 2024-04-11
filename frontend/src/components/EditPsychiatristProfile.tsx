import React, { useEffect, useState } from 'react';
import { ChangeEvent } from 'react';
import Link from "next/link";
import Chevron_down from "@/assets/chevron_down.svg";
import Vertical_line from "@/assets/vertical_line.svg";
import Upload from "@/assets/upload.svg";
import okb_colors from "@/colors";
import router from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import { auth, db, uploadPicture } from '../../firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { fetchDocumentId, fetchProfessionalData } from '../../firebase/fetchData';
import colors from '@/colors';

const EditPsychiatristProfile = ({ psychiatrist }) => {
  const { user } = useAuth();
  const uid = auth.currentUser?.uid;
  const [docId, setDocId] = useState<string | undefined>(undefined);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [position, setPosition] = useState('');
  const [description, setDescription] = useState('');
  const [languages, setLanguages] = useState<string[]>([]);
  const [gender, setGender] = useState(0);
  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png");
  const [loading, setLoading] = useState(false);
  const [uploadedNewPicture, setUploadedNewPicture] = useState(false);


  const positions = ["Nurse", "Doctor"];
  const language = ["English", "Ga", "Twi", "Hausa", "Fante", "Ewe", "Other"];
  const genderList = ["Male", "Female", "Other"];

  useEffect(() => {
    const fetchUser = async () => {
      if (uid) {
        const data = await fetchProfessionalData(uid);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setPosition(data.position);
        setDescription(data.description);
        setLanguages(data.language);
        setGender(data.gender);
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    if (user?.photoURL) {
      console.log(user.photoURL);
      setPhotoURL(user.photoURL);
    }
  }, [user])

  const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  }

  const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  }

  const handlePositionChange = (value) => {
    setPosition(value);
  }

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  }

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    const updatedLanguages = [...languages];

    if (event.target.checked) {
      updatedLanguages.push(selectedLanguage);
    } else {
      const index = updatedLanguages.indexOf(selectedLanguage);
      if (index !== -1) {
        updatedLanguages.splice(index, 1);
      }
    }
    setLanguages(updatedLanguages);
  };

  const handleGenderChange = (value) => {
    const newGender = value === "Male" ? 0 : (value === "Female" ? 1 : 2);
    setGender(newGender);
  }

  useEffect(() => {
    const fetchDocId = async () => {
      if (uid) {
        const documentId = await fetchDocumentId("psychiatrists", uid);
        setDocId(documentId);
      }
    }
    fetchDocId();
  }, [docId]);

  const handleCancel = () => {
    router.push(`/psychiatrist/${uid}/psych_dashboard`);
  }

  const handleSaveChanges = async () => {
    const userRef = doc(db, "psychiatrists", docId ?? "");
    await updateDoc(userRef, {
      firstName: firstName,
      lastName: lastName,
      position: position,
      description: description,
      language: languages,
      gender: gender
    })
    if (uploadedNewPicture) {
      uploadPicture(photo, user?.uid, setLoading);
    }
    router.push(`/psychiatrist/${uid}/psych_dashboard`);
  };

  function handleProfilePictureChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
      setUploadedNewPicture(true);
    }
  }

  return (
    <div className="flex justify-center">
      <div className="card md:w-2/3 w-full">
        <div className="card-body">
          <text className="card-title font-montserrat text-4xl">Edit Profile</text>
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
            <div id="Frame542" className="flex flex-row items-center w-full gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="4" height="204" viewBox="0 0 4 204" fill="none">
                <path d="M2 2L2.00001 202" stroke="#519AEB" stroke-width="3" stroke-linecap="round" />
              </svg>
              {/* <div className="flex flex-col items-start w-full gap-2.5"> */}
              <div className="flex justify-center align-center" >
                <div className="flex input-container relative " >
                  <input type="file" onChange={handleProfilePictureChange} className="input input-bordered border-2 opacity-0 absolute z-10" style={{ borderColor: "okb_colors.light_blue", height: 200, width: "100%" }} />
                  <span className="absolute top-0 left-0 right-0 bottom-0 border-2 rounded-lg flex items-center justify-center" style={{ borderColor: "okb_colors.light_blue", height: 200 }}></span> {/* to hide the Choose File */}
                  <div className="flex flex-col items-center justify-center align-center">
                    {photoURL ? (
                      // <img src={photoURL} alt="profile_picture" />
                      <div style={{ width: 200, height: 200, backgroundColor: colors.okb_blue, objectFit: "cover" }} className={`text-7xl font-normal text-white flex items-center justify-center`}>
                        {firstName?.charAt(0).toUpperCase()}
                      </div>
                    ) : (
                      <>
                        {/* Assuming <Upload> is a component representing an upload icon */}
                        <Upload />
                        <label>
                          <span className="font-montserrat text-xs " style={{ color: "okb_colors.dark_gray" }}>Upload Image</span>
                        </label>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {/* </div> */}
            </div>
          </div>

          {/* Current Position */}

          <div className="dropdown dropdown-bottom">
            <div tabIndex={0} className="form-control w-full cursor-pointer">
              <div className="label">
                <span className="text-lg">Current Position (Required)</span>
              </div>
              <div className="flex items-center">
                <Vertical_line></Vertical_line>
                <div className="flex flex-col items-start w-full justify-center align-center gap-2.5 relative">
                  <div className="input-container w-full ml-3">
                    <div
                      className="input input-bordered w-full border-2 pl-10 bg-white"
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
            <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-full">
              {positions.map((value) => (
                <label key={value} className="label cursor-pointer">
                  <span className="label-text" onClick={() => handlePositionChange(value)}>
                    {value}
                  </span>
                  <input
                    type="radio"
                    className="radio"
                    name="spokenWithCounselor"
                    checked={position === value}
                    onChange={() => handlePositionChange(value)}
                  />
                </label>
              ))}
            </ul>
          </div>

          {/* About Me Description */}
          <div tabIndex={0} className="form-control w-full">
            <label className="label">
              <span className="text-lg">About Me Description (Required)</span>
            </label>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="4" height="144" viewBox="0 0 4 144" fill="none">
                <path d="M2 2L2.00001 142" stroke="#519AEB" stroke-width="3" stroke-linecap="round" />
              </svg>
              <div id="Frame412" className="flex flex-col items-center w-full gap-2.5">
                <div id="Frame407" className="flex w-full justify-center align-center" >
                  {/* <input type="text" value={description} onChange={handleDescriptionChange} placeholder="Type here" className="input input-bordered w-full border-2 ml-3 pt-3" style={{ borderColor: okb_colors.light_blue, height: "140px" }} /> */}
                  <textarea placeholder="Type here" value={description} onChange={(e) => handleDescriptionChange(e)} className="input input-bordered w-full border-2 ml-3 pt-3" style={{ borderColor: okb_colors.light_blue, height: "140px" }}></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* Languages Spoken */}
          <div className="dropdown dropdown-bottom">
            <div tabIndex={0} className="form-control w-full cursor-pointer">
              <label className="label">
                <span className="text-lg">Languages Spoken (Required)</span>
              </label>
              <div className="flex items-center">
                <Vertical_line className=""></Vertical_line>
                <div className="flex flex-col items-start w-full justify-center align-center gap-2.5 relative">
                  <div className="input-container w-full ml-3" >
                    <div
                      className="input input-bordered w-full border-2 pl-10 bg-white"
                      style={{ display: 'flex', alignItems: 'center', backgroundColor: "white", borderColor: okb_colors.light_blue, color: okb_colors.dark_gray, width: "calc(100% - 0.75rem)", cursor: 'pointer', userSelect: 'none' }}
                    >
                      {languages.join(", ")}
                    </div>
                  </div>
                  <div id="chevron" className="flex flex-col absolute items-center justify-center align-center transform translate-x-8">
                    <Chevron_down ></Chevron_down>
                  </div>
                </div>
              </div>
            </div>
            <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-full">
              {language.map((value) => (
                <label key={value} className="label cursor-pointer">
                  <span className="label-text">{value}</span>
                  <input
                    type="checkbox"
                    className="checkbox"
                    name="Languages"
                    value={value}
                    checked={languages.includes(value)}
                    onChange={handleLanguageChange}
                  />
                </label>
              ))}
            </ul>
          </div>

          {/* Gender */}
          <div className="dropdown dropdown-bottom">
            <div tabIndex={0} className="form-control w-full cursor-pointer">
              <label className="label">
                <span className="text-lg">Gender (Required)</span>
              </label>
              <div className="flex items-center">
                <Vertical_line className=""></Vertical_line>
                <div className="flex flex-col items-start w-full justify-center align-center gap-2.5 relative">
                  <div className="input-container w-full ml-3" >
                    <div
                      className="input input-bordered w-full border-2 pl-10 bg-white"
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
            <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-full">
              {genderList.map((value) => (
                <label key={value} className="label cursor-pointer">
                  <span className="label-text">{value}</span>
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

export default EditPsychiatristProfile;