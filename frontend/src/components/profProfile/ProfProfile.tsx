import React, { useEffect, useState } from 'react';
import { fetchDocumentId, fetchPatientDetails, fetchProfessionalData } from '../../../firebase/fetchData';
import { IPsychiatrist } from '../../schema'
import Availability from './Availability';
import Image from 'next/image';
import Link from '../../assets/link.svg';
import Arrow from '../../assets/return_arrow.svg';
import Bookmark from '../../assets/bookmark2.svg';
import SavedBookmark from '../../assets/saved_bookmark2.svg';
import Chat from '../../assets/message2.svg';
import Photo from '../../assets/dummy_photo.jpg';
import ReportIcon from '../../assets/report.svg';
import CheckCircle from '../../assets/check_circle.svg'
import { useRouter } from 'next/router';
import { useAuth } from '../../../contexts/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db, logInWithGoogle, signUpWithGoogle } from '../../../firebase/firebase';
import { LoginPopup } from '../LoginPopup';
import { addDoc, collection } from 'firebase/firestore';
import { Timestamp } from "firebase/firestore";
import Cancel from "@/assets/cancel.svg";
import Submit from "@/assets/submit.svg";
import Continue from "@/assets/continue.svg";
import colors from '@/colors';



interface ProfProfileProps {
    firstName: string;
    lastName: string;
}

const DummyPsychiatrist = {
    id: 1,
    firstName: "Gloria",
    lastName: "Shi",
    title: "Psychiatrist at Wohohiame Hospital",
    profile_pic: null,
    availability: ["9:00-10:00, 13:00-16:30",
        "16:00-17:00",
        "19:45-21:30, 23:00-23:30",
        "8:00-9:00, 15:00-18:00",
        "9:00-10:00, 13:00-15:30",
        "8:00-9:00, 16:00-18:00, 20:00-21:30",
        ""],
    gender: 1,
    location: "Accra, Ghana",
    language: ["English"],
    specialty: ["Psychiatrist"],
    description: `Dr. Gloria Shi is a psychiatrist based in Accra, Ghana. 
    She obtained her medical degree from the University of Ghana and completed 
    her psychiatry residency training at the Korle Bu Teaching Hospital in Accra. 
    Dr. Gloria Shi is passionate about providing quality mental health care to her 
    patients and has a specialization in the treatment of anxiety and mood disorders.`
}

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
    width: '45%', // adjust the width as needed
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
    fontSize: 14
};

const buttonsContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end', // Aligns the buttons to the right
    gap: '8px'
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




// Originally, { firstName, lastName }: ProfProfileProps was passed in below, 
// put it is not necessary if we are using useRouter, because we can access 
// the firstName and lastName from the router's query

