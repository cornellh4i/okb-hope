import PsychiatristCard from './PsychiatristCard';
import NoSavedPsychComponent from './NoSavedPsych';
import { useEffect, useState } from 'react';
import { IPsychiatrist, IUser } from '@/schema';
import { fetchAllUsers, fetchPatientDetails, fetchProfessionalData } from '../../../firebase/fetchData';
import { useAuth } from '../../../contexts/AuthContext';

const PsychiatristCardsListing = ({ max_size }: { max_size: number }) => {
  const { user } = useAuth();
  const [savedPsychiatrists, setSavedPsychiatrists] = useState<string[]>([]);
  // const [users, setUsers] = useState<IUser[]>([]);
  // const [user, setUser] = useState<IUser | null>(null);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const fetchUsers: IUser[] = await fetchAllUsers();
  //       setUsers(fetchUsers);
  //       setUser(fetchUsers[0]); // Change this once the users ACTUALLY WORK
  //     } catch (err: any) {
  //       console.error(err.message);
  //     }
  //   }
  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (user) {
        const data = await fetchPatientDetails(user.uid);
        console.log(data)
        setSavedPsychiatrists(data.savedPsychiatrists)
        console.log(data.savedPsychiatrists)
      }
    }
    fetchUser();
  }, []);

  // Display the saved psychiatrists of the user
  // console.log(data)
  // console.log(user.savedPsychiatrists)
  // const savedPsychiatrists = user?.savedPsychiatrists || [];

  // Map the saved psychiatrists to the desired format
  // const psychiatristArr = savedPsychiatrists.slice(0, max_size).map(async psychiatrist => {
  //   const data = await fetchProfessionalData(psychiatrist);
  //   console.log(data)
  //   console.log(data.firstName)
  //   console.log(psychiatrist)
  //   return {
  //     uid: data.uid,
  //     firstName: data.firstName,
  //     lastName: data.lastName,
  //     certification: "Certifications", // Replace with the actual certification property from your user object
  //   };
  // });

  // Check if psychiatristArr has no values
  const content = savedPsychiatrists.length === 0 ? (
    <NoSavedPsychComponent />
  ) : (
    savedPsychiatrists.map((psych_uid: any) => (
      <div className="psychiatrist">
        <PsychiatristCard
          key={psych_uid} psych_uid={psych_uid}
        />
      </div>
    ))
  );

  const contentsStyle = savedPsychiatrists.length === 0 ? "" : "grid grid-cols-3 gap-4 items-center pb-1/12 shrink";

  return (
    <div className="card w-full bg-base-100 rounded-[6.5px] shadow-custom-shadow">
      <div className="card-body">
        <h1 className="card-title pt-1/15 text-[32px]">My Saved Psychiatrists</h1>
        <div className={contentsStyle}>
          {content}
        </div>
      </div>
    </div>
  );
};

export default PsychiatristCardsListing;