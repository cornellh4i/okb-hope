import Vertical_line from "@/assets/vertical_line.svg";
import { Gender } from "@/schema";
import okb_colors from "@/colors";

interface QuestionnaireProps {
    firstName: string;
    lastName: string;
    gender: Gender | undefined;
    image: string;
}

// 1st page of the Questionnaire
const NameGenderImageQuestionnaire = ({ firstName, lastName, gender, image }: QuestionnaireProps) => {
    return (
        <div className={`w-full h-full flex flex-wrap flex-col justify-start gap-8 p-8 bg-off-white`}>
            <div className={`text-black text-[32px] font-semibold font-montserrat`}>
                Let’s start setting up your profile. 
            </div>
            <div className={`text-black text-2xl font-semibold font-montserrat`}>
                First, let’s begin with some basic information.
            </div>
            <div className={`flex flex-row`}>
                {/* First Name */}
                <div tabIndex={0} className={`flex form-control w-1/4 mr-10`}>
                <div className={`label-container`}>
                    <label className={`label`}>
                    <span className={`text-lg font-semibold`}>First Name (Required)</span>
                    </label>
                </div>
                <div className={`flex items-center`}>
                    <Vertical_line className=""></Vertical_line>
                    <input type="text" value={firstName} placeholder="Type here" className={`input input-bordered w-full border-2 ml-3 rounded-2xl`} style={{ borderColor: okb_colors.light_blue }} />
                </div>
                </div>
                {/* Last Name */}
                <div tabIndex={0} className={`form-control w-1/4 pr-0`}>
                <label className={`label`}>
                    <span className={`text-lg font-semibold`}>Last Name (Required)</span>
                </label>
                <div className={`flex items-center`}>
                    <Vertical_line className=""></Vertical_line>
                    <input type="text" value={lastName} placeholder="Type here" className={`input input-bordered w-full border-2 ml-3 rounded-2xl`} style={{ borderColor: okb_colors.light_blue }} />
                </div>
                </div>
            </div>

        </div>
    );
};

export default NameGenderImageQuestionnaire;