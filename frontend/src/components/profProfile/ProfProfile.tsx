import React, { useEffect, useState } from 'react';
import { fetchProfessionalData } from '../../../firebase/fetchData';
import { IPsychiatrist } from '../../schema'
import Availability from './Availability';

interface props {
    psychiatrist: IPsychiatrist
}

const ProfProfile = ({ psychiatrist }: props) => {
  const [professional, setProfessional] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        console.log("Fetch started")
        const data = await fetchProfessionalData("Erica", "Jameson");
        console.log("Fetch ended")

      // setProfessional(data);
    };
    
    fetchData();
  }, []);

  return (
    <div>
      <Availability />
    </div>
  );
};

export default ProfProfile;
