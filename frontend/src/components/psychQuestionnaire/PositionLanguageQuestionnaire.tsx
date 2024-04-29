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
    handleAboutYourself: (event: ChangeEvent<HTMLTextAreaElement>) => void
    setLanguages: React.Dispatch<React.SetStateAction<string[]>>;
    checked: { [key: string]: boolean };
    setChecked: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
    handleCheck: (event: ChangeEvent<HTMLInputElement>) => void;
    handlePosition: (event: ChangeEvent<HTMLInputElement>) => void;
    // calendlyLink: string;
    // handleCalendly: (event: ChangeEvent<HTMLTextAreaElement>) => void;

}
//2nd page of questionnaire
const PositionLanguageQuestionnaire = ({ setPosition, languages, aboutYourself, setLanguages, checked, handleAboutYourself, setChecked, handleCheck, handlePosition }: QuestionnaireProps) => {

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
                    <FormControlLabel control={<Radio checked={checked['psychiatrist']} value={`psychiatrist`} />} className={` ml-1 `} label={
                        <span style={{ fontWeight: 300, fontSize: 18 }}>
                            Psychiatrist
                        </span>
                    } />
                    <FormControlLabel control={<Radio checked={checked['nurse']} value={`nurse`} />} className={` ml-1 `} label={
                        <span style={{ fontWeight: 300, fontSize: 18 }}>
                            Nurse
                        </span>
                    } />
                </RadioGroup>
            </FormControl>
            <div className='flex flex-col gap-y-3'>
                <span className={`text-lg font-semibold font-montserrat`}>Tell us and your patients about yourself.</span>
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
                            height: 150,  // Set the desired height for your textarea
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
                <FormControlLabel control={<Checkbox defaultChecked={checked.English} checked={checked['English']} value={`English`} onChange={handleCheck} />} className={` ml-1 `} label={
                    <span style={{ fontWeight: 300, fontSize: 18 }}>
                        English
                    </span>
                } />
                <FormControlLabel control={<Checkbox defaultChecked={checked.Twi} checked={checked['Twi']} value={`Twi`} onChange={handleCheck} />} className={` ml-1 `} label={
                    <span style={{ fontWeight: 300, fontSize: 18 }}>
                        Twi
                    </span>
                } />
                <FormControlLabel control={<Checkbox defaultChecked={checked.Fante} checked={checked['Fante']} value={`Fante`} onChange={handleCheck} />} className={` ml-1 `} label={
                    <span style={{ fontWeight: 300, fontSize: 18 }}>
                        Fante
                    </span>
                } />
                <FormControlLabel control={<Checkbox defaultChecked={checked.Ewe} checked={checked['Ewe']} value={`Ewe`} onChange={handleCheck} />} className={` ml-1 `} label={
                    <span style={{ fontWeight: 300, fontSize: 18 }}>
                        Ewe
                    </span>
                } />
                <FormControlLabel control={<Checkbox defaultChecked={checked.Ga} checked={checked['Ga']} value={`Ga`} onChange={handleCheck} />} className={` ml-1 `} label={
                    <span style={{ fontWeight: 300, fontSize: 18 }}>
                        Ga
                    </span>
                } />
                <FormControlLabel control={<Checkbox defaultChecked={checked.Other} checked={checked['Other']} value={`Other`} onChange={handleCheck} />} className={` ml-1 `} label={
                    <span style={{ fontWeight: 300, fontSize: 18 }}>
                        Other
                    </span>
                } />
            </FormGroup>
        </div >
    )
};

export default PositionLanguageQuestionnaire;