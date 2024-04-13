import NameGenderImageQuestionnaire from "./NameGenderImageQuestionnaire";
import PositionLanguageQuestionnaire from "./PositionLanguageQuestionnaire";
import SelectionQuestionnaire from "./SelectionQuestionnaire";

import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Gender, IPatient, IUser } from "@/schema";
import ProgressBar0 from '../../assets/progressbar0.svg';
import ProgressBar33 from '../../assets/progressbar33.svg';
import ProgressBar67 from '../../assets/progressbar67.svg';
import { db, signUpWithGoogle, logout } from "../../../firebase/firebase";
import { useAuth } from "../../../contexts/AuthContext";

const PsychQuestionnaire = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [gender, setGender] = useState<Gender>();
    const [image, setImage] = useState<string>("");
    const [position, setPosition] = useState<string>();
    const [checked, setChecked] = useState<{ [key: string]: boolean }>(
        { 'English': false, 'Twi': false, 'Fante': false, 'Ewe': false, 'Ga': false, 'Other': false });
    const [languages, setLanguages] = useState<string[]>([]);
    const [aboutYourself, setAboutYourself] = useState<string>("");
    const [aboutPosition, setAboutPosition] = useState<string>("");
    const [check, setCheck] = useState({
        psychiatrist: false,
        nurse: false,
        Other: false,})
    const [patient, setPatient] = useState<boolean>(false);
    const [psychiatrist, setPsychiatrist] = useState<boolean>(false);
    const router = useRouter();
    const { user } = useAuth();

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
            case 'other':
                setGender(Gender.Other);
                break;
            default:
                setGender(undefined);
        }
    };

    const handleAboutYourselfChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setAboutYourself(event.target.value);
    }


    const handlePosition = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedPosition = (event.target.value);
        switch (selectedPosition) {
            case 'psychiatrist':
                setPosition("psychiatrist");
                break;
            case 'nurse':
                setPosition("nurse");
                break;
            case 'other':
                setPosition('other');
                break;
            default:
                setPosition("")
        }
    }
      

      const handleAboutPosition = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setAboutPosition(event.target.value);
      };

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

    const handleOptionChange = (option: 'patient' | 'psychiatrist') => {
        if (option === 'patient') {
            setPatient(true);
            setPsychiatrist(false);
        } else {
            setPatient(false);
            setPsychiatrist(true);
        }
    }

    const goBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const goNext = async () => {
        if (currentStep === 1 && (patient === false && psychiatrist === false)) {
            alert("Please select either patient or psychiatrist");
            return;
        }
        if (currentStep === 1 && patient) {
            router.push('/patient_questionnaire');
        }

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

        if (currentStep === 3) {
            console.log("adding to database");
            try {
                await signUpWithGoogle(
                    "psychiatrist",
                    firstName,
                    lastName,
                    position,
                    image,
                    [],
                    gender,
                    "",
                    languages,
                    [],
                    aboutYourself,
                    "",
                    "",
                    "",
                    "",
                    "",
                    [],
                    gender,
                    [],
                )
                router.push('/loading?init=true');
            } catch (error) {
                console.error('Error signing in:', error);
                logout();
            }
        }
    };

    return (
        <div className={'flex flex-col bg-off-white'}>
            {currentStep === 1 && <SelectionQuestionnaire
                patient={patient}
                psychiatrist={psychiatrist}
                onChange={handleOptionChange}
            />}
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
                    handleAboutPosition={handleAboutPosition}
                    handleAboutYourself={handleAboutYourselfChange}
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