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
import DoctorIcon from '@/assets/doctor_icon.svg';
import SimilarPsychiatristsDisplay from './SimilarPsychiatrists';
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
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="w-full lg:w-2/3 bg-white shadow-md rounded-lg p-8">
                {/* Header with Image and Info */}
                <div className="flex gap-6 items-start mb-8">
                    {/* Profile Image */}
                    <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                        {professional?.profile_pic ? (
                            <img
                                src={professional.profile_pic}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div 
                                style={{ 
                                    width: '100%', 
                                    height: '100%', 
                                    backgroundColor: colors.okb_blue 
                                }} 
                                className="text-4xl font-normal text-white flex items-center justify-center"
                            >
                                {professional?.firstName?.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>

                    {/* Name and Title */}
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold font-montserrat mb-2">
                            Dr. {professional?.firstName} {professional?.lastName}
                        </h1>
                        <div className="flex items-center gap-2 text-gray-600 font-montserrat">
                            <DoctorIcon className="w-5 h-5" />
                            <p>Psychiatrist at {professional?.location}</p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mb-8">
                    <button
                        onClick={handleBookAppointment}
                        className="flex-1 py-3 bg-okb-blue text-white rounded-lg font-montserrat hover:bg-light-blue transition"
                    >
                        Book online appointment
                    </button>
                    <button
                        onClick={handleSendMessage}
                        className="flex-1 py-3 border border-okb-blue text-okb-blue rounded-lg font-montserrat hover:bg-gray-50 transition"
                    >
                        Send a message
                    </button>
                    <button
                        onClick={(event) => handleSave(event, professional)}
                        className="flex-1 py-3 border border-okb-blue text-okb-blue rounded-lg font-montserrat hover:bg-gray-50 transition flex items-center justify-center gap-2"
                    >
                        <div className="flex items-center justify-center gap-0">
                            {savedPsychiatrists.includes(professional?.uid) ? 
                                <SavedBookmark /> : 
                                <Bookmark />
                            }
                            <span>Save Psychiatrist</span>
                        </div>
                    </button>
                </div>

                {/* About Section */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold font-montserrat mb-4">About me</h2>
                    <p className="text-gray-600 font-montserrat">
                        {professional?.description || "No description available."}
                    </p>
                </div>

                {/* Languages Section */}
                <div>
                    <h2 className="text-xl font-semibold font-montserrat mb-4">Languages</h2>
                    <div className="flex flex-wrap gap-3">
                        {professional?.language.map((language, index) => (
                            <div
                                key={index}
                                className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 font-montserrat"
                            >
                                {language}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Similar Psychiatrists Section */}
            <div className="w-full lg:w-1/3 bg-white shadow-md rounded-lg p-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 font-montserrat">
                    Similar Psychiatrists
                </h3>
                <p className="text-gray-600 font-montserrat">
                    < SimilarPsychiatristsDisplay/>
                </p>
            </div>

            {/* Modals */}
            {showBooking && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black bg-opacity-50">
                        <InlineWidget url= {professional.calendly ?? "https://calendly.com/hubert-minghao-he/30min"} />
                        <button onClick={() => handleBookingClose()} className="absolute top-0 right-0 m-4 text-white">
                            X
                        </button>
                    </div>
                </div>
            )}

            {showPopup && (
                <LoginPopup
                    onClose={() => setShowPopup(false)}
                    logInWithGoogleAndRedirect={logInWithGoogleAndRedirect}
                    signUpWithGoogleAndRedirect={signUpWithGoogleAndRedirect}
                />
            )}

            {showReportPopup && (
                <div style={overlayStyle}>
                    <div style={popupStyle}>
                        <h3 className="font-montserrat font-bold mb-4">
                            Report Dr. {professional?.firstName} {professional?.lastName}?
                        </h3>
                        <p className="font-montserrat text-sm mb-4">
                            We are committed to ensuring your right to privacy and safety. If you feel like any of these rights have been violated by a psychiatrist that you are seeing, please fill out the report form below.
                        </p>
                        <textarea
                            className="font-montserrat w-full p-3 border rounded-lg"
                            placeholder="Please provide a detailed description of your situation here."
                            value={reportText}
                            onChange={handleReportTextChange}
                        />
                        <div className="flex justify-end gap-4 mt-4">
                            <Cancel onClick={handleCloseReport} className="cursor-pointer" />
                            <Submit onClick={handleSubmitReport} className="cursor-pointer" />
                        </div>
                    </div>
                </div>
            )}

            {showSuccessPopup && (
                <div style={overlayStyle}>
                    <div style={popupStyle}>
                        <CheckCircle className="mb-4" />
                        <div className="text-center">
                            <h3 className="font-montserrat font-bold mb-4">
                                You have successfully reported Dr. {professional?.firstName} {professional?.lastName}.
                            </h3>
                            <p className="font-montserrat text-sm mb-4">
                                Dr. {professional?.firstName} {professional?.lastName}'s profile will be removed from your view and you will now be redirected back to the list of available psychiatrists. If you'd like to access your reported psychiatrists, check out the report section in your profile.
                            </p>
                            <Continue onClick={handleContinue} className="cursor-pointer" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfProfileBox;