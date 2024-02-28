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
    setLanguages: React.Dispatch<React.SetStateAction<string[]>>;
    checked: { [key: string]: boolean };
    setChecked: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
    handleAge: (event: ChangeEvent<HTMLInputElement>) => void;
    handleCheck: (event: ChangeEvent<HTMLInputElement>) => void;
    handlePosition: (event: ChangeEvent<HTMLInputElement>) => void;

}

//2nd page of questionnaire
const PositionLanguageQuestionnaire = ({ setPosition, languages, aboutYourself, setLanguages, checked, setChecked, handleAge, handleCheck, handlePosition }: QuestionnaireProps) => {

    return (
        <div className={`w-full h-full flex flex-wrap flex-col justify-start gap-6 p-8 mb-5`}>
            <FormControl>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    defaultValue={setPosition = ""}
                    onChange={handlePosition}>
                    <div className={`flex flex-row gap-1`}>
                        <span className={`text-lg font-semibold font-montserrat`}>What is your current position?</span>
                        <span className={`text-lg text-red-600`}>*</span>
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
            <div>
                <span className={`text-lg font-semibold font-montserrat`}>Tell us and your patients about yourself.</span>
                <textarea
                    value={aboutYourself}
                    placeholder="Type here"
                    className={`input input-bordered resize-none w-full mr-3 border-2 rounded-2xl`}
                    style={{
                        borderColor: okb_colors.light_blue,
                        height: 190
                    }}
                />
            </div>
            <FormGroup>
                <div className={`flex flex-row gap-1`}>
                    <span className={`text-lg font-semibold font-montserrat`}>What are your preferred languages?</span>
                    <span className={`text-lg text-red-600`}>*</span>
                </div>
                <FormControlLabel control={<Checkbox defaultChecked={checked.English} checked={checked['english']} value={`english`} onChange={handleCheck} />} className={` ml-1 `} label={
                    <span style={{ fontWeight: 300, fontSize: 18 }}>
                        English
                    </span>
                } />
                <FormControlLabel control={<Checkbox defaultChecked={checked.Twi} checked={checked['twi']} value={`twi`} onChange={handleCheck} />} className={` ml-1 `} label={
                    <span style={{ fontWeight: 300, fontSize: 18 }}>
                        Twi
                    </span>
                } />
                <FormControlLabel control={<Checkbox defaultChecked={checked.Fante} checked={checked['fante']} value={`fante`} onChange={handleCheck} />} className={` ml-1 `} label={
                    <span style={{ fontWeight: 300, fontSize: 18 }}>
                        Fante
                    </span>
                } />
                <FormControlLabel control={<Checkbox defaultChecked={checked.Ewe} checked={checked['ewe']} value={`ewe`} onChange={handleCheck} />} className={` ml-1 `} label={
                    <span style={{ fontWeight: 300, fontSize: 18 }}>
                        Ewe
                    </span>
                } />
                <FormControlLabel control={<Checkbox defaultChecked={checked.Ga} checked={checked['ga']} value={`ga`} onChange={handleCheck} />} className={` ml-1 `} label={
                    <span style={{ fontWeight: 300, fontSize: 18 }}>
                        Ga
                    </span>
                } />
                <FormControlLabel control={<Checkbox defaultChecked={checked.Other} checked={checked['other']} value={`other`} onChange={handleCheck} />} className={` ml-1 `} label={
                    <span style={{ fontWeight: 300, fontSize: 18 }}>
                        Other
                    </span>
                } />
            </FormGroup>
        </div >
    )
};

export default PositionLanguageQuestionnaire;