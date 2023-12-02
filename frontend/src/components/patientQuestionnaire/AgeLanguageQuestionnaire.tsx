// 2nd page of the Questionnaire
import { ChangeEvent } from 'react';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';

interface QuestionnaireProps {
    age: string;
    languages: string[];
    setLanguages: React.Dispatch<React.SetStateAction<string[]>>;
    checked: { [key: string]: boolean };
    setChecked: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
    handleAge: (event: ChangeEvent<HTMLInputElement>) => void;
    handleCheck: (event: ChangeEvent<HTMLInputElement>) => void;

}

const AgeLanguageQuestionnaire = ({ age, languages, setLanguages, checked, setChecked, handleAge, handleCheck } : QuestionnaireProps) => {

    return (
        <div className={`w-full h-full flex flex-wrap flex-col justify-start gap-6 p-8 mb-5`}>
            <FormControl>
                <div className={`flex flex-row gap-1`}>
                    <span className={`text-lg font-semibold font-montserrat`}>What is your age?</span>
                    <span className={`text-lg text-red-600`}>*</span>
                </div> 
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    defaultValue={age}
                    onChange={handleAge}
                    className={`flex flex-col gap-2`}
                >
                    <FormControlLabel className={` ml-1 `} value="18-24" control={<Radio />} label={
                        <span style={{fontWeight: 300, fontSize: 18 }}>
                        18-24
                        </span>
                    } />
                    <FormControlLabel className={` ml-1 `} value="25-34" control={<Radio />} label={
                        <span style={{ fontWeight: 300, fontSize: 18 }}>
                        25-34
                        </span>
                    } />
                    <FormControlLabel className={` ml-1 `} value="35-44" control={<Radio />} label={
                        <span style={{ fontWeight: 300, fontSize: 18}}>
                        35-44
                        </span>
                    } />
                    <FormControlLabel className={` ml-1 `} value="45-54" control={<Radio />} label={
                        <span style={{fontWeight: 300, fontSize: 18 }}>
                        45-54
                        </span>
                    } />
                    <FormControlLabel className={` ml-1 `} value="55-64" control={<Radio />} label={
                        <span style={{ fontWeight: 300, fontSize: 18 }}>
                        55-64
                        </span>
                    } />
                    <FormControlLabel className={` ml-1 `} value="65 and over" control={<Radio />} label={
                        <span style={{ fontWeight: 300, fontSize: 18}}>
                        65 and over
                        </span>
                    } />
                </RadioGroup>
            </FormControl>
            <FormGroup>
                <div className={`flex flex-row gap-1`}>
                    <span className={`text-lg font-semibold font-montserrat`}>What are your preferred languages?</span>
                    <span className={`text-lg text-red-600`}>*</span>
                </div> 
                <FormControlLabel control={<Checkbox defaultChecked={checked.English} checked={checked['english']} value={`english`} onChange={handleCheck} />} className={` ml-1 `} label={
                        <span style={{fontWeight: 300, fontSize: 18 }}>
                        English
                        </span>
                    } />
                <FormControlLabel control={<Checkbox defaultChecked={checked.Twi} checked={checked['twi']} value={`twi`} onChange={handleCheck} />} className={` ml-1 `} label={
                        <span style={{fontWeight: 300, fontSize: 18 }}>
                        Twi
                        </span>
                    } />
                <FormControlLabel control={<Checkbox defaultChecked={checked.Fante} checked={checked['fante']} value={`fante`} onChange={handleCheck} />} className={` ml-1 `} label={
                        <span style={{fontWeight: 300, fontSize: 18 }}>
                        Fante
                        </span>
                    } />
                <FormControlLabel control={<Checkbox defaultChecked={checked.Ewe} checked={checked['ewe']} value={`ewe`} onChange={handleCheck} />} className={` ml-1 `} label={
                        <span style={{fontWeight: 300, fontSize: 18 }}>
                        Ewe
                        </span>
                    } />
                <FormControlLabel control={<Checkbox defaultChecked={checked.Ga} checked={checked['ga']} value={`ga`} onChange={handleCheck} />} className={` ml-1 `} label={
                        <span style={{fontWeight: 300, fontSize: 18 }}>
                        Ga
                        </span>
                    } />
                <FormControlLabel control={<Checkbox defaultChecked={checked.Other} checked={checked['other']} value={`other`} onChange={handleCheck} />} className={` ml-1 `} label={
                        <span style={{fontWeight: 300, fontSize: 18 }}>
                        Other
                        </span>
                    } />
            </FormGroup>
        </div>
    )
};

export default AgeLanguageQuestionnaire;