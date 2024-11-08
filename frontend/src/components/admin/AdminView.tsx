import React, { useEffect, useState } from 'react';
import { fetchDocumentId, fetchPatientDetails, fetchProfessionalData } from '../../../firebase/fetchData';
import { IPsychiatrist } from '../../schema';
import Availability from '../profProfile/Availability';
import Image from 'next/image';
import Link from '../../assets/link.svg';
import Arrow from '../../assets/return_arrow.svg';
import Bookmark from '../../assets/bookmark2.svg';
import SavedBookmark from '../../assets/saved_bookmark2.svg';
import Chat from '../../assets/message2.svg';
import Photo from '../../assets/dummy_photo.jpg';
import ReportIcon from '../../assets/report.svg';
import CheckCircle from '../../assets/check_circle.svg';
import { useRouter } from 'next/router';
import { useAuth } from '../../../contexts/AuthContext';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db, logInWithGoogle, signUpWithGoogle, updateUser } from '../../../firebase/firebase';
import { LoginPopup } from '../LoginPopup';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import Cancel from '@/assets/cancel_report.svg';
import Submit from '@/assets/submit.svg';
import Continue from '@/assets/continue.svg';
import colors from '@/colors';
import dynamic from "next/dynamic";
import ApprovalPrompt from './ApprovalPrompt';
import StatusIcon from '../filter/StatusIcon';
import { deletePsychiatrist, fetchPsychiatrist, updatePsychiatrist } from '../../../firebase/IPsychiatrist';
const InlineWidget = dynamic(() => import("react-calendly").then(mod => mod.InlineWidget), { ssr: false });

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
    padding: 24,
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '500px', // maximum width of the popup
    zIndex: 1001,
    alignItems: 'center', // Center items vertically
};

const textareaStyle: React.CSSProperties = {
    width: '100%',
    height: '150px', // Increased height for more text
    margin: '10px 0 20px 0', // Added some margin top and bottom
    borderWidth: '2px',
    borderColor: '#ddd', // Light grey border color
    padding: '10px', // Padding inside the textarea
    fontSize: 14,
};

const buttonsContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end', // Aligns the buttons to the right
    gap: '8px',
};

const buttonStyle: React.CSSProperties = {
    border: '1px solid #ccc',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '0 5px', // Adds margin between buttons
    fontWeight: 'normal', // Resets button text to normal weight
};



