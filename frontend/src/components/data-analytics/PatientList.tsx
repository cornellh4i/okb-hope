import { useEffect, useState } from 'react';
import { fetchAllPatients } from '../../../firebase/fetchGraphData';
import {IPatient} from '@/schema';
import { getGlobalAgeRanges, getGlobalGenders, getGlobalLanguages, setGlobalMen, setGlobalWomen, setGlobalOther } from './global';

interface PatientListProps {
  results: IPatient[];
}

const PatientList: React.FC<PatientListProps> = ({ results }) => {
  const [patients, setPatients] = useState<IPatient[]> ([]);
  let men : number [];
  let women : number [];
  let other : number [];
  const [ageRanges, setAgeRanges] = useState<string[]>([]);
  const [genders, setGenders] = useState<number[]>([]);
  const [languages, setLanguages] = useState<string[]>([]); 

  const allConcerns: string[] = [
    "My Relationships",
    "Addiction",
    "Suicidal Thoughts",
    "Family Distress",
    "Substance Abuse",
    "Academic Distress",
    "Social Anxiety",
    "Depression",
    "Other"
  ];
  
  useEffect(() => {
    async function fetchData() {
      try{
        console.log("fetched patients")
        const fetchPatients =  await fetchAllPatients();
        setPatients(fetchPatients);
        console.log("finished fetching patients")
      } catch (err: any){
        console.error(err.message);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log(patients);
  }, [patients]);

  // useEffect(() => {
  //     const updatedAgeRanges = (getGlobalAgeRanges());
  //     setAgeRanges(updatedAgeRanges);
  // });
  
  // useEffect(() => {
  //   const updatedGenders = (getGlobalGenders());
  //   setGenders(updatedGenders);
  // });

  // useEffect(() => {
  //     const updatedLanguages = (getGlobalLanguages());
  //     setLanguages(updatedLanguages);
  // });

  // function filterPatientsByConcern(
  //   patients: IPatient[],
  //   concern: string,
  //   ageRange: string[],
  //   gender: number [],
  //   languages: string[]
  // ): number [] {

  //   // Filter patients based on concern, gender, and languages
  // const filteredPatients = patients.filter(patient =>
  //   patient.concerns.includes(concern) &&
  //   ageRange.includes(patient.ageRange) &&
  //   gender.includes(patient.gender) &&
  //   patient.prefLanguages.some(language => languages.includes(language))
  // );


  // // Loop through each concern and count patients
  // async function pushInformation(){
  //   allConcerns.forEach(concern => {
  //     const patientCounts = filterPatientsByConcern(patients, concern, getGlobalAgeRanges(), getGlobalGenders(), getGlobalLanguages());
  //     men.push(patientCounts[0]);
  //     women.push(patientCounts[1]);
  //     other.push(patientCounts[2]);
  //   });
  // }
  // // Count male, female, and other patients
  // const maleCount = filteredPatients.filter(patient => patient.gender === 0).length;
  // const femaleCount = filteredPatients.filter(patient => patient.gender === 1).length;
  // const otherCount = filteredPatients.filter(patient => patient.gender === 2).length;
  
  // setGlobalMen([maleCount]);
  // setGlobalWomen([femaleCount]);
  // setGlobalOther([otherCount]);

  // return [maleCount, femaleCount, otherCount];
  // }

  // if (patients.length === 0) {
  //   // Patients list is empty
  //   console.log("Patients list is empty");
  // } else {
  //   // Patients list is not empty
  //   console.log("Patients list is not empty");
  // }

  return ( 
  // <><div>
  //     {filterPatientsByConcern(patients, "Addiction", ["18-24"], [0, 1, 2], ["Ewe", "Hausa", "Ga", "Fante", "English", "Other"])}
  //   </div>
  //   <div>
  //     {filterPatientsByConcern(patients, "Depression", ["18-24"], [0, 1], ["Hausa", "English", "Other"])}
  //   </div>
  //   <div>
  //     {filterPatientsByConcern(patients, "My  Relationships", ["18-24"], [0, 1], ["Hausa", "English", "Other"])}
  //   </div>
    <div>
        {results.map((patient, index) => (
          <div key={index}>
            {/* Render patient details here */}
            <p>{`Patient ${index + 1}`}</p>
            {/* Add more patient details as needed */}
          </div>
        ))}
      </div>
    // </>
     )
};


export default PatientList;