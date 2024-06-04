// 2nd page of the Questionnaire
import { ChangeEvent, useEffect } from 'react';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import okb_colors from '@/colors';

interface QuestionnaireProps {
    age: string;
    checkedLanguages;
    isOtherLanguageSelected;
    otherLanguage;
    handleOtherLanguage;
    handleAge: (event: ChangeEvent<HTMLInputElement>) => void;
    handleLanguages: (event: ChangeEvent<HTMLInputElement>) => void;
}

const AgeLanguageQuestionnaire = ({ age, checkedLanguages, isOtherLanguageSelected, otherLanguage, handleOtherLanguage, handleAge, handleLanguages }: QuestionnaireProps) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    return (
        <div className={`w-full h-full flex flex-wrap flex-col justify-start gap-9 p-8`}>
            {/* Age */}
            <FormControl className='gap-y-2.5'>
                <div className={`flex flex-row gap-1`}>
                    <span className={`text-lg font-semibold font-montserrat`}>What is your age? <span className={`text-lg text-red-600`}>*</span></span>
                </div>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    defaultValue={age}
                    onChange={handleAge}
                    className={`flex flex-col gap-y-2.5`}
                >
                    <FormControlLabel className={` ml-1 `} value="18-24" control={<Radio />} label={
                        <span style={{ fontWeight: 300, fontSize: 18 }}>
                            18-24
                        </span>
                    } />
                    <FormControlLabel className={` ml-1 `} value="25-34" control={<Radio />} label={
                        <span style={{ fontWeight: 300, fontSize: 18 }}>
                            25-34
                        </span>
                    } />
                    <FormControlLabel className={` ml-1 `} value="35-44" control={<Radio />} label={
                        <span style={{ fontWeight: 300, fontSize: 18 }}>
                            35-44
                        </span>
                    } />
                    <FormControlLabel className={` ml-1 `} value="45-54" control={<Radio />} label={
                        <span style={{ fontWeight: 300, fontSize: 18 }}>
                            45-54
                        </span>
                    } />
                    <FormControlLabel className={` ml-1 `} value="55-64" control={<Radio />} label={
                        <span style={{ fontWeight: 300, fontSize: 18 }}>
                            55-64
                        </span>
                    } />
                    <FormControlLabel className={` ml-1 `} value="65 and over" control={<Radio />} label={
                        <span style={{ fontWeight: 300, fontSize: 18 }}>
                            65 and over
                        </span>
                    } />
                </RadioGroup>
            </FormControl>
            
            {/* Preferred Language(s) */}
            <FormGroup className='gap-y-3'>
                <div className={`flex flex-row`}>
                    <span className={`text-lg font-semibold font-montserrat`}>What are your preferred language(s)? <span className={`text-lg text-red-600`}>*</span></span>
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
        </div>
    )
};

export default AgeLanguageQuestionnaire;