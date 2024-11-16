import React, { useEffect, useState } from 'react';
import { fetchDocumentId, fetchPatientDetails, fetchProfessionalData } from '../../../firebase/fetchData';
import { IPsychiatrist } from '../../schema';
import Availability from './Availability';
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
import { doc, updateDoc } from 'firebase/firestore';
import { db, logInWithGoogle, signUpWithGoogle } from '../../../firebase/firebase';
import { LoginPopup } from '../LoginPopup';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import Cancel from '@/assets/cancel_report.svg';
import Submit from '@/assets/submit.svg';
import Continue from '@/assets/continue.svg';
import colors from '@/colors';
import dynamic from "next/dynamic";
const InlineWidget = dynamic(() => import("react-calendly").then(mod => mod.InlineWidget), { ssr: false });

// interface ProfProfileProps {
//     firstName: string;
//     lastName: string;
// }

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


const ProfProfileBox = () => {
    const { user } = useAuth(); // Get the user information from the context
    const [docId, setDocId] = useState<string | undefined>(undefined);
    const [showPopup, setShowPopup] = useState(false);
    const [showReportPopup, setShowReportPopup] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showBooking, setShowBooking] = useState(false);
    const [reportText, setReportText] = useState('');
    const [professional, setProfessional] = useState<IPsychiatrist | null>(null);
    const [savedPsychiatrists, setSavedPsychiatrists] = useState<string[]>([]);
    const router = useRouter();

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

    const handleBookingClose = () => {
        setShowPopup(false);
        setShowBooking(false);
    };

    return (
        <div
            className="min-h-screen w-full flex flex-col"
            style={{ backgroundColor: "rgba(247, 247, 245, 1)" }}
        >
            <div className="gap-4 w-full flex flex-col lg:flex-row gap-10 justify-center px-6 lg:px-16">
                <div className="flex flex-col gap-8 w-full lg:w-2/3 bg-white shadow-md rounded-lg p-8">
                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                        <div className="flex-shrink-0">
                            <img
                                src={professional.profile_pic || '/path/to/placeholder.jpg'}
                                alt="Profile"
                                className="rounded-full w-40 h-40 object-cover"
                            />
                        </div>
                        <div className="flex flex-col gap-6 w-full">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900">
                                    {professional.firstName} {professional.lastName}
                                </h2>
                                <p className="text-lg italic text-gray-600">
                                    Psychiatrist at {professional.location || "Cornell Hospital"}
                                </p>
                            </div>
                            <div className="flex gap-6">
                                <button
                                    onClick={handleBookAppointment}
                                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition"
                                >
                                    Book Appointment
                                </button>
                                <button
                                    onClick={handleSendMessage}
                                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition"
                                >
                                    <figure>
                                        <Chat />
                                    </figure>
                                    Send Message
                                </button>
                                <button
                                    onClick={(event) => handleSave(event, professional)}
                                    className={`flex items-center gap-2 px-6 py-3 text-lg rounded-lg ${
                                        savedPsychiatrists.includes(professional.uid)
                                            ? "bg-green-600"
                                            : "bg-blue-600"
                                    } text-white hover:bg-blue-700 transition`}
                                >
                                    <figure>
                                        {savedPsychiatrists.includes(professional.uid) ? (
                                            <SavedBookmark />
                                        ) : (
                                            <Bookmark />
                                        )}
                                    </figure>
                                    {savedPsychiatrists.includes(professional.uid) ? "Saved" : "Save"}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6">
                        <h3 className="text-2xl font-semibold text-gray-800">About Me</h3>
                        <p className="text-lg text-gray-600">
                            {professional.description || "No description available."}
                        </p>
                    </div>
                    <div className="mt-6">
                        <h3 className="text-2xl font-semibold text-gray-800">Languages</h3>
                        <div className="flex flex-wrap gap-3 mt-4">
                            {professional.language.map((language, index) => (
                                <div
                                    key={index}
                                    className="px-4 py-2 bg-blue-100 text-blue-600 text-lg rounded-lg"
                                >
                                    {language}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/3 bg-white shadow-md rounded-lg p-8">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Similar Psychiatrists</h3>
                    <p className="text-lg text-gray-600">This section is under development.</p>
                </div>
            </div>
        </div>
    );
    
    
      
    
};

export default ProfProfileBox;