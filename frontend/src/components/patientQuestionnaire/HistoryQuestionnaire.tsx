import { ChangeEvent } from "react";
import okb_colors from "@/colors";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import { FormGroup } from "@mui/material";

interface QuestionnaireProps {
    prevExp: string;
    prevExpTime: string;
    concerns: string[];
    check: { [key: string]: boolean };
    aboutConcerns: string;
    handleAboutConcerns: (event: ChangeEvent<HTMLTextAreaElement>) => void
    setConcerns: React.Dispatch<React.SetStateAction<string[]>>;
    handlePrevExp: (event: ChangeEvent<HTMLInputElement>) => void;
    handlePrevExpTime: (event: ChangeEvent<HTMLInputElement>) => void;
    setCheck: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
    handleChecks: (event: ChangeEvent<HTMLInputElement>) => void;


}
// 3rd page of the Questionnaire
const HistoryQuestionnaire = ({ prevExp, prevExpTime, concerns, check, aboutConcerns, handleAboutConcerns, handlePrevExp, handlePrevExpTime, setConcerns, handleChecks, setCheck }: QuestionnaireProps) => {
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
                        <span style={{ fontWeight: 300, fontSize: 18 }}>
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
                    <FormControlLabel className={`ml-1`} value="within-last-month" control={<Radio />} label={
                        <span style={{ fontWeight: 300, fontSize: 18 }}>
                            Within the last month
                        </span>
                    } />
                    <FormControlLabel className={`ml-1`} value="within-last-6-months" control={<Radio />} label={
                        <span style={{ fontWeight: 300, fontSize: 18 }}>
                            Within the last 6 months
                        </span>
                    } />
                    <FormControlLabel className={`ml-1`} value="within-last-year" control={<Radio />} label={
                        <span style={{ fontWeight: 300, fontSize: 18 }}>
                            Within the last year
                        </span>
                    } />
                    <FormControlLabel className={`ml-1`} value="over-a-year-ago" control={<Radio />} label={
                        <span style={{ fontWeight: 300, fontSize: 18 }}>
                            Over a year ago
                        </span>
                    } />
                    <FormControlLabel className={`ml-1`} value="never-spoken" control={<Radio />} label={
                        <span style={{ fontWeight: 300, fontSize: 18 }}>
                            I have never spoken with a counselor/therapist before.
                        </span>
                    } />
                </RadioGroup>
            </FormControl>
            <FormGroup>
                <div>
                    <span className={`text-lg font-semibold font-montserrat`}>Are there any specific concerns you would like to discuss with your conselor?</span>
                    <span className={`text-lg text-red-600`}>*</span>
                </div>
                <FormControlLabel control={<Checkbox defaultChecked={check.MyRelationships} checked={check['My Relationships']} value={`My Relationships`} onChange={handleChecks} />} className={` ml-1 `} label={
                    <span style={{ fontWeight: 300, fontSize: 18 }}>
                        My Relationships
                    </span>
                } />
                <FormControlLabel control={<Checkbox defaultChecked={check.Addiction} checked={check['Addiction']} value={`Addiction`} onChange={handleChecks} />} className={` ml-1 `} label={
                    <span style={{ fontWeight: 300, fontSize: 18 }}>
                        Addiction
                    </span>
                } />
                <FormControlLabel control={<Checkbox defaultChecked={check.SuicidalThoughts} checked={check['Suicidal Thoughts']} value={`Suicidal Thoughts`} onChange={handleChecks} />} className={` ml-1 `} label={
                    <span style={{ fontWeight: 300, fontSize: 18 }}>
                        Suicidal Thoughts
                    </span>
                } />
                <FormControlLabel control={<Checkbox defaultChecked={check.FamilyDistress} checked={check['Family Distress']} value={`Family Distress`} onChange={handleChecks} />} className={` ml-1 `} label={
                    <span style={{ fontWeight: 300, fontSize: 18 }}>
                        Family Distress
                    </span>
                } />
                <FormControlLabel control={<Checkbox defaultChecked={check.SubstanceAbuse} checked={check['Substance Abuse']} value={`Substance Abuse`} onChange={handleChecks} />} className={` ml-1 `} label={
                    <span style={{ fontWeight: 300, fontSize: 18 }}>
                        Substance Abuse
                    </span>
                } />
                <FormControlLabel control={<Checkbox defaultChecked={check.AcademicDistress} checked={check['Academic Distress']} value={`Academic Distress`} onChange={handleChecks} />} className={` ml-1 `} label={
                    <span style={{ fontWeight: 300, fontSize: 18 }}>
                        Academic Distress
                    </span>
                } />
                <FormControlLabel control={<Checkbox defaultChecked={check.SocialAnxiety} checked={check['Social Anxiety']} value={`Social Anxiety`} onChange={handleChecks} />} className={` ml-1 `} label={
                    <span style={{ fontWeight: 300, fontSize: 18 }}>
                        Social Anxiety
                    </span>
                } />
                <FormControlLabel control={<Checkbox defaultChecked={check.Depression} checked={check['Depression']} value={`Depression`} onChange={handleChecks} />} className={` ml-1 `} label={
                    <span style={{ fontWeight: 300, fontSize: 18 }}>
                        Depression
                    </span>
                } />
                <FormControlLabel control={<Checkbox defaultChecked={check.Other} checked={check['Other']} value="Other" onChange={handleChecks} />} className="ml-1" label={
                    <span style={{ fontWeight: 300, fontSize: 18 }}>
                        Other
                    </span>
                } />
                {check.Other && (
                    <textarea
                        value={aboutConcerns}
                        onChange={handleAboutConcerns}
                        placeholder="Type here"
                        className={`input input-bordered w-full mr-3 border-2 rounded-2xl`}
                        style={{
                            borderColor: okb_colors.light_blue,
                            height: 45,
                        }}
                        />
                      )}
            </FormGroup>
        </div>
    )
};

export default HistoryQuestionnaire