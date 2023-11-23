import NameGenderImageQuestionnaire from "./NameGenderImageQuestionnaire";
import React, { useEffect, useState } from 'react';
import { Gender } from "@/schema";

const PatientQuestionnaire = () => {
    const [firstName,  setFirstName] = useState<string>("");
    const [lastName,  setLastName] = useState<string>("");
    const [gender,  setGender] = useState<Gender>();
    const [image,  setImage] = useState<string>("");


    return (
        <div>
            <NameGenderImageQuestionnaire 
            firstName={firstName}
            lastName={lastName}
            gender={gender}
            image={image}
            />
        </div>
    )
};

export default PatientQuestionnaire