import { useEffect, useState } from 'react'
import BookmarkIcon from '@/assets/bookmark.svg'
import PsychiatristIcon from '@/assets/psychiatrist.svg'
import PsychiatristPhoto from '@/assets/dummy_photo.jpg';
import { IPsychiatrist, IUser } from '@/schema';
import { fetchAllUsers, fetchDocumentId, fetchPatientDetails, fetchProfessionalData } from '../../../firebase/fetchData';
import { useAuth } from '../../../contexts/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db, fetchProfilePic  } from '../../../firebase/firebase';
import { useRouter } from 'next/navigation';
import router from 'next/router';
import Image from 'next/image';
import colors from '@/colors';

const PsychiatristCard = ({ psych_uid }: { psych_uid: string }) => {
  const { user } = useAuth();

  // Toggles whether to show psychiatrist profile or not
  const [isShown, setIsShown] = useState(false);
  const [professional, setProfessional] = useState<IPsychiatrist | null>(null);
  const [savedPsychiatrists, setSavedPsychiatrists] = useState<string[]>([]);
  const [docId, setDocId] = useState<string | undefined>(undefined);
  const router_navigation = useRouter();
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null);

  const handleClick = event => {
    setIsShown(!isShown);
  };

  useEffect(() => {
    const fetchProfessional = async () => {
      // Check if both first name and last name are defined
      if (psych_uid) {
        // Fetch professional data based on psychiatrist's uid
        const data = await fetchProfessionalData(psych_uid);
        setProfessional(data);
      }
    };

    fetchProfessional();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (user && user.userType == "patient") {
        const data = await fetchPatientDetails(user.uid);
        setSavedPsychiatrists(data.savedPsychiatrists)
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
      }
    }
    fetchDocId();
  }, [docId]);

  useEffect(() => {
    const loadProfilePic = async () => {
      if (psych_uid) {
        const picUrl = await fetchProfilePic(psych_uid);
        setProfilePicUrl(picUrl);
      }
    };
    loadProfilePic();
  }, [psych_uid]);

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
    router.push({
      pathname: `/${user?.userType}/${user?.uid}/prof_profile`,
      query: { psych_uid: psych_uid }
    })
  }

  // Render the psychiatrist card only if it's in the list of saved psychiatrists
  if (!savedPsychiatrists.includes(psych_uid)) {
    return null;
  }

  return (
    <div className="card w-11/12 bg-base-100 shadow-xl m-3 border-[3px]">
      <div className="card-body items-center p-4">
      <div className={`flex items-center justify-center flex-shrink-0 mb-4 lg:mb-0`}>
          {profilePicUrl ? (
            <img 
              src={profilePicUrl}
              alt={`${professional?.firstName} ${professional?.lastName}`}
              className="w-36 h-36 object-cover rounded-lg"
            />
          ) : (
            <div 
              style={{ backgroundColor: colors.okb_blue }} 
              className="w-36 h-36 rounded-lg text-6xl font-normal text-white flex items-center justify-center"
            >
              {professional?.firstName?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        {/* <PsychiatristIcon /> */}
        <h2 className="card-title font-montserrat font-semibold">{professional?.firstName} {professional?.lastName}</h2>
        {/* <h2 className="font-[400] italic mb-0">{p_certifications}</h2> */}
        {/* view profile button */}
        <div className="card-actions flex w-full mt-2 justify-left font-inter font-normal text-xs">
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