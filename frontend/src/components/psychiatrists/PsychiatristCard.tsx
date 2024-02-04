import { useEffect, useState } from 'react'
import BookmarkIcon from '@/assets/bookmark.svg'
import PsychiatristIcon from '@/assets/psychiatrist.svg'
import { IPsychiatrist, IUser } from '@/schema';
import { fetchAllUsers, fetchDocumentId, fetchPatientDetails, fetchProfessionalData } from '../../../firebase/fetchData';
import { useAuth } from '../../../contexts/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { useRouter } from 'next/navigation';
import router from 'next/router';

const PsychiatristCard = ({ psych_uid }: { psych_uid: string }) => {
  const { user } = useAuth();

  // Toggles whether to show psychiatrist profile or not
  const [isShown, setIsShown] = useState(false);
  const [professional, setProfessional] = useState<IPsychiatrist | null>(null);
  const [savedPsychiatrists, setSavedPsychiatrists] = useState<string[]>([]);
  const [docId, setDocId] = useState<string | undefined>(undefined);
  const router_navigation = useRouter();

  const handleClick = event => {
    setIsShown(!isShown);
  };

  console.log(psych_uid)

  useEffect(() => {
    const fetchProfessional = async () => {
      // Check if both first name and last name are defined
      if (psych_uid) {
        // Fetch professional data based on psychiatrist's uid
        const data = await fetchProfessionalData(psych_uid);
        console.log(data);
        setProfessional(data);
      }
    };

    fetchProfessional();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (user) {
        const data = await fetchPatientDetails(user.uid);
        setSavedPsychiatrists(data.savedPsychiatrists)
        console.log(savedPsychiatrists)
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    setSavedPsychiatrists(savedPsychiatrists)
  }, [savedPsychiatrists])

  useEffect(() => {
    const fetchDocId = async () => {
      if (user) {
        const documentId = await fetchDocumentId("patients", user.uid);
        setDocId(documentId);
        console.log(documentId)
      }
    }
    fetchDocId();
  }, [docId]);

  const handleUnsave = async (event: React.MouseEvent, psychiatrist) => {
    if (user) {
      try {
        const updatedSavedPsychiatrists = [...savedPsychiatrists];
        const index = updatedSavedPsychiatrists.indexOf(psychiatrist.uid);
        if (index !== -1) {
          updatedSavedPsychiatrists.splice(index, 1);
        }
        
        setSavedPsychiatrists(updatedSavedPsychiatrists)

        // Update the result to firebase
        const userRef = doc(db, "patients", docId ?? "");
        await updateDoc(userRef, {
          savedPsychiatrists: updatedSavedPsychiatrists
        })

        // Refresh the current route. Making a new request to the server, re-fetching data requests, and re-rendering Server Components.
        router_navigation.refresh();
      } catch (error) {
        console.error('Error unsaving psychiatrist');
      }
    }
  };

  // Redirects to a professional's profile page and passes their uid as query parameter
  function handleGoToProfProfile(psych_uid: string) {
    console.log(psych_uid)
    router.push({
      pathname: `/${user?.uid}/prof_profile`,
      query: { psych_uid: psych_uid }
    })
  }

  // Render the psychiatrist card only if it's in the list of saved psychiatrists
  if (!savedPsychiatrists.includes(psych_uid)) {
    return null;
  }

  return (
    <div className="card w-11/12 bg-base-100 shadow-xl m-6 border-[3px]">
      <div className="card-body items-center p-4">
        {/* image of psychiatrist */}
        <PsychiatristIcon />
        <h2 className="card-title">{professional?.firstName} {professional?.lastName}</h2>
        {/* <h2 className="font-[400] italic mb-0">{p_certifications}</h2> */}
        {/* view profile button */}
        <div className="card-actions flex w-full mt-2 justify-left">
          <button onClick={() => handleGoToProfProfile(psych_uid)} className="btn w-9/12 bg-okb-blue border-transparent">View Profile</button>

          <button className="btn w-2/12 p-0 glass object-cover bg-contain" onClick={(event) => handleUnsave(event, professional)}>
            <BookmarkIcon />
          </button>
          {/* dummy component when view profile is pressed */}
          {/* note: right now, this won't execute because button's onClick isn't initiated to setIsShown */}
          {isShown && <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="card-actions justify-end">
                <button className="btn btn-square btn-sm " onClick={handleClick}>

                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <h2 className="card-title text-[16px] text-center">{professional?.firstName} {professional?.lastName}</h2>
              <p>Psychiatrist Profile</p>
            </div>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default PsychiatristCard;