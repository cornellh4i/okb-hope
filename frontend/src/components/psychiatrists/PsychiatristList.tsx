import { useEffect, useState } from 'react';
import Bookmark from '@/assets/bookmark.svg'
import SavedBookmark from '@/assets/saved_bookmark.svg'
import Message from '@/assets/message.svg'
import ViewReport from '@/assets/view_reports.svg'
import Link from 'next/link';
import { useAuth } from '../../../contexts/AuthContext';
import { db, fetchUser, signInWithGoogle } from '../../../firebase/firebase';
import { useRouter } from 'next/router';
import { LoginPopup } from '../LoginPopup';
import { IPsychiatrist, IUser } from '@/schema';
import okb_colors from "@/colors";
import { fetchAllUsers, updateUser, fetchPatientDetails, fetchDocumentId } from '../../../firebase/fetchData';
import { doc, updateDoc } from 'firebase/firestore';

interface PsychiatristListProps {
  results: IPsychiatrist[];
  buttonType: string;
}

const PsychiatristList: React.FC<PsychiatristListProps> = ({ results, buttonType = "discover" }) => {
  const { user } = useAuth();
  const uid = user?.uid;
  const [docId, setDocId] = useState<string | undefined>(undefined);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();
  const [users, setUsers] = useState<IUser[]>([]);
  const [savedPsychiatrists, setSavedPsychiatrists] = useState<string[]>([]);

  const [showReportHistoryPopup, setShowReportHistoryPopup] = useState(false);

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  };

  const popupStyle: React.CSSProperties = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    width: '30%', // adjust the width as needed
    maxWidth: '500px', // maximum width of the popup
    zIndex: 1001,
  };

  const textareaStyle: React.CSSProperties = {
    width: '100%',
    height: '150px', // Increased height for more text
    margin: '10px 0 20px 0', // Added some margin top and bottom
    borderColor: '#ddd', // Light grey border color
    padding: '10px', // Padding inside the textarea
  };

  const buttonsContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end', // Aligns the buttons to the right
  };

  const buttonStyle: React.CSSProperties = {
    border: '1px solid #ccc',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '0 5px', // Adds margin between buttons
    fontWeight: 'normal', // Resets button text to normal weight
  };

  const submitButtonStyle: React.CSSProperties = {
    ...buttonStyle, // Spread the existing button styles
    backgroundColor: '#007bff', // Use a blue background
    color: '#fff', // White text color
    fontWeight: 'bold', // Make text bold
    marginLeft: '10px', // Add some left margin
  };
  const continueButtonStyle: React.CSSProperties = {
    // Add your styling here similar to the submit button
    backgroundColor: '#007bff', // or any other color you prefer
    color: '#fff',
    fontWeight: 'bold',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    border: 'none',
  };

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
    if (!user) {
      event.preventDefault();
      setShowPopup(true);
    }
  };

  const handleSave = async (event: React.MouseEvent, psychiatrist) => {
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
    console.log(psych_uid)
    router.push({
      pathname: `/${user?.uid}/prof_profile`,
      query: { psych_uid: psych_uid }
    })
  }

  const signInWithGoogleAndRedirect = async (onClose: () => void) => {
    await signInWithGoogle();
    router.push('/messages'); // Moved this line before the closing of the popup
    setShowPopup(false);
    onClose();
  };

  // Trigger report popup to show up
  const handleOpenReportHistory = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setShowReportHistoryPopup(true);
  };

  // Trigger report popup to close
  const handleCloseReportHistory = (event) => {
    event.stopPropagation();
    setShowReportHistoryPopup(false);
  };


  //break
  const renderButtons = (psychiatrist: IPsychiatrist) => {
    if (buttonType === "report") {
      return (
        <>
          {showReportHistoryPopup && (
      <div style={overlayStyle}>
        <div style={popupStyle}>
          <h2>Dr. Gloria Shi</h2>
          <h3>Report Box</h3>
          <p>Psychiatrist at Wohiame Hospital</p>
          <p>The following report for Dr. Gloria Shi was submitted on: October 12th, 2023 at 7:16 PM.</p>
          {/* Other content and styles from the report would go here. */}
          <button onClick={(event) => handleCloseReportHistory(event)}>Close</button>
        </div>
      </div>
    )} 
      <button onClick={(event) => handleOpenReportHistory(event)}>
              <ViewReport />
      </button>

              </>
      );
    }
    else {
      return (
        <>
          <button className="btn flex py-2 px-4 justify-center items-center gap-3 rounded-lg bg-[#195BA5] text-white text-[16px] flex" onClick={(event) => handleSave(event, psychiatrist)}>
            {savedPsychiatrists.includes(psychiatrist.uid) ? <SavedBookmark /> : <Bookmark />}
            <div>Save</div>
          </button>
          <Link href="/messages" className="btn flex py-2 px-4 justify-center items-center gap-3 rounded-lg bg-[#195BA5] text-white text-[16px] flex" onClick={handleSendMessage}>
            <Message />
            <div>Message</div>
          </Link>
        </>
      );
    }    
  }


  //break

  return (
    <div className={`psychiatrist-list flex flex-col items-start gap-6`}>
      {showPopup && <LoginPopup onClose={() => setShowPopup(false)} signInWithGoogleAndRedirect={signInWithGoogleAndRedirect} />}
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
                  {renderButtons(psychiatrist)}
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