const ProfProfile = () => {
    const { user } = useAuth(); // Get the user information from the context
    const [docId, setDocId] = useState<string | undefined>(undefined);
    const [showPopup, setShowPopup] = useState(false);
    const [showReportPopup, setShowReportPopup] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [reportText, setReportText] = useState('');



    // Set the initial state of professional to null instead of DummyPsychiatrist 
    // to avoid the initial rendering of the component with DummyPsychiatrist 
    // before fetching and updating with the real data
    const [professional, setProfessional] = useState<IPsychiatrist | null>(null);
    const [savedPsychiatrists, setSavedPsychiatrists] = useState<string[]>([]);

    const router = useRouter();

    // Effect for fetching and updating professional data based on query parameters.
    // This effect runs when the component mounts or when `router.query.psych_uid` change.
    useEffect(() => {
        const fetchProfessional = async () => {
            const userId = user?.uid; // Get the ID of the currently logged-in user

            // Extract the first name and last name from the router query parameters
            const psych_uid = router.query.psych_uid as string;

            // Check if both first name and last name are defined
            if (psych_uid) {
                // Fetch professional data based on first name and last name
                const data = await fetchProfessionalData(psych_uid);
                setProfessional(data);
            }
        };

        fetchProfessional();
    }, [router.query.psych_uid]);

    useEffect(() => {
        const fetchUser = async () => {
            if (user) {
                const data = await fetchPatientDetails(user.uid);
                setSavedPsychiatrists(data.savedPsychiatrists)
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

    const handleSave = async (event: React.MouseEvent, psychiatrist) => {
        if (!user) {
            event.preventDefault();
            setShowPopup(true);
        } else {
            try {
                const currUser = await fetchPatientDetails(user.uid);
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

    // Handle the text change in textarea
    const handleReportTextChange = (event) => {
        setReportText(event.target.value);
    };

    // Trigger report popup to show up
    const handleReport = (event) => {
        event.preventDefault();
        setShowReportPopup(true);
    };

    // Trigger report popup to close
    const handleCloseReport = () => {
        setShowReportPopup(false);
    }

    const handleContinue = () => {
        setShowSuccessPopup(false);
        router.push(`/patient/${user?.uid}/discover`);
    };

    const handleSubmitReport = async () => {
        // Make sure a user and a professional are defined before submitting
        if (user && professional) {
            try {
                // Adjusted to match the Firebase collection's key IDs
                const reportData = {
                    description: reportText,
                    patient_id: user.uid, // changed from patientID to patient_id
                    psych_id: professional.uid, // changed from psychiatristID to psych_id
                    submittedAt: Timestamp.now() // Firebase automatically generates a unique ID for each document, so 'report_id' is not manually set here
                };

                // Add the report to the "reports" collection in Firestore
                const docRef = await addDoc(collection(db, "reports"), reportData); // This returns a reference to the newly added document

                console.log("Report submitted with ID: ", docRef.id); // You can log or use the document ID as needed (e.g., for 'report_id' if you wish to store it elsewhere)

                await updateDoc(doc(db, "reports", docRef.id), {
                    report_id: docRef.id
                });

                setShowSuccessPopup(true);
                setShowReportPopup(false);
                // Reset the report text
                setReportText('');



                // Add logic for redirecting the user or other post-submit actions here
            } catch (error) {
                console.error("Error submitting the report: ", error);
                // Handle the error appropriately
            }
        } else {
            // Handle the case when there is no user or professional
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
                    psych_name: `${professional.firstName} ${professional.lastName}`
                }
            });
        } else {
            console.error("Professional data is unavailable.");
        }
    };

    const handleBookAppointment = (event: React.MouseEvent) => {
        if (!user) {
            event.preventDefault();
            setShowPopup(true);
        }
    };

    // Navigate to the user's discover page
    const handleGoToDashboard = () => {
        if (user) router.push(`/${user?.userType}/${user?.uid}/discover`);
        else router.push(`/discover`);
    };

    const logInWithGoogleAndRedirect = async (onClose: () => void) => {
        await logInWithGoogle();
        router.push('/messages'); // Moved this line before the closing of the popup
        setShowPopup(false);
        onClose();
    };

    const signUpWithGoogleAndRedirect = async (onClose: () => void) => {
        router.push('/questionnaire'); // Moved this line before the closing of the popup
        setShowPopup(false);
        onClose();
    };

    // Render conditionally based on whether professional data is available
    if (professional === null) {
        return <div>Loading...</div>;
    }

    return (
        <div className={`w-2/3 h-full flex flex-wrap flex-col justify-center content-center gap-5`}>
            {showPopup && <LoginPopup onClose={() => setShowPopup(false)}
                logInWithGoogleAndRedirect={logInWithGoogleAndRedirect}
                signUpWithGoogleAndRedirect={signUpWithGoogleAndRedirect} />}

            {showReportPopup && (
                <div style={overlayStyle}>
                    <div style={popupStyle}>
                        {/* Replace "Dr. Gloria Shi" with the actual doctor's name */}
                        <h3 style={{ fontWeight: 'bold', marginBottom: '15px' }}>
                            Report Dr. {professional.firstName} {professional.lastName}?
                        </h3>
                        <p style={{ fontSize: 14, marginBottom: '15px' }}>
                            We are committed to ensuring your right to privacy and safety. If you feel
                            like any of these rights have been violated by a psychiatrist that you are
                            seeing, please fill out the report form below.
                        </p>
                        <textarea
                            style={textareaStyle}
                            placeholder={"Please provide a detailed description of your situation here."}
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
                    <div style={{ ...popupStyle, gap: '12px' }} >
                        {/* Assuming you have the SVG as a React component */}
                        <CheckCircle style={{ top: 20 }} />
                        <div style={{ display: 'inline-flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 14 }}>
                            <h3 style={{ fontWeight: 'bold', marginBottom: '15px', fontSize: 14 }}>You have successfully reported Dr. {professional.firstName} {professional.lastName}.</h3>
                            <p style={{ marginBottom: '15px', fontSize: 13 }}>
                                Dr. {professional.firstName} {professional.lastName}'s profile will be removed from your view and you will now be
                                redirected back to the list of available psychiatrists. If you'd like to access
                                your reported psychiatrists, check out the report section in your profile.
                            </p>
                            <Continue onClick={handleContinue} />
                        </div>
                    </div>
                </div>
            )}


            <div className={`flex flex-row`}>
                {/* Back arrow to return to go back to Discover Professionals */}
                <figure className={`cursor-pointer`} onClick={handleGoToDashboard}><Arrow /></figure>
            </div>
            <div className={`flex flex-col lg:flex-row gap-10 justify-center`}>
                {/* <figure className='flex w-1/3 shrink'>
                    <Image src={Photo} alt="Photo" width={1200} height={600} />
                </figure> */}
                <div className={`flex justify-center items-center md:justify-start md:items-start lg:shrink`}>
                    <div style={{ width: 300, height: 300, backgroundColor: colors.okb_blue, objectFit: "cover" }} className={`text-9xl font-normal text-white flex items-center justify-center`}>
                        {professional.firstName?.charAt(0).toUpperCase()}
                    </div>
                    {/* <Image src={Photo} alt="Photo" className={`w-1200 h-600`} /> */}
                </div>
                <div className={`flex flex-col lg:w-2/3 gap-4 justify-center`}>
                    <div className={`flex flex-col md:flex-row gap-4`}>
                        <div className='flex gap-x-4 justify-center items-center md:justify-start md:items-start flex-row md:flex-col'>
                            <div className={`text-3xl text-bold`}>
                                {professional.firstName + " " + professional.lastName}
                            </div>
                            <div className={`text-normal text-xl italic text-dark-grey`}>
                                {professional.position}
                            </div>
                        </div>
                        <div className='flex flex-row gap-4 justify-center items-center md:justify-start md:items-start'>
                            {/* Report button, action is currently undefined */}
                            <div className={`shrink`} >
                                <button onClick={handleReport} className={` rounded-s-2xl rounded-[12px] transition cursor-pointer text-okb-white flex flex-row gap-2`}>
                                    <ReportIcon className="object-cover" />
                                </button>
                            </div>
                            {/* Save button, action is currently undefined */}
                            <div className={`shrink`}>
                                <div onClick={(event) => handleSave(event, professional)} className={`px-4 py-2 rounded-s-2xl rounded-[12px] bg-okb-blue hover:bg-light-blue transition cursor-pointer text-okb-white flex flex-row gap-2 text-semibold`}>
                                    <figure className="object-cover">{savedPsychiatrists.includes(professional.uid) ? <SavedBookmark /> : <Bookmark />}</figure>Save
                                </div>
                            </div>
                            {/* Message button, action is currently undefined */}
                            <div className={`shrink`} >
                                <div onClick={handleSendMessage} className={`px-4 py-2 rounded-s-2xl rounded-[12px] bg-okb-blue hover:bg-light-blue transition cursor-pointer text-okb-white flex flex-row gap-2`}>
                                    <figure className="object-cover"><Chat /></figure>Message
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className={`text-normal text-xl italic text-dark-grey`}>
                        {professional.position}
                    </div> */}
                    {/* Speciality/language/location tags */}
                    <div className={`flex flex-row justify-center items-center md:justify-start md:items-start gap-2`}>
                        {professional.specialty.map((speciality, index) => (
                            <div className={`px-3 py-2 border-2 rounded-[20px] border-light-blue`}>
                                {speciality}
                            </div>
                        ))}
                        {professional.language.map((langauge, index) => (
                            <div className={`px-3 py-2 border-2 rounded-[20px] border-light-blue`}>
                                {langauge}
                            </div>
                        ))}
                        <div className={`px-3 py-2 border-2 rounded-[20px] border-light-blue`}>
                            {professional.location}
                        </div>

                    </div>
                    <div className={`text-normal text-center md:text-start text-base`}>
                        {professional.description}
                    </div>
                    <div className={`flex flex-row justify-center items-center md:justify-start md:items-start`}>
                        {/* Link tag, currently not in the IPsychiatrist so hard coded with default link */}
                        <div className="px-4 py-2 border-2 rounded-s-2xl rounded-[20px] border-light-blue bg-lightest-blue hover:shadow-xl transition cursor-pointer flex flex-row gap-2">
                            <a
                                href="https://www.wohohiame.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center"
                            >
                                <figure className="object-cover"><Link /></figure>
                                <span className="ml-2">www.mentalhealthsite.com</span>
                            </a>
                        </div>

                    </div>
                </div>
            </div>
            <h2 className={`text-center lg:text-start text-bold text-2xl`}>Availability</h2>
            <Availability availability={professional?.availability} />

            <div className={`flex flex-row justify-center content-center`}>
                {/* Book Appointment button, action undefined but should lead to calendly */}
                <button
                    className={`bg-okb-blue text-okb-white active:bg-gray-500 font-bold px-12 py-4 rounded-xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
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