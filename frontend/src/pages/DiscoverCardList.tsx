import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { IPsychiatrist, IUser } from '@/schema';
import DiscoverCard from './discoverCard';
import { fetchAllUsers,fetchPatientDetails, fetchDocumentId } from '../../firebase/fetchData';
import { useAuth } from '../../contexts/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

interface DiscoverCardListProps {
  results: IPsychiatrist[];
  buttonType: string;
}

const DiscoverCardList: React.FC<DiscoverCardListProps> = ({ results, buttonType = "discover" }) => {
  const { user } = useAuth();
  const uid = user?.uid;
  const router = useRouter();

  const [docId, setDocId] = useState<string | undefined>();
  const [savedPsychiatrists, setSavedPsychiatrists] = useState<string[]>([]);

  useEffect(() => {
    const fetchDocId = async () => {
      if (user) {
        const documentId = await fetchDocumentId("patients", user.uid);
        setDocId(documentId);
      }
    };
    fetchDocId();
  }, [user]);

  useEffect(() => {
    const fetchSavedPsychiatrists = async () => {
      if (user) {
        const data = await fetchPatientDetails(user.uid);
        setSavedPsychiatrists(data.savedPsychiatrists);
      }
    };
    fetchSavedPsychiatrists();
  }, [user]);

  const handleSave = async (event: React.MouseEvent, psychiatrist: IPsychiatrist) => {
    event.stopPropagation();
    if (user) {
      const updatedSavedPsychiatrists = savedPsychiatrists.includes(psychiatrist.uid)
        ? savedPsychiatrists.filter((id) => id !== psychiatrist.uid)
        : [...savedPsychiatrists, psychiatrist.uid];

      setSavedPsychiatrists(updatedSavedPsychiatrists);
      await updateDoc(doc(db, "patients", docId || ""), { savedPsychiatrists: updatedSavedPsychiatrists });
    }
  };

  const handleSendMessage = (event: React.MouseEvent, psychiatrist: IPsychiatrist) => {
    event.stopPropagation();
    if (user) {
      router.push({
        pathname: `/patient/${user.uid}/messages`,
        query: { psych_id: psychiatrist.uid, psych_name: `${psychiatrist.firstName} ${psychiatrist.lastName}` }
      });
    }
  };

  const handleGoToProfProfile = (psych_uid: string) => {
    router.push(user
      ? `/${user.userType}/${user.uid}/prof_profile?psych_uid=${psych_uid}`
      : `/prof_profile?psych_uid=${psych_uid}`);
  };

  return (
    <div className="px-4 lg:px-24 pt-9">
      <div className="pb-8">
        <div className="psychiatrist-list flex flex-col items-stretch gap-6 w-full">
          {results.map((psychiatrist) => (
            <DiscoverCard
              key={psychiatrist.uid}
              psychiatrist={psychiatrist}
              savedPsychiatrists={savedPsychiatrists}
              handleSave={handleSave}
              handleSendMessage={handleSendMessage}
              handleGoToProfProfile={handleGoToProfProfile}
              buttonType={buttonType}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscoverCardList;
