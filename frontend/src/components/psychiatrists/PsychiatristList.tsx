import { useEffect, useState } from 'react';
import Bookmark from '@/assets/bookmark.svg'
import SavedBookmark from '@/assets/saved_bookmark.svg'
import Message from '@/assets/message.svg'
import Link from 'next/link';
import { useAuth } from '../../../contexts/AuthContext';
import { db, fetchUser, logInWithGoogle } from '../../../firebase/firebase';
import { useRouter } from 'next/router';
import { LoginPopup } from '../LoginPopup';
import { IPsychiatrist, IUser } from '@/schema';
import okb_colors from "@/colors";
import { fetchAllUsers, updateUser, fetchPatientDetails, fetchDocumentId } from '../../../firebase/fetchData';
import { doc, updateDoc } from 'firebase/firestore';

interface PsychiatristListProps {
  results: IPsychiatrist[];
}

const PsychiatristList: React.FC<PsychiatristListProps> = ({ results }) => {
  const { user } = useAuth();
  const uid = user?.uid;
  const [docId, setDocId] = useState<string | undefined>(undefined);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();
  const [users, setUsers] = useState<IUser[]>([]);
  const [savedPsychiatrists, setSavedPsychiatrists] = useState<string[]>([]);


  // Get all users from the database
  useEffect(() => {
    async function fetchData() {
      try {
        const fetchUsers: IUser[] = await fetchAllUsers();
        setUsers(fetchUsers);
      } catch (err: any) {
        console.error(err.message);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (uid) {
        const data = await fetchPatientDetails(uid);
        console.log(data)
      }
    }
    fetchUser();
  }, []);

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

  const handleSendMessage = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (user) {
      router.push(`/${user?.userType}/${user?.uid}/messages`)
    }
    else {
      event.preventDefault();
      setShowPopup(true);
    }
  };

  const handleSave = async (event: React.MouseEvent, psychiatrist) => {
    event.stopPropagation();
    if (!user) {
      event.preventDefault();
      setShowPopup(true);
    } else {
      try {
        event.stopPropagation();
        const updatedSavedPsychiatrists = [...savedPsychiatrists];

        // Check if the psychiatrist is already saved
        if (!savedPsychiatrists.includes(psychiatrist.uid)) {
          // If not saved, add the psychiatrist to the savedPsychiatrists array
          updatedSavedPsychiatrists.push(psychiatrist.uid);
        } else {
          // If already saved, unsave it by removing the psychiatrist from the savedPsychiatrists array
          const index = updatedSavedPsychiatrists.indexOf(psychiatrist.uid);
          if (index !== -1) {
            updatedSavedPsychiatrists.splice(index, 1);
          }
        }
        setSavedPsychiatrists(updatedSavedPsychiatrists)

        // Update the result to firebase
        const userRef = doc(db, "patients", docId ?? "");
        await updateDoc(userRef, {
          savedPsychiatrists: updatedSavedPsychiatrists
        })
      } catch (error) {
        console.error('Error saving psychiatrist');
      }
    }
  };

  // Redirects to a professional's profile page and passes their uid as query parameter
  function handleGoToProfProfile(psych_uid: string) {
    {
      user ?
        router.push({
          pathname: `/${user?.userType}/${user?.uid}/prof_profile`,
          query: { psych_uid: psych_uid }
        })
        : router.push({
          pathname: `/prof_profile`,
          query: { psych_uid: psych_uid }
        })
    }
  }

  const logInWithGoogleAndRedirect = async (onClose: () => void) => {
    await logInWithGoogle();
    setShowPopup(false);
    onClose();
  };

  const signUpWithGoogleAndRedirect = async (onClose: () => void) => {
    router.push('/questionnaire'); // Moved this line before the closing of the popup
    setShowPopup(false);
    onClose();
  };

  return (
    <div className={`psychiatrist-list flex flex-col items-start gap-6`}>
      {showPopup && <LoginPopup onClose={() => setShowPopup(false)} logInWithGoogleAndRedirect={logInWithGoogleAndRedirect} signUpWithGoogleAndRedirect={signUpWithGoogleAndRedirect} />}
      {results.map((psychiatrist) => (
        <div key={psychiatrist.uid} className="psychiatrist" onClick={() => handleGoToProfProfile(psychiatrist.uid)}>
          {/* Display the psychiatrist's information here */}
          <div className={`card card-side flex flex-row justify-center items-center gap-2.5 rounded-lg bg-[${okb_colors.white}] shadow-[0_0px_5px_0px_rgb(0,0,0,0.15)] items-start gap-x-6 bg-base-100 grid-cols-5 hover:brightness-90 p-6 self-stretch`}>
            <div className={`col-span-1 flex items-center justify-center`}>
              <figure>
                <img src="https://lh3.googleusercontent.com/a/AGNmyxZobZdPI78Xzk3dOtXciW5fAE3Wn-QIZYlJTdk_=s96-c" alt="Profile Pic" className={`rounded-full w-32 h-32 object-cover`} />
              </figure>
            </div>
            <div className={`flex flex-col items-start gap-4 flex-1 w-full h-auto`}>
              {/* Grid (to enable easier organization of columns) w/ psychiatrist name + buttons */}
              <div className={`flex justify-between items-start self-stretch`}>
                <div className={`flex flex-col items-start gap-2`}>
                  <h2 className={`card-title col-span-2 text-[${okb_colors.black}] text-[24px] font-semibold not-italic`}>{psychiatrist.firstName} {psychiatrist.lastName}</h2>
                  <p className={`text-[${okb_colors.black}] text-[16px] font-semibold`}>{psychiatrist.position} at {psychiatrist.location}</p>
                </div>
                <div className={`flex justify-end items-center gap-4`}>
                  <button className={`btn flex py-2 px-4 justify-center items-center gap-3 rounded-lg bg-[#195BA5] text-[${okb_colors.white}] text-[16px] flex`} onClick={(event) => handleSave(event, psychiatrist)}>
                    {savedPsychiatrists.includes(psychiatrist.uid) ? <SavedBookmark /> : <Bookmark />}
                    <div>Save</div>
                  </button>
                  <div
                    className={`btn flex py-2 px-4 justify-center items-center gap-3 rounded-lg bg-[${okb_colors.okb_blue}] text-[${okb_colors.white}] text-[16px] flex`}
                    onClick={handleSendMessage}
                  >
                    <Message />
                    <div>Message</div>
                  </div>
                </div>
              </div>
              {/* Additional psychiatrist info */}
              <div className={`self-stretch`}>
                <p className={`text-[${okb_colors.dark_gray}] text-[12px] font-normal`}>{psychiatrist.description}</p>
              </div>
            </div>
          </div>
        </div >
      ))
      }
    </div >
  );
};

export default PsychiatristList;