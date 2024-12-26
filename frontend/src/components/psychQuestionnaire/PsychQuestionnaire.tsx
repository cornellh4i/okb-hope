import NameGenderImageQuestionnaire from "./NameGenderImageQuestionnaire";
import PositionLocationQuestionnaire from "./PositionLocationQuestionnaire";
import SelectionQuestionnaire from "./SelectionQuestionnaire";

import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Gender, IPatient, IUser } from "@/schema";
import ProgressBar0 from '../../assets/progressbar0.svg';
import ProgressBar33 from '../../assets/progressbar33.svg';
import ProgressBar67 from '../../assets/progressbar67.svg';
import { db, signUpWithGoogle, logout, uploadProfilePic, getUidByName } from "../../../firebase/firebase";
import { useAuth } from "../../../contexts/AuthContext";

const PsychQuestionnaire = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [gender, setGender] = useState<Gender>();
    const [image, setImage] = useState<string>("");
    const [position, setPosition] = useState<string>("");
    const [isOtherPositionSelected, setIsOtherPositionSelected] = useState(false);
    const [otherPosition, setOtherPosition] = useState("");
    const [checkedPosition, setCheckedPosition] = useState({ psychiatrist: false, nurse: false, Other: false, });
    const [checkedLanguages, setCheckedLanguages] = useState<{ [key: string]: boolean }>(
        { 'English': false, 'Twi': false, 'Fante': false, 'Ewe': false, 'Ga': false, 'Other': false });
    const [languages, setLanguages] = useState<string[]>([]);
    const [isOtherLanguageSelected, setIsOtherLanguageSelected] = useState(false);
    const [otherLanguage, setOtherLanguage] = useState("");
    const [weeklyAvailability, setWeeklyAvailability] = useState<string[]>([]);
    const [checkedAvailability, setCheckedAvailability] = useState<{ [key: string]: boolean }>(
        { 'Monday': false, 'Tuesday': false, 'Wednesday': false, 'Thursday': false, 'Friday': false, 'Saturday': false, 'Sunday': false });
    const [workingHours, setWorkingHours] = useState({
        Monday: { start: '', end: '' },
        Tuesday: { start: '', end: '' },
        Wednesday: { start: '', end: '' },
        Thursday: { start: '', end: '' },
        Friday: { start: '', end: '' },
        Saturday: { start: '', end: '' },
        Sunday: { start: '', end: '' },
    });
    const [aboutYourself, setAboutYourself] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [patient, setPatient] = useState<boolean>(false);
    const [psychiatrist, setPsychiatrist] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState(false);
    const [calendly, setCalendly] = useState<string>("");
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

    const handleAboutYourselfChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setAboutYourself(event.target.value);
    }

    const handleLocationChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const selectedLocation = (event.target.value);
        const loc = selectedLocation.split(' ');
        const fixCase = loc.map(loc => loc.charAt(0).toUpperCase() + loc.slice(1).toLowerCase()
        );
        const result = fixCase.join(' ');
        setLocation(result);
    };


    const handlePosition = (event) => {
        const selectedPosition = event.target.value;
        if (selectedPosition === 'Other') {
            setIsOtherPositionSelected(true);
            setPosition(otherPosition);
        } else {
            setIsOtherPositionSelected(false);
            setPosition(selectedPosition);
        }
    };

    const handleOtherPosition = (event) => {
        setOtherPosition(event.target.value);
        setPosition(event.target.value);
    };

    const handleLanguages = (event: ChangeEvent<HTMLInputElement>) => {
        const lang = event.target.value;

        if (lang === "Other") {
            setIsOtherLanguageSelected(!isOtherLanguageSelected);
            setCheckedLanguages({
                ...checkedLanguages,
                Other: !isOtherLanguageSelected,
            });
            if (!isOtherLanguageSelected && otherLanguage) {
                setLanguages(prevLanguages => {
                    const filteredLanguages = prevLanguages.filter(l => l !== otherLanguage);
                    return [...filteredLanguages, otherLanguage];
                });
            } else {
                setLanguages(prevLanguages => prevLanguages.filter(l => l !== otherLanguage));
            }
        } else {
            const newCheckedLanguages = {
                ...checkedLanguages,
                [lang]: !checkedLanguages[lang]
            };
            setCheckedLanguages(newCheckedLanguages);

            if (newCheckedLanguages[lang]) {
                setLanguages(prevLanguages => [...prevLanguages, lang]);
            } else {
                setLanguages(prevLanguages => prevLanguages.filter(element => element !== lang));
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
            setLanguages(prevLanguages => {
                const filteredLanguages = prevLanguages.filter(l => l !== otherLanguage);
                return newLanguage ? [...filteredLanguages, newLanguage] : filteredLanguages;
            });
        }
    };

    const handleWorkingHoursChange = (day: string, type: 'start' | 'end', value: string) => {
        setWorkingHours(prevState => ({
            ...prevState,
            [day]: {
                ...prevState[day],
                [type]: value
            }
        }));
    };

    const handleWeeklyAvailability = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;

        // Update checkedAvailability state
        setCheckedAvailability(prevState => ({
            ...prevState,
            [value]: checked
        }));

        // If the day is unchecked, reset its working hours
        if (!checked) {
            setWorkingHours(prevState => ({
                ...prevState,
                [value]: { start: '', end: '' }
            }));
        }

        // Update weeklyAvailability state
        setWeeklyAvailability(prevState => {
            if (checked) {
                return [...prevState, value];
            } else {
                return prevState.filter(day => day !== value);
            }
        });
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

    const handleCalendly = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setCalendly(event.target.value);
    }

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
            alert("Please select your current position.");
            return;
        }

        else if (currentStep === 3 && (location.length === 0)) {
            alert("Please fill out the 'Where do you work?' section.");
            return;
        }

        else if (currentStep === 3 && (aboutYourself.length === 0)) {
            alert("Please fill out the 'About Yourself' section.");
            return;
        }

        else if (currentStep === 3 && (languages.length === 0)) {
            alert("Please select your language(s).");
            return;
        }

        else if (currentStep === 3 && (isOtherLanguageSelected && otherLanguage === "")) {
            alert("You selected 'Other' for language(s) you speak. Please type in the other language(s).");
            return;
        }

        else if (currentStep === 3 && (calendly  === "")) {
            alert("Please create a Calendly account and paste in your meeting link.");
            return;
        }

        // else if (currentStep === 3) {
        //     const allDaysUnchecked = Object.values(checkedAvailability).every(checked => !checked);
        //     const incompleteHours = Object.entries(workingHours).some(
        //         ([day, hours]) => checkedAvailability[day] && (hours.start === '' || hours.end === '')
        //     );

        //     if (allDaysUnchecked) {
        //         alert("Please select at least one day for your availability.");
        //         return;
        //     }

        //     if (incompleteHours) {
        //         alert("Please select your working hour(s) for the selected days.");
        //         return;
        //     }
        // }

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
                    gender,
                    location,
                    languages, //language
                    weeklyAvailability, //weeklyAvailability
                    workingHours, //workingHours
                    [], //specialty
                    aboutYourself, //description
                    [], //concerns
                    "", //ageRange
                    "", //lastTherapyTimeframe
                    "", //previousTherapyExperience
                    [], //prefLanguages
                    gender, //genderPref
                    [], //savedPsychiatrists
                    calendly
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
    };

    return (
        <div className={'flex flex-col bg-off-white gap-y-6 md:gap-y-9'}>
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
                    selectedFile = {selectedFile}
                    fileName = {fileName}
                    handleFileSelect={handleFileSelect}
                    handleFirstName={handleFirstNameChange}
                    handleLastName={handleLastNameChange}
                    handleGender={handleGenderChange}
                />}
            {currentStep === 3 &&
                <PositionLocationQuestionnaire
                    position={position}
                    setPosition={setPosition}
                    isOtherPositionSelected={isOtherPositionSelected}
                    otherPosition={otherPosition}
                    handleOtherPosition={handleOtherPosition}
                    location={location}
                    handleLocation={handleLocationChange}
                    aboutYourself={aboutYourself}
                    handleAboutYourself={handleAboutYourselfChange}
                    checkedLanguages={checkedLanguages}
                    setCheckedLanguages={setCheckedLanguages}
                    isOtherLanguageSelected={isOtherLanguageSelected}
                    otherLanguage={otherLanguage}
                    handleOtherLanguage={handleOtherLanguage}
                    checkedAvailability={checkedAvailability}
                    handleWeeklyAvailability={handleWeeklyAvailability}
                    workingHours={workingHours}
                    handleWorkingHoursChange={handleWorkingHoursChange}
                    handlePosition={handlePosition}
                    handleLanguages={handleLanguages}
                    calendlyLink={calendly}
                    handleCalendly={handleCalendly}
                />}
            {!isMobile && (
                <>
                    <div className={`flex flex-row w-full content-center justify-center items-center gap-4 pb-3 mb-4`}>
                        <div className={`px-6 py-2 rounded-[10px] border-2 border-blue-400 items-start inline-flex`} onClick={goBack}>
                            <div className={`text-zinc-600 text-[14px] font-semibold font-montserrat`}>Go Back</div>
                        </div>
                        {currentStep === 1 && <ProgressBar0 />}
                        {currentStep === 2 && <ProgressBar33 />}
                        {currentStep === 3 && <ProgressBar67 />}
                        <div className={`px-4 py-2 bg-blue-400 rounded-[10px] justify-start items-start inline-flex`} onClick={goNext}>
                            <div className={`text-white text-base font-semibold font-montserrat`}>Next</div>
                        </div>
                    </div></>
            )}
            {isMobile && (
                <>
                    <div className={`flex flex-col w-full content-center justify-center items-center gap-4 pb-3`}>
                        <div className="flex justify-center">
                            {currentStep === 1 && <ProgressBar0 />}
                            {currentStep === 2 && <ProgressBar33 />}
                            {currentStep === 3 && <ProgressBar67 />}
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
                </>
            )}
        </div>
    )
};

export default PsychQuestionnaire