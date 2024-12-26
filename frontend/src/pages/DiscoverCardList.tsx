import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { IPsychiatrist, IUser } from '@/schema';
import DiscoverCard from './DiscoverCard';
import { fetchAllUsers, fetchPatientDetails, fetchDocumentId } from '../../firebase/fetchData';
import { useAuth } from '../../contexts/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db, logInWithGoogle } from '../../firebase/firebase';
import { LoginPopup } from '../components/LoginPopup';

interface DiscoverCardListProps {
  results: IPsychiatrist[];
  buttonType: string;
}

const DiscoverCardList: React.FC<DiscoverCardListProps> = ({ results = [], buttonType = "discover" }) => {
  const { user } = useAuth();
  const uid = user?.uid;
  const router = useRouter();

  const [docId, setDocId] = useState<string | undefined>();
  const [savedPsychiatrists, setSavedPsychiatrists] = useState<string[]>([]);
  const [showPopup, setShowPopup] = useState(false);


  useEffect(() => {
    const fetchDocId = async () => {
      if (user?.uid) {
        const documentId = await fetchDocumentId("patients", user.uid);
        setDocId(documentId);
      }
    };
    fetchDocId();
  }, [user]);

  useEffect(() => {
    const fetchSavedPsychiatrists = async () => {
      if (user?.uid) {
        const data = await fetchPatientDetails(user.uid);
        setSavedPsychiatrists(data?.savedPsychiatrists || []);
      }
    };
    fetchSavedPsychiatrists();
  }, [user]);

  const handleSave = async (event: React.MouseEvent, psychiatrist: IPsychiatrist) => {
    if (!user) {
      event.preventDefault();
      setShowPopup(true);
    } else {
    event.stopPropagation();
    if (user && psychiatrist?.uid) {
      const updatedSavedPsychiatrists = savedPsychiatrists?.includes(psychiatrist.uid)
        ? savedPsychiatrists?.filter((id) => id !== psychiatrist.uid)
        : [...(savedPsychiatrists || []), psychiatrist.uid];

      setSavedPsychiatrists(updatedSavedPsychiatrists);
      if (docId) {
        await updateDoc(doc(db, "patients", docId), { savedPsychiatrists: updatedSavedPsychiatrists });
      }
    }
  }
};

  const handleSendMessage = (event: React.MouseEvent, psychiatrist: IPsychiatrist) => {
    if (!user) {
      event.preventDefault();
      setShowPopup(true);
    } else {
    event.stopPropagation();
    if (user?.uid && psychiatrist?.uid) {
      router.push({
        pathname: `/patient/${user.uid}/messages`,
        query: { 
          psych_id: psychiatrist.uid, 
          psych_name: `${psychiatrist?.firstName || ''} ${psychiatrist?.lastName || ''}`
        }
      });
    }
  }
};

  const handleGoToProfProfile = (psych_uid: string) => {
    if (!psych_uid) return;
    
    router.push(user?.userType && user?.uid
      ? `/${user.userType}/${user.uid}/prof_profile?psych_uid=${psych_uid}`
      : `/prof_profile?psych_uid=${psych_uid}`);
  };

const logInWithGoogleAndRedirect = async (onClose: () => void) => {
  await logInWithGoogle();
  router.push('/messages');
  setShowPopup(false);
  onClose();
};

const signUpWithGoogleAndRedirect = async (onClose: () => void) => {
    router.push('/questionnaire');
    setShowPopup(false);
    onClose();
};

  return (
    <div className="px-4 lg:px-24 pt-9">
      <div className="pb-8">
        <div className="psychiatrist-list flex flex-col items-stretch gap-6 w-full">
          {results?.map((psychiatrist) => (
            psychiatrist?.uid && (
              <DiscoverCard
                key={psychiatrist.uid}
                psychiatrist={psychiatrist}
                savedPsychiatrists={savedPsychiatrists || []}
                handleSave={handleSave}
                handleSendMessage={handleSendMessage}
                handleGoToProfProfile={handleGoToProfProfile}
              />
            )
          ))}
        </div>
      </div>
      {showPopup && (
                <LoginPopup
                    onClose={() => setShowPopup(false)}
                    logInWithGoogleAndRedirect={logInWithGoogleAndRedirect}
                    signUpWithGoogleAndRedirect={signUpWithGoogleAndRedirect}
                />
            )}
    </div>
  );
};

export default DiscoverCardList;