import { ChangeEvent, useEffect } from "react";
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
    checkedConcerns;
    isOtherConcernSelected;
    otherConcern;
    handleOtherConcern;
    setConcerns: React.Dispatch<React.SetStateAction<string[]>>;
    handlePrevExp: (event: ChangeEvent<HTMLInputElement>) => void;
    handlePrevExpTime: (event: ChangeEvent<HTMLInputElement>) => void;
    handleConcerns;
}
// 3rd page of the Questionnaire
const HistoryQuestionnaire = ({ prevExp, prevExpTime, checkedConcerns, isOtherConcernSelected, otherConcern, handleOtherConcern, handlePrevExp, handlePrevExpTime, handleConcerns }: QuestionnaireProps) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={`w-full h-full flex flex-wrap flex-col justify-start gap-y-9 py-8 px-9`}>
            <div className={`text-[26px] md:text-[32px] font-semibold font-montserrat`}>
                Great! Now let's get a sense of your history with medical professionals.
            </div>

            {/* Previously Spoken to Counselor/Therapist */}
            <FormControl className="gap-y-3">
                <span className={`text-lg font-semibold font-montserrat`}>Have you spoken with a counselor/therapist before? <span className={`text-lg mb-2 text-red-600`}>*</span></span>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    defaultValue={prevExp}
                    onChange={handlePrevExp}
                    className={`flex flex-col gap-y-3`}
                >
                    <FormControlLabel className={` ml-1 `} value="Yes" control={<Radio />} label={
                        <span style={{ fontWeight: 300, fontSize: 18 }}>
                            Yes
                        </span>
                    } />
                    <FormControlLabel className={` ml-1 `} value="No" control={<Radio />} label={
                        <span style={{ fontWeight: 300, fontSize: 18 }}>
                            No
                        </span>
                    } />
                </RadioGroup>
            </FormControl>

            {/* Previous Therapy Experience Time Frame */}
            <FormControl className="gap-y-3">
                <span className={`text-lg font-semibold font-montserrat`}>If yes, when was the last time you spoke with one? <span className={`text-lg mb-2 text-red-600`}>*</span></span>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    defaultValue={prevExpTime}
                    onChange={handlePrevExpTime}
                    className={`flex flex-col gap-y-3`}
                >
                    <FormControlLabel className={`ml-1`} value="Within the last month" control={<Radio />} label={
                        <span style={{ fontWeight: 300, fontSize: 18 }}>
                            Within the last month
                        </span>
                    } />
                    <FormControlLabel className={`ml-1`} value="Within the last 6 months" control={<Radio />} label={
                        <span style={{ fontWeight: 300, fontSize: 18 }}>
                            Within the last 6 months
                        </span>
                    } />
                    <FormControlLabel className={`ml-1`} value="Within the last year" control={<Radio />} label={
                        <span style={{ fontWeight: 300, fontSize: 18 }}>
                            Within the last year
                        </span>
                    } />
                    <FormControlLabel className={`ml-1`} value="Over a year ago" control={<Radio />} label={
                        <span style={{ fontWeight: 300, fontSize: 18 }}>
                            Over a year ago
                        </span>
                    } />
                    <FormControlLabel className={`ml-1`} value="I have never spoken with a counselor/therapist before." control={<Radio />} label={
                        <span style={{ fontWeight: 300, fontSize: 18 }}>
                            I have never spoken with a counselor/therapist before.
                        </span>
                    } />
                </RadioGroup>
            </FormControl>

            {/* Concerns */}
            <FormGroup className='gap-y-3'>
                <div className={`flex flex-row`}>
                    <span className={`text-lg font-semibold font-montserrat`}>Are there any specific concerns you would like to discuss with your counselor? <span className={`text-lg text-red-600`}>*</span></span>
                </div>
                <FormControlLabel control={<Checkbox defaultChecked={checkedConcerns.MyRelationships} checked={checkedConcerns['My Relationships']} value={`My Relationships`} onChange={handleConcerns} />} className={` ml-1 `} label={
                    <span style={{ fontWeight: 300, fontSize: 18 }}>
                        My Relationships
                    </span>
                } />
                <FormControlLabel control={<Checkbox defaultChecked={checkedConcerns.Addiction} checked={checkedConcerns['Addiction']} value={`Addiction`} onChange={handleConcerns} />} className={` ml-1 `} label={
                    <span style={{ fontWeight: 300, fontSize: 18 }}>
                        Addiction
                    </span>
                } />
                <FormControlLabel control={<Checkbox defaultChecked={checkedConcerns.SuicidalThoughts} checked={checkedConcerns['Suicidal Thoughts']} value={`Suicidal Thoughts`} onChange={handleConcerns} />} className={` ml-1 `} label={
                    <span style={{ fontWeight: 300, fontSize: 18 }}>
                        Suicidal Thoughts
                    </span>
                } />
                <FormControlLabel control={<Checkbox defaultChecked={checkedConcerns.FamilyDistress} checked={checkedConcerns['Family Distress']} value={`Family Distress`} onChange={handleConcerns} />} className={` ml-1 `} label={
                    <span style={{ fontWeight: 300, fontSize: 18 }}>
                        Family Distress
                    </span>
                } />
                <FormControlLabel control={<Checkbox defaultChecked={checkedConcerns.SubstanceAbuse} checked={checkedConcerns['Substance Abuse']} value={`Substance Abuse`} onChange={handleConcerns} />} className={` ml-1 `} label={
                    <span style={{ fontWeight: 300, fontSize: 18 }}>
                        Substance Abuse
                    </span>
                } />
                <FormControlLabel control={<Checkbox defaultChecked={checkedConcerns.AcademicDistress} checked={checkedConcerns['Academic Distress']} value={`Academic Distress`} onChange={handleConcerns} />} className={` ml-1 `} label={
                    <span style={{ fontWeight: 300, fontSize: 18 }}>
                        Academic Distress
                    </span>
                } />
                <FormControlLabel control={<Checkbox defaultChecked={checkedConcerns.SocialAnxiety} checked={checkedConcerns['Social Anxiety']} value={`Social Anxiety`} onChange={handleConcerns} />} className={` ml-1 `} label={
                    <span style={{ fontWeight: 300, fontSize: 18 }}>
                        Social Anxiety
                    </span>
                } />
                <FormControlLabel control={<Checkbox defaultChecked={checkedConcerns.Depression} checked={checkedConcerns['Depression']} value={`Depression`} onChange={handleConcerns} />} className={` ml-1 `} label={
                    <span style={{ fontWeight: 300, fontSize: 18 }}>
                        Depression
                    </span>
                } />
                <FormControlLabel control={<Checkbox defaultChecked={checkedConcerns.Other} checked={checkedConcerns['Other']} value={`Other`} onChange={handleConcerns} />} className={` ml-1 `} label={
                    <span style={{ fontWeight: 300, fontSize: 18 }}>
                        Other
                    </span>
                } />
                {isOtherConcernSelected && (
                    <div className='flex items-center justify-start w-full gap-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="4" height="50" viewBox="0 0 4 50" fill="none">
                            <path d="M2 2L2.00001 202" stroke="#519AEB" stroke-width="3" stroke-linecap="round" />
                        </svg>
                        <textarea
                            value={otherConcern}
                            onChange={handleOtherConcern}
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

export default HistoryQuestionnaire