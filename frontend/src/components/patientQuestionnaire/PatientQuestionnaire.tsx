import NameGenderImageQuestionnaire from "./NameGenderImageQuestionnaire";
import AgeLanguageQuestionnaire from "./AgeLanguageQuestionnaire";
import HistoryQuestionnaire from "./HistoryQuestionnaire";

import React, { ChangeEvent, useEffect, useState } from 'react';
import { Gender } from "@/schema";
import { useRouter } from 'next/router';

import { signUpWithGoogle, logout } from "../../../firebase/firebase";

import ProgressBar25 from '../../assets/progressbar25.svg';
import ProgressBar50 from '../../assets/progressbar50.svg';
import ProgressBar75 from '../../assets/progressbar75.svg';
import { useAuth } from "../../../contexts/AuthContext";

const PatientQuestionnaire = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [gender, setGender] = useState<Gender>();
    const [image, setImage] = useState<string>("");
    const [age, setAge] = useState<string>("");
    const [checked, setChecked] = useState<{ [key: string]: boolean }>(
        { 'english': false, 'twi': false, 'fante': false, 'ewe': false, 'ga': false, 'other': false });
    const [aboutConcerns, setAboutConcerns] = useState<string>("");
    const [prefLanguages, setPrefLanguages] = useState<string[]>([]);

    const [prevExp, setPrevExp] = useState<string>("");
    const [prevExpTime, setPrevExpTime] = useState<string>("");
    const [concerns, setConcerns] = useState<string[]>([]);
    const [check, setCheck] = useState<{ [key: string]: boolean }>(
        { 'MyRelationships': false, 'Addiction': false, 'SuicidalThoughts': false, 'FamilyDistress': false, 'SubstanceAbuse': false, 'AcademicDistress': false, 'SocialAnxiety': false, 'Depression': false, 'Other': false });

    const [isMobile, setIsMobile] = useState(false);
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
        // Set isMobile based on window.innerWidth after component mounts to the DOM
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize(); // Set the initial state based on current window width

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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

    const handleAgeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAge(event.target.value);
    }

    const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
        const lang = event.target.value;
        const newChecked = {
            ...checked,
            [lang]: !checked[lang]
        };
        setChecked(newChecked);

        if (newChecked[lang]) {
            setPrefLanguages([...prefLanguages, lang]);
        } else {
            setPrefLanguages(prefLanguages.filter(element => element !== lang));
        }
    };

    const handlePrevExpChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPrevExp(event.target.value);
    }
    const handlePrevExpTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPrevExpTime(event.target.value);
    }
    const handleChecks = (event: ChangeEvent<HTMLInputElement>) => {
        const concern = event.target.value;
        const newCheck = { ...check, [concern]: !check[concern] };

        setCheck(newCheck);

        if (newCheck[concern]) {
            setConcerns([...concerns, concern]);
        } else {
            setConcerns(concerns.filter(element => element !== concern));
        }
    };

    const handleAboutConcerns = (event) => {
        const newAboutConcerns = event.target.value;
        setAboutConcerns(newAboutConcerns);

        if (check.Other) {
            setConcerns(oldConcerns => {
                const filteredConcerns = oldConcerns.filter(concern => !concern.startsWith("Other"));
                if (newAboutConcerns.trim() !== "") {
                    filteredConcerns.push(`Other: ${newAboutConcerns}`);
                }
                return filteredConcerns;
            });
        }
    };

    const goBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        } else {
            router.push('/questionnaire');
        }
    };

    const goNext = async () => {
        if (currentStep === 1 && (firstName.trim() === "" || lastName.trim() === "")) {
            alert("Please fill out both first and last name.");
            return;
        }

        else if (currentStep === 1 && (gender === undefined)) {
            alert("Please choose your gender.");
            return;
        }

        else if (currentStep === 2 && (age === "")) {
            alert("Please select your age.");
            return;
        }

        else if (currentStep === 2 && (prefLanguages.length === 0)) {
            alert("Please select your preferred language(s).");
            return;
        }
     
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }

        if (currentStep === 3) {
            if (prevExp === "" || prevExpTime === "" || concerns.length === 0) {
                alert("Please fill out the required question(s).")
            } 
            else {
                console.log("adding to database");
                try {
                    await signUpWithGoogle(
                        "patient",
                        firstName,
                        lastName,
                        "", //position
                        image,
                        gender,
                        "", //location
                        [], //language
                        [], //weeklyAvailability
                        {}, //workingHours
                        [], //specialty
                        "", //description
                        concerns,
                        age,
                        prevExpTime,
                        prevExp, //ageRange
                        prefLanguages, //prefLanguages
                        gender, //genderPref
                        [], //savedPsychiatrists
                    );
                    router.push('/loading?init=true');
                } catch (error) {
                    console.error('Error signing in:', error);
                    logout();
                }
            }
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
            {currentStep === 2 &&
                <AgeLanguageQuestionnaire
                    age={age}
                    prefLanguages={prefLanguages}
                    setPrefLanguages={setPrefLanguages}
                    checked={checked}
                    setChecked={setChecked}
                    handleAge={handleAgeChange}
                    handleCheck={handleCheck}
                />}
            {currentStep === 3 && <HistoryQuestionnaire
                prevExp={prevExp}
                prevExpTime={prevExpTime}
                concerns={concerns}
                check={check}
                setCheck={setCheck}
                setConcerns={setConcerns}
                aboutConcerns={aboutConcerns}
                handleAboutConcerns={handleAboutConcerns}
                handlePrevExp={handlePrevExpChange}
                handlePrevExpTime={handlePrevExpTimeChange}
                handleChecks={handleChecks} />}
            {!isMobile && (
                <>
                    <div className={`flex flex-row w-full content-center justify-center items-center gap-4 pb-3 mb-4`}>
                        <div className={`px-6 py-2 rounded-[10px] border-2 border-blue-400 items-start inline-flex`} onClick={goBack}>
                            <div className={`text-zinc-600 text-[14px] font-semibold font-montserrat`}>Go Back</div>
                        </div>
                        {currentStep === 1 && <ProgressBar25 />}
                        {currentStep === 2 && <ProgressBar50 />}
                        {currentStep === 3 && <ProgressBar75 />}
                        <div className={`px-4 py-2 bg-blue-400 rounded-[10px] justify-start items-start inline-flex`} onClick={goNext}>
                            <div className={`text-white text-base font-semibold font-montserrat`}>Next</div>
                        </div>
                    </div>
                </>)}
            {isMobile && (
                <>
                    <div className={`flex flex-col w-full content-center justify-center items-center gap-4 pb-3`}>
                        <div className="flex justify-center">
                            {currentStep === 1 && <ProgressBar25 />}
                            {currentStep === 2 && <ProgressBar50 />}
                            {currentStep === 3 && <ProgressBar75 />}
                        </div>
                        <div className="flex gap-x-4 mb-4">
                            <div className={`px-4 py-1 rounded-[10px] border-2 border-blue-400 items-center inline-flex`} onClick={goBack}>
                                <div className={`text-zinc-600 text-[10px] md:text-[16px] font-semibold font-montserrat`}>Go Back</div>
                            </div>
                            <div className={`px-4 py-2 bg-blue-400 rounded-[10px] items-center inline-flex`} onClick={goNext}>
                                <div className={`text-white text-[10px] font-semibold font-montserrat`}>Next</div>
                            </div>
                        </div>
                    </div>
                </>)}
        </div>
    )
};

export default PatientQuestionnaire