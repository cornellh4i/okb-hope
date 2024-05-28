import PsychiatristCard from './PsychiatristCard';
import NoSavedPsychComponent from './NoSavedPsych';
import { useEffect, useState } from 'react';
import { IPsychiatrist, IUser } from '@/schema';
import { fetchAllUsers, fetchPatientDetails, fetchProfessionalData } from '../../../firebase/fetchData';
import { useAuth } from '../../../contexts/AuthContext';

const PsychiatristCardsListing = ({ max_size }: { max_size: number }) => {
  const { user } = useAuth();
  const [savedPsychiatrists, setSavedPsychiatrists] = useState<string[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      if (user && user.userType == "patient") {
        const data = await fetchPatientDetails(user.uid);
        setSavedPsychiatrists(data.savedPsychiatrists)
      }
    }
    fetchUser();
  }, []);

  // Check there are no saved psychiatrists
  const content = savedPsychiatrists.length === 0 ? (
    <NoSavedPsychComponent />
  ) : (
    savedPsychiatrists.map((psych_uid: any) => (
      <div className="psychiatrist justify-center items-center content-center">
        <PsychiatristCard
          key={psych_uid} psych_uid={psych_uid}
        />
      </div>
    ))
  );

  const contentsStyle = savedPsychiatrists.length === 0 ? "" : "grid lg:grid-cols-3 gap-4 pb-1/12 shrink justify-center items-center";

  return (
    <div className="card w-full bg-base-100 rounded-[6.5px] shadow-custom-shadow">
      <div className="card-body">
        <h1 className="card-title pt-1/15 text-[32px] font-montserrat">My Saved Psychiatrists</h1>
        <div className={contentsStyle}>
          {content}
        </div>
      </div>
    </div>
  );
};

export default PsychiatristCardsListing;