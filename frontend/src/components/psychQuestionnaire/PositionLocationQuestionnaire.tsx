import { ChangeEvent, useEffect, useState } from 'react';
import okb_colors from "@/colors";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import { TextField } from '@mui/material';

interface QuestionnaireProps {
    position: string;
    setPosition;
    isOtherPositionSelected: boolean;
    otherPosition: string;
    handleOtherPosition: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    location: string;
    handleLocation: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    aboutYourself: string;
    handleAboutYourself: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    checkedLanguages: { [key: string]: boolean };
    setCheckedLanguages: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
    isOtherLanguageSelected: boolean;
    otherLanguage: string;
    handleOtherLanguage: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    checkedAvailability: { [key: string]: boolean };
    handleWeeklyAvailability;
    workingHours;
    handleWorkingHoursChange;
    handlePosition: (event: ChangeEvent<HTMLInputElement>) => void;
    handleLanguages: (event: ChangeEvent<HTMLInputElement>) => void;
    calendlyLink: string;
    handleCalendly: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const PositionLocationQuestionnaire = ({ position, setPosition, isOtherPositionSelected, otherPosition,
    handleOtherPosition, location, handleLocation, aboutYourself, handleAboutYourself,
    checkedLanguages, setCheckedLanguages, isOtherLanguageSelected, otherLanguage, handleOtherLanguage,
    checkedAvailability, handleWeeklyAvailability, workingHours, handleWorkingHoursChange, handlePosition, handleLanguages, calendlyLink, handleCalendly }: QuestionnaireProps) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={`w-full h-full flex flex-wrap flex-col justify-start gap-y-7 py-8 px-9 pb-0`}>

            {/* Current Position */}
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
                    <FormControlLabel control={<Radio value={`Psychologist`} />} className={` ml-1 `} label={
                        <span style={{ fontWeight: 300, fontSize: 18 }}>
                            Psychologist
                        </span>
                    } />
                    <FormControlLabel control={<Radio value={`Mental Health Nurse`} />} className={` ml-1 `} label={
                        <span style={{ fontWeight: 300, fontSize: 18 }}>
                            Mental Health Nurse
                        </span>
                    } />
                    <FormControlLabel control={<Radio value={`Counselor`} />} className={` ml-1 `} label={
                        <span style={{ fontWeight: 300, fontSize: 18 }}>
                            Counselor
                        </span>
                    } />
                    <FormControlLabel control={<Radio value={`Other`} />} className={` ml-1 `} label={
                        <span style={{ fontWeight: 300, fontSize: 18 }}>
                            Other
                        </span>
                    } />
                    {isOtherPositionSelected && (
                        <div className='flex items-center justify-start w-full gap-3'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="4" height="50" viewBox="0 0 4 50" fill="none">
                                <path d="M2 2L2.00001 202" stroke="#519AEB" stroke-width="3" stroke-linecap="round" />
                            </svg>
                            <textarea
                                value={otherPosition}
                                onChange={handleOtherPosition}
                                placeholder="Type here"
                                className={`input input-bordered resize-none w-full md:w-3/4 lg:w-1/2 border-2 rounded-2xl font-montserrat placeholder:italic py-2.5 px-6`}
                                style={{
                                    borderColor: okb_colors.light_blue
                                }}
                            />
                        </div>
                    )}
                </RadioGroup>
            </FormControl>

            {/* Work Location */}
            <div className='flex flex-col gap-y-3'>
                <span className={`text-lg font-semibold font-montserrat`}>Where do you work? <span className={`text-lg text-red-600`}>*</span></span>
                <div className='flex items-center justify-start w-full gap-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="50" viewBox="0 0 4 50" fill="none">
                        <path d="M2 2L2.00001 202" stroke="#519AEB" stroke-width="3" stroke-linecap="round" />
                    </svg>
                    <textarea
                        value={location}
                        onChange={handleLocation}
                        placeholder="Type here"
                        className={`input input-bordered resize-none w-full md:w-3/4 lg:w-1/2 border-2 rounded-2xl font-montserrat placeholder:italic py-2.5 px-6`}
                        style={{
                            borderColor: okb_colors.light_blue,
                        }}
                    />
                </div>
            </div>

