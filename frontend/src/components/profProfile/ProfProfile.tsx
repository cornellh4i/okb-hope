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

const ProfProfile = () => {
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
        <div className={`w-2/3 h-full flex flex-wrap flex-col justify-center content-center gap-5 pb-4`}>
            {showBooking && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black bg-opacity-50">
                        <InlineWidget url= {professional.calendly ?? "https://calendly.com/hubert-minghao-he/30min"} />
                        <button onClick={() => handleBookingClose()} className="absolute top-0 right-0 m-4 text-white">X</button>
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
                        <h3 className="font-montserrat font-bold" style={{ marginBottom: '15px' }}>
                            Report Dr. {professional.firstName} {professional.lastName}?
                        </h3>
                        <p className="font-montserrat" style={{ fontSize: 14, marginBottom: '15px' }}>
                            We are committed to ensuring your right to privacy and safety. If you feel like any of these rights have been violated by a psychiatrist that you are seeing, please fill out the report form below.
                        </p>
                        <textarea
                            className="font-montserrat"
                            style={textareaStyle}
                            placeholder={'Please provide a detailed description of your situation here.'}
                            value={reportText}
                            onChange={handleReportTextChange}
                        ></textarea>
                        <div style={buttonsContainerStyle}>
                            <Cancel onClick={handleCloseReport} style={{ cursor: 'pointer' }} />
                            <Submit onClick={handleSubmitReport} style={{ cursor: 'pointer' }} />
                        </div>
                    </div>
                </div>
            )}
            {showSuccessPopup && (
                <div style={overlayStyle}>
                    <div style={{ ...popupStyle, gap: '12px' }}>
                        <CheckCircle style={{ top: 20 }} />
                        <div style={{ display: 'inline-flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 14 }}>
                            <h3 className="font-montserrat" style={{ fontWeight: 'bold', marginBottom: '15px', fontSize: 14 }}>You have successfully reported Dr. {professional.firstName} {professional.lastName}.</h3>
                            <p className="font-montserrat" style={{ marginBottom: '15px', fontSize: 13 }}>
                                Dr. {professional.firstName} {professional.lastName}'s profile will be removed from your view and you will now be redirected back to the list of available psychiatrists. If you'd like to access your reported psychiatrists, check out the report section in your profile.
                            </p>
                            <Continue style={{ cursor: 'pointer' }} onClick={handleContinue} />
                        </div>
                    </div>
                </div>
            )}
            <div className={`flex flex-row pt-5`}>
                <figure className={`cursor-pointer`} onClick={router.back}><Arrow /></figure>
            </div>
            <div className={`flex flex-col lg:flex-row gap-10 justify-center`}>
                <div className={`flex justify-center items-center md:justify-start md:items-start lg:shrink`}>
                    <div style={{ width: 300, height: 300, backgroundColor: colors.okb_blue, objectFit: 'cover' }} className={`text-9xl font-normal text-white flex items-center justify-center`}>
                        {professional.firstName?.charAt(0).toUpperCase()}
                    </div>
                </div>
                <div className={`flex flex-col lg:w-2/3 gap-4 justify-start`}>
                    <div className={`flex flex-col md:flex-row gap-4 justify-between`}>
                        <div className='flex gap-x-4 justify-center items-center md:justify-start md:items-start flex-col'>
                            <div className={`text-3xl text-bold font-montserrat font-bold`}>
                                {professional.firstName + ' ' + professional.lastName}
                            </div>
                            <div className={`text-normal text-xl italic text-dark-grey font-montserrat`}>
                                {professional.position}
                            </div>
                        </div>
                        <div className='flex flex-row gap-4 justify-center items-center md:justify-start md:items-start'>
                            {user && user.userType === 'patient' && (
                                <div className={`shrink`} >
                                    <button onClick={handleReport} className={` rounded-s-2xl rounded-[12px] transition cursor-pointer text-okb-white flex flex-row gap-2`}>
                                        <ReportIcon className="object-cover" />
                                    </button>
                                </div>
                            )}
                            <div className='flex flex-row gap-4 justify-center items-center md:justify-start md:items-start'>
                                <div className={`shrink`}>
                                    <div onClick={(event) => handleSave(event, professional)} className={`px-4 py-2 rounded-s-2xl rounded-[12px] bg-okb-blue hover:bg-light-blue transition cursor-pointer text-okb-white flex flex-row gap-2 text-semibold font-montserrat`}>
                                        <figure className="object-cover">{savedPsychiatrists.includes(professional.uid) ? <SavedBookmark /> : <Bookmark />}</figure>Save
                                    </div>
                                </div>
                                <div className={`shrink`} >
                                    <div onClick={handleSendMessage} className={`px-4 py-2 rounded-s-2xl rounded-[12px] bg-okb-blue hover:bg-light-blue transition cursor-pointer text-okb-white flex flex-row gap-2 font-montserrat`}>
                                        <figure className="object-cover"><Chat /></figure>Message
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`flex flex-row flex-wrap justify-center items-center md:justify-start md:items-start gap-2 font-montserrat`}>
                        {professional.specialty.map((speciality, index) => (
                            <div className={`px-3 py-2 border-2 rounded-[20px] border-light-blue`} key={index}>
                                {speciality}
                            </div>
                        ))}
                        {professional.language.map((language, index) => (
                            <div className={`px-3 py-2 border-2 rounded-[20px] border-light-blue`} key={index}>
                                {language}
                            </div>
                        ))}
                        {professional.location && (
                            <div className={`px-3 py-2 border-2 rounded-[20px] border-light-blue`}>
                                {professional.location}
                            </div>)
                        }
                    </div>
                    <div className={`text-normal text-center md:text-start text-base font-montserrat`}>
                        {professional.description ? professional.description : 'No description available.'}
                    </div>
                    {/* Website (Removed for now) */}
                    {/* <div className={`flex flex-row justify-center items-center md:justify-start md:items-start`}>
                        <div className="px-4 py-2 border-2 rounded-s-2xl rounded-[20px] border-light-blue bg-lightest-blue hover:shadow-xl transition cursor-pointer flex flex-row gap-2">
                            <a
                                href="https://www.wohohiame.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center font-montserrat"
                            >
                                <figure className="object-cover"><Link /></figure>
                                <span className="ml-2">www.mentalhealthsite.com</span>
                            </a>
                        </div>
                    </div> */}
                </div>
            </div>
            <h2 className={`text-center lg:text-start text-bold text-2xl font-montserrat font-bold`}>Working Hours</h2>
            <Availability
                weeklyAvailability={professional?.weeklyAvailability || []}
                workingHours={professional?.workingHours}
            />
            <div className={`flex flex-row justify-center content-center`}>
                <button
                    className={`bg-okb-blue font-montserrat text-okb-white active:bg-gray-500 font-semibold px-12 py-4 rounded-xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                    type="button"
                    onClick={handleBookAppointment}
                >
                    Book Appointment
                </button>
            </div>
        </div>
    );
};

export default ProfProfile;
