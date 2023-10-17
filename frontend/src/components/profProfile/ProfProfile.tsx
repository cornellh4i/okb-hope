import React, { useEffect, useState } from 'react';
import { fetchProfessionalData } from '../../../firebase/fetchData';
import { IPsychiatrist } from '../../schema'
import Availability from './Availability';
import ArrowIcon from '../../assets/bookmark.svg';


interface ProfProfileProps {
    firstName: string;
    lastName: string;
}

const DummyPsychiatrist: IPsychiatrist = {
    id: 1,
    first_name: "Gloria",
    last_name: "Shi",
    title: "Psychiatrist at Wohohiame Hospital",
    profile_pic: null,
    availability: ["9:00-10:00, 13:00-16:30", 
    "16:00-17:00", 
    "19:45-21:30, 23:00-23:30", 
    "8:00-9:00, 15:00-18:00", 
    "9:00-10:00, 13:00-15:30", 
    "8:00-9:00, 16:00-18:00, 20:00-21:30", 
    ""],
    gender: 1,
    location: "Accra, Ghana",
    language: ["English"],
    specialty: ["Psychiatrist"],
    description: `Dr. Gloria Shi is a psychiatrist based in Accra, Ghana. 
    She obtained her medical degree from the University of Ghana and completed 
    her psychiatry residency training at the Korle Bu Teaching Hospital in Accra. 
    Dr. Gloria Shi is passionate about providing quality mental health care to her 
    patients and has a specialization in the treatment of anxiety and mood disorders.`
}

const ProfProfile = ({ firstName, lastName }: ProfProfileProps) => {
  const [professional, setProfessional] = useState<IPsychiatrist>(DummyPsychiatrist);

  useEffect(() => {
    const fetchProfessional = async () => {
        // We use dummy psychiatrist for now for testing purposes
        // const data = await fetchProfessionalData(firstName, lastName);
        // setProfessional(data);
    };

    fetchProfessional();
  }, []);

  return (
    <div className={`w-full h-full flex flex-wrap flex-col justify-center content-center gap-5`}>
        <div className={``}>
            <figure className="object-cover"><ArrowIcon /></figure>
        </div>
        <div className={`flex flex-row`}>
            <div className={`shrink`}>
                {/* picture */}
            </div>
            <div className={`grow flex flex-col gap-4`}>
                <div className={`flex flex-row`}>
                    <div className={`grow text-semibold`}>
                        {professional.first_name + " " + professional.last_name}
                    </div>
                    <div className={`shrink`}>

                    </div>
                    <div className={`shrink`}>

                    </div>
                </div>
                <div className={`text-semibold`}>

                </div>
                <div className={`flex flex-row flex-start`}>
                    {/* map to language and speciality */}
                </div>
                <div className={`font-monsterat`}>
                    {/* description */}
                </div>
                <div className={`flex flex-row`}>
                    {/* Links */}
                </div>
            </div>
        </div>
        <h2 className={``}>Availability</h2>
        <Availability availability={professional?.availability}/>
    </div>
  );
};

export default ProfProfile;
