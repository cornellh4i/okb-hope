import NameGenderImageQuestionnaire from "./NameGenderImageQuestionnaire";
import PositionLanguageQuestionnaire from "./PositionLanguageQuestionnaire";
import SelectionQuestioinnaire from "./SelectionQuestionnaire";

import React, { ChangeEvent, useEffect, useState } from 'react';
import { Gender } from "@/schema";
import ProgressBar0 from '../../assets/progressbar0.svg';
import ProgressBar33 from '../../assets/progressbar33.svg';
import ProgressBar67 from '../../assets/progressbar67.svg';





const PsychQuestionnaire = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [gender, setGender] = useState<Gender>();
    const [image, setImage] = useState<string>("");
    const [position, setPosition] = useState<string>("");
    const [checked, setChecked] = useState<{ [key: string]: boolean }>(
        { 'english': false, 'twi': false, 'fante': false, 'ewe': false, 'ga': false, 'other': false });
    const [languages, setLanguages] = useState<string[]>([]);
    const [aboutYourself, setAboutYourself] = useState<string>("");

    const [prevExp, setPrevExp] = useState<string>("");
    const [prevExpTime, setPrevExpTime] = useState<string>("");
    const [concerns, setConcerns] = useState<string>("");

    const [patient, setPatient] = useState<boolean>(false);
    const [psychiatrist, setPsychiatrist] = useState<boolean>(false);

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

    const handlePosition = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedPosition = (event.target.value);
        switch (selectedPosition) {
            case 'psychiatrist':
                setPosition("psychiatrist");
                break;
            case 'nurse':
                setPosition("nurse");
                break;
            default:
                setPosition("")
        }
    }

    const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
        const lang = event.target.value;
        const newChecked = {
            ...checked,
            [lang]: !checked[lang]
        };
        setChecked(newChecked);

        if (newChecked[lang]) {
            setLanguages([...languages, lang]);
        } else {
            setLanguages(languages.filter(element => element !== lang));
        }

        console.log(languages);
        console.log(newChecked);
    };

    const handlePrevExpChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPrevExp(event.target.value);
    }
    const handlePrevExpTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPrevExpTime(event.target.value);
    }
    const handleConcernsChange = (event: ChangeEvent<HTMLInputElement>) => {
        setConcerns(event.target.value);
    }

    const goBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const goNext = () => {
        if (currentStep === 2 && (firstName.trim() === "" || lastName.trim() === "")) {
            alert("Please fill out both first and last name.");
            return;
        }

        else if (currentStep === 2 && (gender === undefined)) {
            alert("Please choose your gender.");
            return;
        }

        else if (currentStep === 3 && (position === "")) {
            alert("Please select your position.");
            return;
        }

        else if (currentStep === 3 && (languages.length === 0)) {
            alert("Please select your language(s).");
            return;
        }

        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }
    };

    return (
        <div className={'flex flex-col bg-off-white'}>
            {currentStep === 1 && <SelectionQuestioinnaire patient={patient} psychiatrist={psychiatrist} />}
            {currentStep === 2 &&
                <NameGenderImageQuestionnaire
                    firstName={firstName}
                    lastName={lastName}
                    gender={gender}
                    image={image}
                    handleFirstName={handleFirstNameChange}
                    handleLastName={handleLastNameChange}
                    handleGender={handleGenderChange}
                />}
            {currentStep === 3 &&
                <PositionLanguageQuestionnaire
                    setPosition={position}
                    languages={languages}
                    aboutYourself={aboutYourself}
                    setLanguages={setLanguages}
                    checked={checked}
                    setChecked={setChecked}
                    handleCheck={handleCheck}
                    handlePosition={handlePosition}
                />}
            <div className={`flex flex-row w-full content-center justify-center items-center gap-4 pb-3`}>
                <div className={`px-6 py-2 rounded-[10px] border-2 border-blue-400 items-start inline-flex`} onClick={goBack}>
                    <div className={`text-zinc-600 font-semibold font-montserrat`}>Go Back</div>
                </div>
                {currentStep === 1 && <ProgressBar0 />}
                {currentStep === 2 && <ProgressBar33 />}
                {currentStep === 3 && <ProgressBar67 />}
                <div className={`px-4 py-2 bg-blue-400 rounded-[10px] justify-start items-start inline-flex`} onClick={goNext}>
                    <div className={`text-white text-base font-semibold font-montserrat`}>Next</div>
                </div>
            </div>
        </div>
    )
};

export default PsychQuestionnaire