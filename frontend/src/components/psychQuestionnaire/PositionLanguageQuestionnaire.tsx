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
    position: string;
    languages: string[];
    aboutYourself: string;
    handleAboutYourself: (event: ChangeEvent<HTMLTextAreaElement>) => void
    setLanguages: React.Dispatch<React.SetStateAction<string[]>>;
    otherPosition: string;
    handleOtherPosition: (event: ChangeEvent<HTMLTextAreaElement>) => void
    checked: { [key: string]: boolean };
    setChecked: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
    handleCheck: (event: ChangeEvent<HTMLInputElement>) => void;
    handlePosition: (event: ChangeEvent<HTMLInputElement>) => void;

}
const PositionLanguageQuestionnaire = ({ setPosition, position, languages, otherPosition, handleOtherPosition, aboutYourself, setLanguages, checked, handleAboutYourself, setChecked, handleCheck, handlePosition }: QuestionnaireProps) => {

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
                    <FormControlLabel control={<Radio checked={checked['Psychiatrist']} value={`Psychiatrist`} onChange={handlePosition}/>} className={` ml-1 `} label={
                        <span style={{ fontWeight: 300, fontSize: 18 }}>
                            Psychiatrist
                        </span>
                    } />
                    <FormControlLabel control={<Radio checked={checked['Nurse']} value={`Nurse`} onChange={handlePosition} />} className={` ml-1 `} label={
                        <span style={{ fontWeight: 300, fontSize: 18 }}>
                            Nurse
                        </span>
                    } />
                    <FormControlLabel control={<Radio checked={checked['other']} value={`other`} onChange={handlePosition} />} className={` ml-1 `} label={
                        <span style={{ fontWeight: 300, fontSize: 18 }}>
                            Other
                        </span>
                    } />
                    {checked && (
                    <textarea
                        value={position}
                        onChange={handleOtherPosition}
                        placeholder="Type here"
                        className={`input input-bordered w-full mr-3 border-2 rounded-2xl`}
                        style={{
                            borderColor: okb_colors.light_blue,
                            height: 45,
                        }}
                        />
                      )}
                </RadioGroup>
            </FormControl>
            <div>
                <span className={`text-lg font-semibold font-montserrat`}>Tell us and your patients about yourself.</span>
                <textarea
                    value={aboutYourself}
                    onChange={handleAboutYourself}
                    placeholder="Type here"
                    className={`input input-bordered resize-none w-full mr-3 border-2 rounded-2xl`}
                    style={{
                        borderColor: okb_colors.light_blue,
                        height: 150,  // Set the desired height for your textarea
                    }}
                />
            </div>
            <FormGroup>
                <div className={`flex flex-row gap-1`}>
                    <span className={`text-lg font-semibold font-montserrat`}>What are your preferred languages?</span>
                    <span className={`text-lg text-red-600`}>*</span>
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