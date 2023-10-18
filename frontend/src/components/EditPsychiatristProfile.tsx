import React, {useState} from 'react';
import { ChangeEvent } from 'react';
import Link from "next/link";
import Chevron_down from "@/assets/chevron_down.svg";
import Vertical_line from "@/assets/vertical_line.svg";
import Upload from "@/assets/upload.svg";
import okb_colors from "@/colors";

const EditPsychiatristProfile = ({psychiatrist}) => {
  const {firstName, lastName} = psychiatrist;
  const positions = ["Nurse","Doctor"]
  const language = ["English","Ga","Twi","Hausa"]
  const genders = ["Male", "Female", "Other"]

  const [selectedGender, setSelectedGender] = useState('');
  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
  }

  const [selectedPosition, setSelectedPosition] = useState('');
  const handlePositionChange = (position) => {
    setSelectedPosition(position);
  }
  
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const handleLanguageChange = (language) => {
    let updatedLanguages = [...selectedLanguages];
    if(language.target.checked){
      updatedLanguages.push(language.target.value);
    } else{
      const index = updatedLanguages.indexOf(language.target.value);
      if (index !== -1) {
        updatedLanguages.splice(index, 1);
      }
        }
    setSelectedLanguages(updatedLanguages);
  };
  let isLanguageChecked = (item) =>
  selectedLanguages.includes(item) ? true : false;

  
  return (
    <div className="flex justify-center">
      <div className="card w-2/3">
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
                <input type="text" placeholder="Type here" className={`input input-bordered w-full border-2 ml-3`} style={{borderColor:okb_colors.light_blue}} />
              </div>
              </div>

            {/* Last Name */}
            <div tabIndex={0} className="form-control w-1/2 pr-0">
              <label className="label">
                <span className="text-lg">Last Name (Required)</span>
              </label>
              <div className="flex items-center">
                <Vertical_line className=""></Vertical_line>
                <input type="text" placeholder="Type here" className="input input-bordered w-full border-2 ml-3" style={{borderColor:okb_colors.light_blue}} />
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
                    <path d="M2 2L2.00001 202" stroke="#519AEB" stroke-width="3" stroke-linecap="round"/>
                  </svg>
                  <div className="flex flex-col items-start w-full gap-2.5">
                    <div className="flex w-full justify-center align-center" >
                      <div id="Frame278" className="flex flex-col absolute items-center justify-center align-center left-1/2 transform translate-x-[-50%] translate-y-[50%]">
                        <Upload ></Upload>
                        <label>
                          <span className="font-montserrat text-xs " style={{color:okb_colors.dark_gray}}>Upload Image</span>
                        </label>
                      </div>
                      <div className="input-container w-full relative" >
                        <span className="absolute top-0 left-0 right-0 bottom-0 border-2 rounded-lg flex items-center justify-center" style={{borderColor:okb_colors.light_blue,height:200}}></span>  {/* to hide the Choose File */}
                        <input type="file" placeholder="image/" className="input input-bordered border-2 opacity-0" style={{borderColor:okb_colors.light_blue,height:200,width:"100%"}} />
                      </div>
                    </div>
                  </div>         
              </div>
            </div>

            {/* Current Position */}
            <div tabIndex={0} className="dropdown dropdown-bottom form-control w-full">
              <label className="label">
                <span className="text-lg">Current Position (Required)</span>
              </label>
              <div className="flex items-center">
                <Vertical_line className=""></Vertical_line>
                <div className="flex flex-col items-start w-full justify-center align-center gap-2.5 relative">
                    <div className="input-container w-full ml-3" >
                      <input type="text" placeholder="Select" className="input input-bordered w-full border-2 pl-10 bg-white"  style={{backgroundColor: "white", borderColor:okb_colors.light_blue,color:okb_colors.dark_gray,width: "calc(100% - 0.75rem)" }} value={selectedPosition} disabled/>                      
                    </div>
                    <div id="chevron" className="flex flex-col absolute items-center justify-center align-center transform translate-x-8">
                      <Chevron_down ></Chevron_down>
                    </div>
                </div>                
              </div>
              <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-full">
                {positions.map((position) => <label key={position} className="label cursor-pointer">
                <span className="label-text">{position}</span>
                    <input
                      type="radio"
                      className="radio"
                      name="position"
                      value={position}
                      onChange={() => handlePositionChange(position)}
                    />
                  </label>)}
              </ul>
            </div>

            {/* About Me Description */}
            <div tabIndex={0} className="form-control w-full">
              <label className="label">
                <span className="text-lg">About Me Description (Required)</span>
              </label>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="4" height="144" viewBox="0 0 4 144" fill="none">
                  <path d="M2 2L2.00001 142" stroke="#519AEB" stroke-width="3" stroke-linecap="round"/>
                </svg>
                <div id="Frame412" className="flex flex-col items-center w-full gap-2.5">
                  <div id="Frame407" className="flex w-full justify-center align-center" >
                    <textarea placeholder="Type here" className="input input-bordered w-full border-2 ml-3 pt-3" style={{ borderColor: okb_colors.light_blue, height: "140px"}}></textarea>
                  </div>
                </div>
              </div>
            </div>

            {/* Languages Spoken */}
            <div className="dropdown dropdown-bottom">
              <div tabIndex={0} className="form-control w-full">
                <label className="label">
                  <span className="text-lg">Languages Spoken (Required)</span>
                </label>
                <div className="flex items-center">
                  <Vertical_line className=""></Vertical_line>
                  <div className="flex flex-col items-start w-full justify-center align-center gap-2.5 relative">
                      <div className="input-container w-full ml-3" >
                        <input type="text" placeholder="Select" className="input input-bordered w-full border-2 pl-10 bg-white"  style={{backgroundColor: "white", borderColor:okb_colors.light_blue,color:okb_colors.dark_gray,width: "calc(100% - 0.75rem)" }} value={selectedLanguages} disabled/>                      
                      </div>
                      <div id="chevron" className="flex flex-col absolute items-center justify-center align-center transform translate-x-8">
                        <Chevron_down ></Chevron_down>
                      </div>
                  </div>                
                </div>  
              </div>
              <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-full">
                {language.map((e) => <label key={e} className="label cursor-pointer">
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

            {/* Gender */}
            <div className="dropdown dropdown-bottom">
              <div tabIndex={0} className="form-control w-full">
                <label className="label">
                  <span className="text-lg">Gender (Required)</span>
                </label>
                <div className="flex items-center">
                  <Vertical_line className=""></Vertical_line>
                  <div className="flex flex-col items-start w-full justify-center align-center gap-2.5 relative">
                      <div className="input-container w-full ml-3" >
                        <input type="text" placeholder="Select" className="input input-bordered w-full border-2 pl-10 bg-white"  style={{backgroundColor: "white", borderColor:okb_colors.light_blue,color:okb_colors.dark_gray,width: "calc(100% - 0.75rem)" }} value={selectedGender} disabled/>                      
                      </div>
                      <div id="chevron" className="flex flex-col absolute items-center justify-center align-center transform translate-x-8">
                        <Chevron_down ></Chevron_down>
                      </div>
                  </div>                
                </div>  
              </div>
              <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-full">
                {genders.map((gender) => <label key={gender} className="label cursor-pointer">
                <span className="label-text">{gender}</span>
                    <input
                      type="radio"
                      className="radio"
                      name="gender"
                      value={gender}
                      onChange={() => handleGenderChange(gender)}
                    />
                  </label>)}
              </ul>
            </div>

          <div className="card-actions justify-end">
            <Link href="/psych_profile">
            <button className="btn btn-outline border-2" style={{borderColor:okb_colors.light_blue,}}>Cancel</button>
            </Link>
            
            <button className={`btn border-0`} style={{backgroundColor:okb_colors.light_blue}}>Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditPsychiatristProfile;