import NameGenderImageQuestionnaire from "./NameGenderImageQuestionnaire";
import AgeLanguageQuestionnaire from "./AgeLanguageQuestionnaire";
import HistoryQuestionnaire from "./HistoryQuestionnaire";

import React, { ChangeEvent, useEffect, useState } from 'react';
import { Gender } from "@/schema";
import { useRouter } from 'next/router';

import { signUpWithGoogle, logout, uploadProfilePic, getUidByName  } from "../../../firebase/firebase";

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

    const [prefLanguages, setPrefLanguages] = useState<string[]>([]);
    const [checkedLanguages, setCheckedLanguages] = useState<{ [key: string]: boolean }>(
        { 'English': false, 'Twi': false, 'Fante': false, 'Ewe': false, 'Ga': false, 'Other': false });
    const [isOtherLanguageSelected, setIsOtherLanguageSelected] = useState(false);
    const [otherLanguage, setOtherLanguage] = useState("");

    const [prevExp, setPrevExp] = useState<string>("");
    const [prevExpTime, setPrevExpTime] = useState<string>("");

    const [concerns, setConcerns] = useState<string[]>([]);
    const [checkedConcerns, setCheckConcerns] = useState<{ [key: string]: boolean }>(
        { 'MyRelationships': false, 'Addiction': false, 'SuicidalThoughts': false, 'FamilyDistress': false, 'SubstanceAbuse': false, 'AcademicDistress': false, 'SocialAnxiety': false, 'Depression': false });
    const [isOtherConcernSelected, setIsOtherConcernSelected] = useState(false);
    const [otherConcern, setOtherConcern] = useState("");

    const [isMobile, setIsMobile] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>('');

    const router = useRouter();

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

    const handleLanguages = (event: ChangeEvent<HTMLInputElement>) => {
        const lang = event.target.value;

        if (lang === "Other") {
            setIsOtherLanguageSelected(!isOtherLanguageSelected);
            setCheckedLanguages({
                ...checkedLanguages,
                Other: !isOtherLanguageSelected,
            });
            if (!isOtherLanguageSelected && otherLanguage) {
                setPrefLanguages(prevLanguages => {
                    const filteredLanguages = prevLanguages.filter(l => l !== otherLanguage);
                    return [...filteredLanguages, otherLanguage];
                });
            } else {
                setPrefLanguages(prevLanguages => prevLanguages.filter(l => l !== otherLanguage));
            }
        } else {
            const newCheckedLanguages = {
                ...checkedLanguages,
                [lang]: !checkedLanguages[lang]
            };
            setCheckedLanguages(newCheckedLanguages);

            if (newCheckedLanguages[lang]) {
                setPrefLanguages(prevLanguages => [...prevLanguages, lang]);
            } else {
                setPrefLanguages(prevLanguages => prevLanguages.filter(element => element !== lang));
            }
        }
    };

    const handleOtherLanguage = (event: ChangeEvent<HTMLTextAreaElement>) => {
        let newLanguage = event.target.value;

        if (newLanguage.length > 0) {
            newLanguage = newLanguage.charAt(0).toUpperCase() + newLanguage.slice(1);
        }
        setOtherLanguage(newLanguage);

        if (isOtherLanguageSelected) {
            setPrefLanguages(prevLanguages => {
                const filteredLanguages = prevLanguages.filter(l => l !== otherLanguage);
                return newLanguage ? [...filteredLanguages, newLanguage] : filteredLanguages;
            });
        }
    };

    const handlePrevExpChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPrevExp(event.target.value);
    }
    const handlePrevExpTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPrevExpTime(event.target.value);
    }

    const handleConcerns = (event: ChangeEvent<HTMLInputElement>) => {
        const concern = event.target.value;

        if (concern === "Other") {
            setIsOtherConcernSelected(!isOtherConcernSelected);
            setCheckConcerns({
                ...checkedConcerns,
                Other: !isOtherConcernSelected,
            });
            if (!isOtherConcernSelected && otherConcern) {
                setConcerns(prevConcerns => {
                    const filteredConcerns = prevConcerns.filter(c => c !== otherConcern);
                    return [...filteredConcerns, otherConcern];
                });
            } else {
                setConcerns(prevConcerns => prevConcerns.filter(c => c !== otherConcern));
            }
        } else {
            const newCheckedConcerns = {
                ...checkedConcerns,
                [concern]: !checkedConcerns[concern]
            };
            setCheckConcerns(newCheckedConcerns);

            if (newCheckedConcerns[concern]) {
                setConcerns(prevConcerns => [...prevConcerns, concern]);
            } else {
                setConcerns(prevConcerns => prevConcerns.filter(element => element !== concern));
            }
        }
    };

    const handleOtherConcern = (event: ChangeEvent<HTMLTextAreaElement>) => {
        let newConcern = event.target.value;

        if (newConcern.length > 0) {
            newConcern = newConcern.charAt(0).toUpperCase() + newConcern.slice(1);
        }
        setOtherConcern(newConcern);

        if (isOtherConcernSelected) {
            setConcerns(prevConcerns => {
                const filteredConcerns = prevConcerns.filter(c => c !== otherConcern);
                return newConcern ? [...filteredConcerns, newConcern] : filteredConcerns;
            });
        }
    };

    const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          setSelectedFile(file);
          setFileName(file.name);
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

        else if (currentStep === 2 && (isOtherLanguageSelected && otherLanguage === "")) {
            alert("You selected 'Other' for language(s) you speak. Please type in the other language(s).");
            return;
        }

        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }

        if (currentStep === 3) {
            if (prevExp === "" || prevExpTime === "") {
                alert("Please fill out the required question(s).")
            }
            else if (concerns.length === 0) {
                alert("Please select the concern(s) you would like to discuss.")
            } else if (isOtherConcernSelected && otherConcern === "") {
                alert("You selected 'Other' for concern(s). Please type in the other concern(s).");
                return;
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
                        "" //empty calendly
                    );

                    const uid = await getUidByName(firstName, lastName);

                    if (selectedFile && uid) {
                        await uploadProfilePic(selectedFile, uid, true);
                    }

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
                    selectedFile = {selectedFile}
                    fileName = {fileName}
                    handleFileSelect={handleFileSelect}
                    handleFirstName={handleFirstNameChange}
                    handleLastName={handleLastNameChange}
                    handleGender={handleGenderChange}
                />}
            {currentStep === 2 &&
                <AgeLanguageQuestionnaire
                    age={age}
                    checkedLanguages={checkedLanguages}
                    isOtherLanguageSelected={isOtherLanguageSelected}
                    otherLanguage={otherLanguage}
                    handleOtherLanguage={handleOtherLanguage}
                    handleAge={handleAgeChange}
                    handleLanguages={handleLanguages}
                />}
            {currentStep === 3 && <HistoryQuestionnaire
                prevExp={prevExp}
                prevExpTime={prevExpTime}
                checkedConcerns={checkedConcerns}
                isOtherConcernSelected={isOtherConcernSelected}
                otherConcern={otherConcern}
                handleOtherConcern={handleOtherConcern}
                setConcerns={setConcerns}
                handlePrevExp={handlePrevExpChange}
                handlePrevExpTime={handlePrevExpTimeChange}
                handleConcerns={handleConcerns}
            />}
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