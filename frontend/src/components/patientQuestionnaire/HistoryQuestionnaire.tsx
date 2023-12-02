import { ChangeEvent } from "react";
import okb_colors from "@/colors";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

interface QuestionnaireProps{
    prevExp: string;
    prevExpTime: string;
    concerns: string;
    handlePrevExp: (event: ChangeEvent<HTMLInputElement>) => void;
    handlePrevExpTime: (event: ChangeEvent<HTMLInputElement>) => void;
    handleConcerns: (event: ChangeEvent<HTMLInputElement>) => void;

}
// 3rd page of the Questionnaire
const HistoryQuestionnaire = ({prevExp, prevExpTime, concerns, handlePrevExp, handlePrevExpTime, handleConcerns} : QuestionnaireProps ) => {
    return (
        <div className={`w-full h-full flex flex-wrap flex-col justify-start gap-6 p-8 mb-5`}>
            <div className={`text-[32px] font-semibold font-montserrat`}>
                Great! Now let's get a sense of your history with medical professionals. 
            </div>
            <FormControl>
                <span className={`text-lg font-semibold font-montserrat`}>Have you spoken with a counselor/therapist before?</span>
                
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    defaultValue={prevExp}
                    onChange={handlePrevExp}
                    className={`flex flex-col gap-2`}
                >
                    <FormControlLabel className={` ml-1 `} value="18-24" control={<Radio />} label={
                        <span style={{fontWeight: 300, fontSize: 18 }}>
                        Yes
                        </span>
                    } />
                    <FormControlLabel className={` ml-1 `} value="25-34" control={<Radio />} label={
                        <span style={{ fontWeight: 300, fontSize: 18 }}>
                        No
                        </span>
                    } />
                </RadioGroup>
            </FormControl>
            <FormControl>
                <span className={`text-lg font-semibold font-montserrat`}>If yes, when was the last time you spoke with one?</span>
                
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    defaultValue={prevExpTime}
                    onChange={handlePrevExpTime}
                    className={`flex flex-col gap-2`}
                >
                    <FormControlLabel className={` ml-1 `} value="18-24" control={<Radio />} label={
                        <span style={{fontWeight: 300, fontSize: 18 }}>
                        Within the last month
                        </span>
                    } />
                    <FormControlLabel className={` ml-1 `} value="25-34" control={<Radio />} label={
                        <span style={{ fontWeight: 300, fontSize: 18 }}>
                        Within the last 6 months
                        </span>
                    } />
                    <FormControlLabel className={` ml-1 `} value="25-34" control={<Radio />} label={
                        <span style={{ fontWeight: 300, fontSize: 18 }}>
                        Within the last year
                        </span>
                    } />
                    <FormControlLabel className={` ml-1 `} value="25-34" control={<Radio />} label={
                        <span style={{ fontWeight: 300, fontSize: 18 }}>
                        Over a year ago
                        </span>
                    } />
                    <FormControlLabel className={` ml-1 `} value="25-34" control={<Radio />} label={
                        <span style={{ fontWeight: 300, fontSize: 18 }}>
                        I have never spoken witih a counselor/therapist before.
                        </span>
                    } />
                </RadioGroup>
            </FormControl>
            <div>
                <span className={`text-lg font-semibold font-montserrat`}>Are there any specific concerns you would like to discuss with your conselor?</span>
                <input type="text" value={concerns} onChange={handleConcerns} placeholder="Type here" className={`input input-bordered w-full mr-3 border-2 rounded-2xl`} style={{ borderColor: okb_colors.light_blue }} />
            </div>
            

        </div>
    )
};

export default HistoryQuestionnaire