            {/* About Yourself Description */}
            <div className='flex flex-col gap-y-3'>
                <span className={`text-lg font-semibold font-montserrat`}>Tell us and your patients about yourself. <span className={`text-lg text-red-600`}>*</span></span>
                <div className='flex items-center justify-start w-full gap-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="140" viewBox="0 0 4 140" fill="none">
                        <path d="M2 2L2.00001 202" stroke="#519AEB" stroke-width="3" stroke-linecap="round" />
                    </svg>
                    <textarea
                        value={aboutYourself}
                        onChange={handleAboutYourself}
                        placeholder="Type here"
                        className={`input input-bordered resize-none w-full md:w-3/4 lg:w-1/2 border-2 rounded-2xl font-montserrat placeholder:italic py-3 px-6`}
                        style={{
                            borderColor: okb_colors.light_blue,
                            height: 150,
                        }}
                    />
                </div>
            </div>

            {/* Languages Spoken */}
            <FormGroup className='gap-y-3'>
                <div className={`flex flex-row`}>
                    <span className={`text-lg font-semibold font-montserrat`}>What language(s) do you speak? <span className={`text-lg text-red-600`}>*</span></span>
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
                {isOtherLanguageSelected && (
                    <div className='flex items-center justify-start w-full gap-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="4" height="50" viewBox="0 0 4 50" fill="none">
                            <path d="M2 2L2.00001 202" stroke="#519AEB" stroke-width="3" stroke-linecap="round" />
                        </svg>
                        <textarea
                            value={otherLanguage}
                            onChange={handleOtherLanguage}
                            placeholder="Type here"
                            className={`input input-bordered resize-none w-full md:w-3/4 lg:w-1/2 border-2 rounded-2xl font-montserrat placeholder:italic py-2.5 px-6`}
                            style={{
                                borderColor: okb_colors.light_blue
                            }}
                        />
                    </div>
                )}
            </FormGroup>

            {/* Calendly Link */}
            <div className='flex flex-col gap-y-3'>
                <span className={`text-lg font-semibold font-montserrat`}>What is your Calendly link? <span className={`text-lg text-red-600`}>*</span></span>
                <div className='flex items-center justify-start w-full gap-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="50" viewBox="0 0 4 50" fill="none">
                        <path d="M2 2L2.00001 202" stroke="#519AEB" stroke-width="3" stroke-linecap="round" />
                    </svg>
                    <textarea
                        value={calendlyLink}
                        onChange={handleCalendly}
                        placeholder="Type here"
                        className={`input input-bordered resize-none w-full md:w-3/4 lg:w-1/2 border-2 rounded-2xl font-montserrat placeholder:italic py-2.5 px-6`}
                        style={{
                            borderColor: okb_colors.light_blue,
                            height: 50,
                        }}
                    />
                </div>
            </div>

            {/* Working Hours */}
            {/* <div className='flex flex-col gap-y-3'>
                <span className={`text-lg font-semibold font-montserrat`}>What are your working hour(s)? <span className={`text-lg text-red-600`}>*</span></span>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                    <div key={day} className='flex flex-col gap-3'>
                        <FormControlLabel
                            control={<Checkbox checked={checkedAvailability[day]} value={day} onChange={handleWeeklyAvailability} />}
                            className='ml-1'
                            label={<span style={{ fontWeight: 300, fontSize: 18 }}>{day}</span>}
                        />
                        {checkedAvailability[day] && (
                            <div className='flex flex-row gap-3 ml-6'>
                                <TextField
                                    label="Start Time"
                                    type="time"
                                    value={workingHours[day]?.start || ''}
                                    onChange={(e) => handleWorkingHoursChange(day, 'start', e.target.value)}
                                    InputLabelProps={{ shrink: true, className: 'font-montserrat' }}
                                    inputProps={{ step: 300 }}
                                />
                                <TextField
                                    label="End Time"
                                    type="time"
                                    value={workingHours[day]?.end || ''}
                                    onChange={(e) => handleWorkingHoursChange(day, 'end', e.target.value)}
                                    InputLabelProps={{ shrink: true, className: 'font-montserrat' }}
                                    inputProps={{ step: 300 }}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div> */}
        </div>
    )
};

export default PositionLocationQuestionnaire;