const AdminView = () => {
    const { user } = useAuth(); // Get the user information from the context
    const [docId, setDocId] = useState<string | undefined>(undefined);
    const [hasbeenClosed,setHasBeenClosed] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [showReportPopup, setShowReportPopup] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showBooking, setShowBooking] = useState(false);
    const [professional, setProfessional] = useState<IPsychiatrist | null>(null);
    const [status, setStatus] = useState<'pending' | 'approved' | null>('pending');
    const [reportText, setReportText] = useState('');
    const [savedPsychiatrists, setSavedPsychiatrists] = useState<string[]>([]);
    const router = useRouter();
    const [showApprovalPrompt, setShowApprovalPrompt] = useState(true);


    useEffect(() => {
        const fetchProfessional = async () => {
            const userId = user?.uid;
            const psych_uid = router.query.psych_uid as string;
            if (psych_uid) {
                const data = await fetchProfessionalData(psych_uid);
                setProfessional(data);
            }
        };
        fetchProfessional();
    }, [router.query.psych_uid, user]);

    useEffect(() => {
        const fetchUser = async () => {
            if (user) {
                const data = await fetchPatientDetails(user.uid);
                setSavedPsychiatrists(data.savedPsychiatrists);
            }
        };
        fetchUser();
    }, [user]);

    useEffect(() => {
        const fetchDocId = async () => {
            if (user) {
                const documentId = await fetchDocumentId('patients', user.uid);
                setDocId(documentId);
            }
        };
        fetchDocId();
    }, [user]);

    //give status of pending if psych doesn't have a set status

    useEffect(()=>{

        if(professional){
            if(professional.status === undefined){
                professional.status = 'pending';
            }
            if(professional.status === 'approved') {
                setStatus('approved');
                setHasBeenClosed(true);
                setShowApprovalPrompt(false);
            }


        }
    },[professional])


    //update the status state with psych status 

      const handleApprove = async () => {
        setStatus('approved');
        setShowApprovalPrompt(false);
        if(professional ){
            professional.status = 'approved';
            //firebase id
            const documentId = await fetchDocumentId('psychiatrists', professional.uid);
            await updatePsychiatrist(documentId, professional);
        }
      };


      const handleReject  = async () => {
        setStatus(null); // Mark as rejected (or handle as needed)
        setShowApprovalPrompt(false);

        if(professional){
            console.log(professional);
            //firebase id
            const psychDocumentId = await fetchDocumentId('psychiatrists', professional.uid);
            await deletePsychiatrist(psychDocumentId);

            const userDocumentId = await fetchDocumentId('users', professional.uid);
            const userRef = doc(db, "users", userDocumentId ?? "");
            await deleteDoc(userRef);

            router.push(`/admin/${user?.uid}/database`);
        }
      };

    const handleSave = async (event: React.MouseEvent, psychiatrist) => {
        if (!user) {
            event.preventDefault();
            setShowPopup(true);
        } else {
            try {
                const currUser = await fetchPatientDetails(user.uid);
                const updatedSavedPsychiatrists = [...savedPsychiatrists];
                if (!savedPsychiatrists.includes(psychiatrist.uid)) {
                    updatedSavedPsychiatrists.push(psychiatrist.uid);
                } else {
                    const index = updatedSavedPsychiatrists.indexOf(psychiatrist.uid);
                    if (index !== -1) {
                        updatedSavedPsychiatrists.splice(index, 1);
                    }
                }
                setSavedPsychiatrists(updatedSavedPsychiatrists);
                const userRef = doc(db, 'patients', docId ?? '');
                await updateDoc(userRef, {
                    savedPsychiatrists: updatedSavedPsychiatrists,
                });
            } catch (error) {
                console.error('Error saving psychiatrist');
            }
        }
    };

    const handleReportTextChange = (event) => {
        setReportText(event.target.value);
    };

    const handleReport = (event) => {
        event.preventDefault();
        setShowReportPopup(true);
    };

    const handleCloseReport = () => {
        setShowReportPopup(false);
    };

    const handleContinue = () => {
        setShowSuccessPopup(false);
        router.push(`/patient/${user?.uid}/discover`);
    };

    const handleSubmitReport = async () => {
        if (user && professional) {
            try {
                const reportData = {
                    description: reportText,
                    reporter_type: 'patient',
                    patient_id: user.uid,
                    psych_id: professional.uid,
                    psych_name: professional.firstName + ' ' + professional.lastName,
                    submittedAt: Timestamp.now(),
                    priority: '',
                    reporter_name: user.displayName,
                };
                const docRef = await addDoc(collection(db, 'reports'), reportData);
                console.log('Report submitted with ID: ', docRef.id);
                await updateDoc(doc(db, 'reports', docRef.id), {
                    report_id: docRef.id,
                });
                setShowSuccessPopup(true);
                setShowReportPopup(false);
                setReportText('');
            } catch (error) {
                console.error('Error submitting the report: ', error);
            }
        } else {
            console.error('No user or professional found');
        }
    };

    const handleSendMessage = () => {
        if (!user) {
            setShowPopup(true);
        } else if (professional) {
            router.push({
                pathname: `/patient/${user.uid}/messages`,
                query: {
                    psych_id: professional.uid,
                    psych_name: `${professional.firstName} ${professional.lastName}`,
                },
            });
        } else {
            console.error('Professional data is unavailable.');
        }
    };

    const handleBookAppointment = (event: React.MouseEvent) => {
        if (!user) {
            event.preventDefault();
            setShowPopup(true);
        } else {
            setShowBooking(true);
        }
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

    if (professional === null) {
        return <div>Loading...</div>;
    }


    const handleClose = () => {
        setHasBeenClosed(true);
      };

    return (
        <div className={`w-full max-w-screen-xl mx-auto h-full flex flex-wrap flex-col justify-center content-center gap-5 pb-4`}>
          {/* Back Arrow */}
          <div className={`flex flex-row pt-5`}>
            <figure className={`cursor-pointer`} onClick={router.back}>
              <Arrow />
            </figure>
          </div>

          {/* Main Profile Section */}
          <div className={`gap-4 w-full flex flex-col lg:flex-row gap-10 justify-center`}>
            {/* Left section: Profile Picture */}
            <div className={`flex justify-center  items-center md:justify-start md:items-start lg:shrink`}>
              <img
                src={professional.profile_pic || '/path/to/placeholder.jpg'}
                alt=""
                className="rounded-full w-32 h-32 object-cover"
              />
            </div>

            {/* Right section: Details */}

            <div className={`flex flex-col lg:w-2/3 gap-4 justify-start`}>
            {/* Status Bar */}
            {(status === 'approved' || status === null) && (!hasbeenClosed)  &&(
                <div className={`p-4 mb-4 flex row text-black border-2 p-4  ${status === 'approved' ? 'border-green-700 bg-green-400' : 'border-red-700 bg-red-400'} rounded-lg`}>

                <p>
                    {status === 'approved'
                    ? `✅ The psychiatrist is now approved`
                    : '❌ The psychiatrist has been rejected'}
                </p>
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="ml-auto top-2 right-2 text-black font-bold text-xxxxl"
                    aria-label="Close"
                > 
                X

                </button>
                </div>
            )}
              <div className={`flex flex-col md:flex-row gap-4 justify-between`}>
                {/* Name and Title */}
                <div className='flex gap-x-4 justify-center items-center md:justify-start md:items-start flex-col'>
                  <div className={`flex flex-row text-3xl text-bold font-montserrat font-bold`}>
                    {professional.firstName + ' ' + professional.lastName}
                    <hr />
                    <StatusIcon status={status ? status : 'pending'}></StatusIcon>
                  </div>
                  <div className={`text-normal text-xl italic text-dark-grey font-montserrat`}>
                    {professional.position}
                  </div>
                </div>

                <div className='flex flex-row gap-4 justify-center items-center md:justify-start md:items-start'>
                  <button className="bg-blue-500 text-white px-8 py-2 rounded-md hover:bg-blue-600 transition duration-150">Download</button>
                </div>
              </div>

              {/* Tags for Gender, Languages, and Specialties */}
              <div className={`flex flex-row flex-wrap justify-center items-center md:justify-start md:items-start gap-2 font-montserrat`}>
                {/* Gender Enum Mapping */}
                <div className={`px-3 py-2 border-2 rounded-[20px] border-light-blue`}>
                    {professional.gender === 1
                    ? 'Female'
                    : professional.gender === 2
                    ? 'Male'
                    : 'Other'}
                </div>
                {professional.language.map((language, index) => (
                  <div className={`px-3 py-2 border-2 rounded-[20px] border-light-blue`} key={index}>
                    {language}
                  </div>
                ))}
                {professional.specialty.map((speciality, index) => (
                  <div className={`px-3 py-2 border-2 rounded-[20px] border-light-blue`} key={index}>
                    {speciality}
                  </div>
                ))}
              </div>
              {/* Description */}
              <div className={`text-normal text-center md:text-start text-base font-montserrat`}>
                {professional.description}
              </div>
              <div>
              {showApprovalPrompt ? (
          <ApprovalPrompt onApprove={handleApprove} onReject={handleReject} />
        ) : (
          status === 'approved' && (
            <>
              <h2 className={`text-center lg:text-start text-bold text-2xl font-montserrat font-bold`}> Availability </h2>
                <Availability
                    weeklyAvailability={professional?.weeklyAvailability || []}
                    workingHours={professional?.workingHours}
                />
                <hr />
            <div className={`flex flex-row justify-center content-center`}>
                <button
                    className={`bg-okb-blue font-montserrat text-okb-white active:bg-gray-500 font-semibold px-12 py-4 rounded-xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                    type="button"
                    onClick={handleBookAppointment}
                >
                    Book Appointment
                </button>
                </div>
                </>
          )
        )}
              </div>
            </div>

          </div>
        </div>
      );
};

export default AdminView;