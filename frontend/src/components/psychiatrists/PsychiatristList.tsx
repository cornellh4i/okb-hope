import { useEffect, useState } from 'react';
import Bookmark from '@/assets/bookmark.svg'
import SavedBookmark from '@/assets/saved_bookmark.svg'
import Message from '@/assets/message.svg'
import ViewReport from '@/assets/view_reports.svg'
import Link from 'next/link';
import { useAuth } from '../../../contexts/AuthContext';
import { db, logInWithGoogle, fetchProfilePic } from '../../../firebase/firebase';
import { useRouter } from 'next/router';
import { LoginPopup } from '../LoginPopup';
import { IPsychiatrist, IUser } from '@/schema';
import okb_colors from "@/colors";
import { fetchAllUsers, fetchPatientDetails, fetchDocumentId } from '../../../firebase/fetchData';
import { doc, updateDoc } from 'firebase/firestore';
import colors from '@/colors';

interface PsychiatristListProps {
  results: IPsychiatrist[];
  buttonType?: string;
  profilePicsCache: Record<string, string | null>;
  setProfilePicsCache: (cache: Record<string, string | null>) => void;
}

const PsychiatristList: React.FC<PsychiatristListProps> = ({ results, buttonType = "discover", profilePicsCache, setProfilePicsCache }) => {
  const { user } = useAuth();
  const uid = user?.uid;
  const [docId, setDocId] = useState<string | undefined>(undefined);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();
  const [users, setUsers] = useState<IUser[]>([]);
  const [savedPsychiatrists, setSavedPsychiatrists] = useState<string[]>([]);
  const [professional, setProfessional] = useState<IPsychiatrist | null>(null);


  const [showReportHistoryPopup, setShowReportHistoryPopup] = useState(false);
  const [profilePics, setProfilePics] = useState<Record<string, string | null>>({});

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
      }
    }
    fetchUser();
  }, []);

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
    const fetchUser = async () => {
      if (user) {
        const data = await fetchPatientDetails(user.uid);
        setSavedPsychiatrists(data.savedPsychiatrists)
      }
    }
    fetchUser();
  }, [savedPsychiatrists, user]);

  useEffect(() => {
    const loadProfilePics = async () => {
      const pics: Record<string, string | null> = {};
      for (const psychiatrist of results) {
        const id: string = psychiatrist.uid;
        if (!profilePicsCache[id]) {  // Check cache first
          const picUrl = await fetchProfilePic(psychiatrist.uid);
          pics[psychiatrist.uid] = picUrl;
        }
      }
      if (Object.keys(pics).length > 0) {
        const newCache = {
          ...profilePicsCache,
          ...pics
        };
        setProfilePicsCache(newCache);
        setProfilePics(newCache);
      } else {
        setProfilePics(profilePicsCache);
      }
    };
    loadProfilePics();
  }, [results, profilePicsCache]);

  const handleSendMessage = (event: React.MouseEvent, psychiatrist) => {
    event.stopPropagation();
    if (!user) {
      event.preventDefault();
      setShowPopup(true);
    } else {
      try {
        event.stopPropagation();
        router.push({
          pathname: `/patient/${user.uid}/messages`,
          query: {
            psych_id: psychiatrist.uid,
            psych_name: `${psychiatrist.firstName} ${psychiatrist.lastName}`
          }
        });
        console.log("went to message page")
      }
      catch (error) {
        console.error('Error going to message page');
      }
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
          <button className={`btn flex py-2 px-4 justify-center items-center gap-3 rounded-lg bg-[#195BA5] text-[${okb_colors.white}] text-[16px] flex`} onClick={(event) => handleSave(event, psychiatrist)}>
            {savedPsychiatrists.includes(psychiatrist.uid) ? <SavedBookmark /> : <Bookmark />}
            <div className='font-montserrat font-semibold'>Save</div>
          </button>
          <button
            className={`btn flex py-2 px-4 justify-center items-center gap-3 rounded-lg bg-[${okb_colors.okb_blue}] text-[${okb_colors.white}] text-[16px] flex`}
            onClick={(event) => handleSendMessage(event, psychiatrist)}
          >
            <Message />
            <div className='font-montserrat font-semibold'>Message</div>
          </button>
        </>
      );
    }
  }


  //break

  return (
    <div className={'px-4 lg:px-24 pt-9'}>
      <div className='pb-8'>
        <div className={`psychiatrist-list flex flex-col items-stretch gap-6 w-full`}>
          {showPopup && <LoginPopup onClose={() => setShowPopup(false)} logInWithGoogleAndRedirect={logInWithGoogleAndRedirect} signUpWithGoogleAndRedirect={signUpWithGoogleAndRedirect} />}
          {results.map((psychiatrist) => (
            <div key={psychiatrist.uid} className="psychiatrist w-full" onClick={() => handleGoToProfProfile(psychiatrist.uid)}>
              {/* Display the psychiatrist's information here */}
              <div className={`card card-side flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-start gap-2.5 rounded-lg bg-[${okb_colors.white}] shadow-[0_0px_5px_0px_rgb(0,0,0,0.15)] gap-x-6 hover:brightness-90 p-6 w-full`}>
                <div className={`flex items-center justify-center flex-shrink-0 mb-4 lg:mb-0`}>
                {profilePics[psychiatrist.uid] ? (
                    <img 
                      src={profilePics[psychiatrist.uid]!}
                      alt={`${psychiatrist.firstName} ${psychiatrist.lastName}`}
                      className="w-36 h-36 object-cover"
                    />
                  ) : (
                    <div 
                      style={{ backgroundColor: colors.okb_blue }} 
                      className={`w-36 h-36 text-6xl font-normal text-white flex items-center justify-center`}
                    >
                      {psychiatrist.firstName?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className={`flex flex-col flex-1 gap-4 w-full h-auto`}>
                  {/* Grid (to enable easier organization of columns) w/ psychiatrist name + buttons */}
                  <div className={`flex flex-col lg:flex-row justify-between items-center w-full self-stretch`}>
                    <div className={`flex flex-col justify-center lg:items-start items-center gap-2`}>
                      <h2 className={`card-title col-span-2 text-[${okb_colors.black}] text-[24px] font-montserrat font-semibold not-italic`}>{psychiatrist.firstName} {psychiatrist.lastName}</h2>
                      <p className={`text-[${okb_colors.black}] text-[16px] text-center font-montserrat font-semibold`}>{psychiatrist.position} at {psychiatrist.location}</p>
                    </div>
                    <div className={`flex justify-center lg:justify-end items-center gap-4 w-full lg:w-auto mt-4 lg:mt-0`}>
                      {renderButtons(psychiatrist)}
                    </div>
                  </div>
                  {/* Additional psychiatrist info */}
                  <div className={`flex w-full justify-center lg:justify-start items-center lg:items-start min-h-[4rem] mt-4 lg:mt-0`}>
                    <p className={`text-[${okb_colors.dark_gray}] text-[12px] font-montserrat font-normal overflow-hidden overflow-ellipsis`} style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', lineClamp: 3, MozBoxOrient: 'vertical', textAlign: 'left' }}>{psychiatrist.description ? psychiatrist.description : "No description available."}</p>
                  </div>
                </div>
              </div>
            </div >
          ))
          }
        </div >
      </div>
    </div>
  );
};

export default PsychiatristList;