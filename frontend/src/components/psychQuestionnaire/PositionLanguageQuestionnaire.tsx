// 2nd page of the Questionnaire
import { ChangeEvent } from 'react';
import okb_colors from "@/colors";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';

interface QuestionnaireProps {
    setPosition: string;
    languages: string[];
    aboutYourself: string;
    location: string;
    handleLocation: (event: ChangeEvent<HTMLTextAreaElement>) => void
    handleAboutYourself: (event: ChangeEvent<HTMLTextAreaElement>) => void
    setLanguages: React.Dispatch<React.SetStateAction<string[]>>;
    checkedLanguages: { [key: string]: boolean };
    setCheckedLanguages: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
    checkedAvailability: { [key: string]: boolean };
    setCheckedAvailability: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
    handleLanguages: (event: ChangeEvent<HTMLInputElement>) => void;
    handleWeeklyAvailability: (event: ChangeEvent<HTMLInputElement>) => void;
    handlePosition: (event: ChangeEvent<HTMLInputElement>) => void;
    // calendlyLink: string;
    // handleCalendly: (event: ChangeEvent<HTMLTextAreaElement>) => void;

}
//2nd page of questionnaire
const PositionLanguageQuestionnaire = ({ setPosition, languages, location, handleLocation, checkedAvailability, setCheckedAvailability, handleWeeklyAvailability, aboutYourself, setLanguages, checkedLanguages, handleAboutYourself, setCheckedLanguages, handleLanguages, handlePosition }: QuestionnaireProps) => {

    return (
        <div className={`w-full h-full flex flex-wrap flex-col justify-start gap-y-7 py-8 px-9 pb-0`}>
            <FormControl>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    defaultValue={setPosition = ""}
                    onChange={handlePosition}
                    className='p-2.5 gap-2.5'>
                    <div className={`flex flex-row gap-1`}>
                        <span className={`text-lg font-semibold font-montserrat`}>What is your current position? <span className={`text-lg text-red-600`}>*</span></span>
                    </div>
                    <FormControlLabel control={<Radio value={`Psychiatrist`} />} className={` ml-1 `} label={
                        <span style={{ fontWeight: 300, fontSize: 18 }}>
                            Psychiatrist
                        </span>
                    } />
                    <FormControlLabel control={<Radio value={`Nurse`} />} className={` ml-1 `} label={
                        <span style={{ fontWeight: 300, fontSize: 18 }}>
                            Nurse
                        </span>
                    } />
                </RadioGroup>
            </FormControl>
            <div>
                <span className={`text-lg font-semibold font-montserrat`}>Where do you work?</span>
                <span className={`text-lg text-red-600`}>*</span>
                <textarea
                    value={location}
                    onChange={handleLocation}
                    placeholder="Type here"
                    className={`input input-bordered w-full mr-3 border-2 rounded-2xl`}
                    style={{
                        borderColor: okb_colors.light_blue,
                    }}
                />
            </div>
            <div className='flex flex-col gap-y-3'>
                <span className={`text-lg font-semibold font-montserrat`}>Tell us and your patients about yourself.</span><span className={`text-lg text-red-600`}>*</span>
                <div className='flex items-center justify-start w-full gap-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="140" viewBox="0 0 4 140" fill="none">
                        <path d="M2 2L2.00001 202" stroke="#519AEB" stroke-width="3" stroke-linecap="round" />
                    </svg>
                    <textarea
                        value={aboutYourself}
                        onChange={handleAboutYourself}
                        placeholder="Type here"
                        className={`input input-bordered resize-none w-full md:w-3/4 lg:w-1/2 border-2 rounded-2xl placeholder:italic py-3 px-6`}
                        style={{
                            borderColor: okb_colors.light_blue,
                            height: 150,
                        }}
                    />
                </div>
            </div>
            {/* <div className='flex flex-col gap-y-3'>
                <span className={`text-lg font-semibold font-montserrat`}>What is your Calendly link?</span>
                <div className='flex items-center justify-start w-full gap-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="50" viewBox="0 0 4 140" fill="none">
                        <path d="M2 2L2.00001 202" stroke="#519AEB" strokeWidth="9" strokeLinecap="round" />
                    </svg>
                    <textarea
                        value={calendlyLink}
                        onChange={handleCalendly}
                        placeholder="Type here"
                        className={`input input-bordered resize-none w-full md:w-3/4 lg:w-1/2 border-2 rounded-2xl italic py-3 px-6`}
                        style={{
                            borderColor: okb_colors.light_blue,
                            height: 50,
                        }}
                    />
                </div>
            </div> */}
            <FormGroup className='gap-y-3'>
                <div className={`flex flex-row`}>
                    <span className={`text-lg font-semibold font-montserrat`}>What languages do you speak? <span className={`text-lg text-red-600`}>*</span></span>
                </div>
                <FormControlLabel control={<Checkbox defaultChecked={checkedLanguages.English} checked={checkedLanguages['English']} value={`English`} onChange={handleLanguages} />} className={` ml-1 `} label={
                    <span style={{ fontWeight: 300, fontSize: 18 }}>
                        English
                    </span>
                } />
                <FormControlLabel control={<Checkbox defaultChecked={checkedLanguages.Twi} checked={checkedLanguages['Twi']} value={`Twi`} onChange={handleLanguages} />} className={` ml-1 `} label={
                    <span style={{ fontWeight: 300, fontSize: 18 }}>
                        Twi
                    </span>
                } />
                <FormControlLabel control={<Checkbox defaultChecked={checkedLanguages.Fante} checked={checkedLanguages['Fante']} value={`Fante`} onChange={handleLanguages} />} className={` ml-1 `} label={
                    <span style={{ fontWeight: 300, fontSize: 18 }}>
                        Fante
                    </span>
                } />
                <FormControlLabel control={<Checkbox defaultChecked={checkedLanguages.Ewe} checked={checkedLanguages['Ewe']} value={`Ewe`} onChange={handleLanguages} />} className={` ml-1 `} label={
                    <span style={{ fontWeight: 300, fontSize: 18 }}>
                        Ewe
                    </span>
                } />
                <FormControlLabel control={<Checkbox defaultChecked={checkedLanguages.Ga} checked={checkedLanguages['Ga']} value={`Ga`} onChange={handleLanguages} />} className={` ml-1 `} label={
                    <span style={{ fontWeight: 300, fontSize: 18 }}>
                        Ga
                    </span>
                } />
                <FormControlLabel control={<Checkbox defaultChecked={checkedLanguages.Other} checked={checkedLanguages['Other']} value={`Other`} onChange={handleLanguages} />} className={` ml-1 `} label={
                    <span style={{ fontWeight: 300, fontSize: 18 }}>
                        Other
                    </span>
                } />
            </FormGroup>
            <FormGroup>
                <div className={`flex flex-row gap-1`}>
                    <span className={`text-lg font-semibold font-montserrat`}>What days of the week are you typically available?</span>
                    <span className={`text-lg text-red-600`}>*</span>
                </div>
                <FormControlLabel control={<Checkbox defaultChecked={checkedAvailability.Monday} checked={checkedAvailability['Monday']} value={`Monday`} onChange={handleWeeklyAvailability} />} className={` ml-1 `} label={
                    <span style={{ fontWeight: 300, fontSize: 18 }}>
                        Monday
                    </span>
                } />
                <FormControlLabel control={<Checkbox defaultChecked={checkedAvailability.Tuesday} checked={checkedAvailability['Tuesday']} value={`Tuesday`} onChange={handleWeeklyAvailability} />} className={` ml-1 `} label={
                    <span style={{ fontWeight: 300, fontSize: 18 }}>
                        Tuesday
                    </span>
                } />
                <FormControlLabel control={<Checkbox defaultChecked={checkedAvailability.Wednesday} checked={checkedAvailability['Wednesday']} value={`Wednesday`} onChange={handleWeeklyAvailability} />} className={` ml-1 `} label={
                    <span style={{ fontWeight: 300, fontSize: 18 }}>
                        Wednesday
                    </span>
                } />
                <FormControlLabel control={<Checkbox defaultChecked={checkedAvailability.Thursday} checked={checkedAvailability['Thursday']} value={`Thursday`} onChange={handleWeeklyAvailability} />} className={` ml-1 `} label={
                    <span style={{ fontWeight: 300, fontSize: 18 }}>
                        Thursday
                    </span>
                } />
                <FormControlLabel control={<Checkbox defaultChecked={checkedAvailability.Friday} checked={checkedAvailability['Friday']} value={`Friday`} onChange={handleWeeklyAvailability} />} className={` ml-1 `} label={
                    <span style={{ fontWeight: 300, fontSize: 18 }}>
                        Friday
                    </span>
                } />
                <FormControlLabel control={<Checkbox defaultChecked={checkedAvailability.Saturday} checked={checkedAvailability['Saturday']} value={`Saturday`} onChange={handleWeeklyAvailability} />} className={` ml-1 `} label={
                    <span style={{ fontWeight: 300, fontSize: 18 }}>
                        Saturday
                    </span>
                } />
                <FormControlLabel control={<Checkbox defaultChecked={checkedAvailability.Sunday} checked={checkedAvailability['Sunday']} value={`Sunday`} onChange={handleWeeklyAvailability} />} className={` ml-1 `} label={
                    <span style={{ fontWeight: 300, fontSize: 18 }}>
                        Sunday
                    </span>
                } />
            </FormGroup>
        </div >
    )
};

export default PositionLanguageQuestionnaire;