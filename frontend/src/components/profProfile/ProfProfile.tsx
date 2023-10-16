import React, { useEffect, useState } from 'react';
import { fetchProfessionalData } from '../../../firebase/fetchData';
import { IPsychiatrist } from '../../schema'
import Availability from './Availability';

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
  const [professional, setProfessional] = useState<IPsychiatrist | null>(DummyPsychiatrist);

  useEffect(() => {
    const fetchProfessional = async () => {
        // We use dummy psychiatrist for now for testing purposes
        // const data = await fetchProfessionalData(firstName, lastName);
        // setProfessional(data);
    };

    fetchProfessional();
  }, []);

  return (
    <div>
      <Availability availability={professional?.availability!}/>
    </div>
  );
};

export default ProfProfile;
