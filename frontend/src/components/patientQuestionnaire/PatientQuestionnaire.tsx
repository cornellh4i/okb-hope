import NameGenderImageQuestionnaire from "./NameGenderImageQuestionnaire";
import AgeLanguageQuestionnaire from "./AgeLanguageQuestionnaire";
import HistoryQuestionnaire from "./HistoryQuestionnaire";

import React, { ChangeEvent, useEffect, useState } from 'react';
import { Gender } from "@/schema";
import ProgressBar25 from '../../assets/progressbar25.svg';
import ProgressBar50 from '../../assets/progressbar50.svg';
import ProgressBar75 from '../../assets/progressbar75.svg';

const PatientQuestionnaire = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [firstName,  setFirstName] = useState<string>("");
    const [lastName,  setLastName] = useState<string>("");
    const [gender,  setGender] = useState<Gender>();
    const [image,  setImage] = useState<string>("");

    const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
      }
    
    const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
    }

    const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedValue = event.target.value;
        switch (selectedValue) {
            case 'male':
            setGender(Gender.Male);
            break;
            case 'female':
            setGender(Gender.Female);
            break;
            default:
            setGender(undefined);
        }
    };

    const goBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const goNext = () => {
        // Validation for step 1: Ensure first and last names are filled
        if (currentStep === 1 && (firstName.trim() === "" || lastName.trim() === "")) {
            alert("Please fill out both first and last name.");
            return;
        }

        // Proceed to the next step if the current step is less than the total number of steps
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }
    };

    return (
        <div className={'flex flex-col bg-off-white'}>
            {currentStep === 1 && 
            <NameGenderImageQuestionnaire 
                firstName={firstName}
                lastName={lastName}
                gender={gender}
                image={image}
                handleFirstName={handleFirstNameChange}
                handleLastName={handleLastNameChange}
                handleGender={handleGenderChange}
            />}
            {currentStep === 2 && <AgeLanguageQuestionnaire/>}
            {currentStep === 3 && <HistoryQuestionnaire/>}
            <div className={`flex flex-row w-full content-center justify-center items-center gap-4 pb-3`}>
                <div className={`px-6 py-2 rounded-[10px] border-2 border-blue-400 items-start inline-flex`} onClick={goBack}>
                    <div className={`text-zinc-600 font-semibold font-montserrat`}>Go Back</div>
                </div>
                {currentStep === 1 && <ProgressBar25 />}
                {currentStep === 2 && <ProgressBar50 />}
                {currentStep === 3 && <ProgressBar75 />}
                <div className={`px-4 py-2 bg-blue-400 rounded-[10px] justify-start items-start inline-flex`} onClick={goNext}>
                    <div className={`text-white text-base font-semibold font-montserrat`}>Next</div>
                </div>
            </div>
        </div>
    )
};

export default PatientQuestionnaire