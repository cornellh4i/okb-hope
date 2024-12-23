import React, { useEffect, useState } from 'react';
import { fetchProfessionalData, fetchPatientDetails } from '../../../firebase/fetchData';
import MessageList from './MessageList';
import MessageComposer from './MessageComposer';
import Ellipses from '../../assets/ellipses';
import okb_colors from '@/colors';
import { IPatient, IReport } from '../../schema';
import Close from '@/assets/close.svg';

import router, { useRouter } from 'next/router';
import { useAuth } from '../../../contexts/AuthContext';
import { collection, onSnapshot, writeBatch, query, where, doc, getDoc, getDocs, updateDoc, deleteDoc, addDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "../../../firebase/firebase";
import DeleteModal from './DeleteModal';
import { getFirestore } from 'firebase/firestore';
import { fetchRole } from '../../../firebase/firebase';
import Cancel from '@/assets/cancel_report.svg';
import { IPsychiatrist } from '../../schema';
// import { addDoc, collection, Timestamp } from 'firebase/firestore';
import CheckCircle from '../../assets/check_circle.svg';
import Continue from '@/assets/continue.svg';
import Submit from '@/assets/submit.svg';
import { Button } from '@mui/material';


interface NameAreaType {
  name: string;
  credentials: string;
  role: string;
}

const NameArea = ({ name, credentials, role }: NameAreaType) => {
  const router = useRouter();  // Use useRouter hook for routing actions
  const uid = auth.currentUser?.uid;
  const [psychiatristId, setPsychiatristId] = useState('');
  const [patientId, setPatientId] = useState('');
  const conversationsRef = collection(db, "Conversations");
  const q = query(conversationsRef);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [showReportPopup, setShowReportPopup] = useState(false);
  const [showReportCardPopup, setShowReportCardPopup] = useState(false);
  const [reportText, setReportText] = useState('');
  const { user } = useAuth();
  const [patient, setPatient] = useState<IPatient | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [reportExists, setReportExists] = useState(false);
  const [fetchedReport, setFetchedReport] = useState<IReport[]>([]);
  const [reportSubmittedAt, setReportSubmittedAt] = useState("");
  const [reportDescription, setReportDescription] = useState("");
  const [concerns, setConcerns] = useState<string[]>([]);
  const [isPsych, setIsPsych] = useState(false);

  useEffect(() => {
    const fetchPatient = async () => {
      if (patientId) {
        const data = await fetchPatientDetails(patientId);
        setPatient(data);
        if (data?.concerns) {  // Move this outside the patient check since we have fresh data
          setConcerns(data.concerns);
        }
      }
    };
    fetchPatient();
  }, [patientId]);

  // Fetch the report status for the patient
  useEffect(() => {
    const fetchReportStatus = async () => {
      try {
        const reportsQuery = query(
          collection(db, 'reports'),
          where('psych_id', '==', uid),
          where('patient_id', '==', patientId),
          where('reporter_type', '==', 'psychiatrist')
        );
        const reportSnapshot = await getDocs(reportsQuery);
        setReportExists(!reportSnapshot.empty);

        const fetchedReports: IReport[] = reportSnapshot.docs.map(doc => ({
          ...doc.data() as IReport,
          id: doc.id
        }));
        setFetchedReport(fetchedReports);
      } catch (error) {
        console.error("Error fetching reports: ", error);
      }
    };

    if (uid && patientId) {
      fetchReportStatus();
    }
  }, [uid, patientId, reportExists]);

  useEffect(() => {
    if (reportExists) {
      const formattedDate = fetchedReport[0].submittedAt.toDate().toLocaleString();
      setReportSubmittedAt(formattedDate);
      setReportDescription(fetchedReport[0].description)
    }
  }, [fetchedReport])


  const handleReportTextChange = (event) => {
    setReportText(event.target.value);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDelete = async () => {
    const batch = writeBatch(db);
    try {
      console.log(`Starting delete operation for patientId: ${patientId}, psychiatristId: ${psychiatristId}`);
      const userRole = role; // 'role' should be 'patient' or 'psychiatrist'

      const deletionFlag = userRole === "patient" ? 'deletedByPatient' : 'deletedByPsych';
      const oppositeFlag = userRole === "psychiatrist" ? 'deletedByPatient' : 'deletedByPsych';

      // Conversation Deletion Logic
      const conversationQuery = query(
        collection(db, "Conversations"),
        where("patientId", "==", patientId),
        where("psychiatristId", "==", psychiatristId)
      );

      const conversationSnapshot = await getDocs(conversationQuery);
      conversationSnapshot.forEach((doc) => {
        const deletionFlag = userRole === "patient" ? 'deletedByPatient' : 'deletedByPsych';
        if (doc.data()[oppositeFlag] !== true) {
          batch.update(doc.ref, { [deletionFlag]: true });
          console.log(`Marking conversation ${doc.id} as deleted by: ${deletionFlag}`);
        } else {
          batch.delete(doc.ref);
          console.log(`Deleting conversation ${doc.id} because it was deleted by both parties`);
        }
      });

      // Message Deletion Logic
      // Properly target all messages between the two parties
      const messageQuery = query(
        collection(db, "Chats"),
        where("uid", "in", [patientId, psychiatristId]),
        where("recipientId", "in", [patientId, psychiatristId])
      );

      const messageSnapshot = await getDocs(messageQuery);
      console.log(`Found ${messageSnapshot.docs.length} chats to process for deletion`);

      messageSnapshot.forEach((doc) => {
        if (doc.data()[oppositeFlag] !== true) {
          batch.update(doc.ref, { [deletionFlag]: true });
          console.log(`Marking chat ${doc.id} as deleted by: ${deletionFlag}`);
        } else {
          batch.delete(doc.ref);
          console.log(`Deleting chat ${doc.id} because it was deleted by both parties`);
        }
      });

      // Commit the batch operation
      await batch.commit();
      console.log("Batch commit successful. Conversations and chat messages marked as deleted.");
    } catch (error) {
      console.error("Error during batch commit:", error);
    } finally {
      closeDeleteModal();
    }
  };


  useEffect(() => {
    const { psych_id, psych_name, patient_id, patient_name } = router.query;
    if (psych_name) {
      setPsychiatristId(psych_id as string);
      setPatientId(uid as string);
      setIsPsych(false);
    } else if (patient_name) {
      setPatientId(patient_id as string);
      setPsychiatristId(uid as string);
      setIsPsych(true);
    }
  }, [router.query]);

  const handleProfileClick = () => {
    router.push({
      pathname: `/patient/${patientId}/prof_profile`,
      query: { psych_uid: psychiatristId },
    });
  };

  const markAsUnread = async () => {
    if (!patientId || !psychiatristId) return;
    // Create a query to find the correct conversation document
    const conversationsRef = collection(db, "Conversations");
    const convQuery = query(conversationsRef, where("patientId", "==", patientId), where("psychiatristId", "==", psychiatristId));
    try {
      const querySnapshot = await getDocs(convQuery);
      if (!querySnapshot.empty) {
        // Assuming there is always exactly one matching document
        const conversationDoc = querySnapshot.docs[0];
        await updateDoc(conversationDoc.ref, {
          messagesUnreadByPatient: role === 'patient' ? 1 : 0,
          messagesUnreadByPsych: role === 'psychiatrist' ? 1 : 0,
        });
      }
    } catch (error) {
      console.error("Error updating conversation:", error);
    }
  };

  const reportPatient = (event) => {
    event.preventDefault();
    setShowReportPopup(true);
  };

  const viewReport = (event) => {
    event.preventDefault();
    setShowReportCardPopup(true);
  }

  const toggleDropdown = (event) => {
    event.preventDefault();
    setOpenDropdown(prev => !prev);
  };


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

  const cardStyle: React.CSSProperties = {
    background: 'white',
    // borderRadius: '10px',
    // border: '1px solid #519AEB',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '12px 24px',
    margin: '0 0 12px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  };

  // const formattedDate = report.submittedAt.toDate().toLocaleString();

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

  const handleCloseReport = () => {
    setShowReportPopup(false);
  };

  const handleContinue = () => {
    setShowSuccessPopup(false);
    // router.push(`/patient/${user?.uid}/discover`);
  };

  const handleSubmitReport = async () => {
    if (user?.userType === "psychiatrist" && patient) {
      try {
        const reportData = {
          description: reportText,
          reporter_type: 'psychiatrist',
          psych_id: user.uid,
          patient_id: patient.uid,
          patient_name: patient.firstName + ' ' + patient.lastName,
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
        setReportExists(true);
        setOpenDropdown(false);
      } catch (error) {
        console.error('Error submitting the report: ', error);
      }
    } else {
      console.error('No user or patient found');
    }
  };


  return (
    <div className='name-area flex py-4 px-6 justify-between items-center shrink-0 w-full page-background border-b-solid border-b-2 border-[#DEDEDE]'>
      <p className='text-[24px] font-montserrat font-semibold color-black'>{name}</p>
      <p className='text-[14px] font-montserrat text-[#9A9A9A]'>
        {isPsych && concerns?.length > 0 && `${name} is concerned about ${concerns.join(', ')}`}
      </p>
      <div className="dropdown dropdown-click dropdown-bottom dropdown-end">
        <button onClick={toggleDropdown} className={`rounded-full color-[${okb_colors.dark_gray}] hover:bg-gray-200`}>
          {Ellipses}
        </button>
        {openDropdown && (
          <ul className='menu absolute top-full right-0 inline-flex py-2 px-4 flex-col items-start gap-[14px] font-montserrat rounded-[10px] border-[1px] border-[#C1C1C1] shadow bg-[#FFFDFD] w-56'>
            {role === 'psychiatrist' && (
              <>
                <button onClick={markAsUnread}>Mark as Unread</button>

                {reportExists ? (
                  <button onClick={viewReport}>View Report</button>
                ) : (
                  <button onClick={reportPatient}>Report Patient</button>
                )}

                <button onClick={openDeleteModal}>Delete Message Thread</button>
              </>
            )}
            {role === 'patient' && (
              <>
                <button onClick={markAsUnread}>Mark as Unread</button>
                <button onClick={handleProfileClick}>View Profile</button>
                <button onClick={openDeleteModal}>Delete Message Thread</button>
              </>
            )}
          </ul>
        )}
      </div>
      <DeleteModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} onDelete={handleDelete} />

      {showReportPopup && (
        <div style={overlayStyle}>
          <div style={popupStyle}>
            <h3 className="font-montserrat font-bold" style={{ marginBottom: '15px' }}>
              Report {name}?
            </h3>
            <p className="font-montserrat" style={{ fontSize: 14, marginBottom: '15px' }}>
              We are committed to ensuring your right to privacy and safety. If you feel like any of these rights have been violated by a patient that you are seeing, please fill out the report form below.
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

      {showReportCardPopup && (
        <div className="modal modal-open" style={overlayStyle}>
          <div className="modal-box " style={{ position: 'relative', display: 'flex', flexDirection: 'column', maxHeight: '50%', gap: 12, padding: 24, alignItems: 'center' }}>
            <Close className="modal-action" onClick={() => setShowReportCardPopup(false)} style={{ position: 'absolute', top: 0, right: 12, cursor: 'pointer' }} />
            <div className="text-xl font-bold font-montserrat" style={{ margin: '0 auto', fontSize: 15 }}>Report Information</div>
            <div className="space-y-4" style={{ width: '100%', height: '100%', overflowY: 'auto', background: 'white', borderRadius: 10, flexDirection: 'column', justifyContent: 'flex-start', gap: 12, display: 'flex' }}>
              <div style={{ borderRadius: '10px', border: '1px solid #519AEB', padding: '12px 24px' }}>
                <div>
                  <p className="font-montserrat" style={{ fontSize: 14, paddingBottom: 5 }}>
                    The following report for {name} was submitted on: {reportSubmittedAt}
                  </p>
                </div>
                <p className="font-montserrat" style={{ fontSize: 14, paddingBottom: 7 }}>
                  Report Log
                </p>
                <div>
                  <p className="font-montserrat" style={{ fontSize: 14, border: '1px solid #9A9A9A', color: '#000000', padding: '8px 20px' }}>
                    {reportDescription}
                  </p>
                </div>
                <p className="font-montserrat" style={{ fontSize: 14, textAlign: 'left', paddingTop: 10 }}>
                  Report Status: Verified on {reportSubmittedAt}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSuccessPopup && (
        <div style={overlayStyle}>
          <div style={{ ...popupStyle, gap: '12px' }}>
            <CheckCircle style={{ top: 20 }} />
            <div style={{ display: 'inline-flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 14 }}>
              <h3 className="font-montserrat" style={{ fontWeight: 'bold', marginBottom: '15px', fontSize: 14 }}>You have successfully reported {name}.</h3>
              <Continue style={{ cursor: 'pointer' }} onClick={handleContinue} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


const ChatArea = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [displayName, setDisplayName] = useState('');
  const [role, setRole] = useState<string>('');
  const [noDocsFound, setNoDocsFound] = useState(false);

  useEffect(() => {
    const fetchDataAndDetermineRole = async () => {

      const id = user?.uid;
      if (!id) return;

      setRole(user.userType as string);
    };

    fetchDataAndDetermineRole();
  }, [user?.uid]);

  useEffect(() => {
    const fetchDisplayName = async () => {

      const { psych_name, patient_name } = router.query;

      if (psych_name) {
        console.log(decodeURIComponent(psych_name as string))
        setDisplayName(decodeURIComponent(psych_name as string));
      } else if (patient_name) {
        console.log(decodeURIComponent(patient_name as string))
        setDisplayName(decodeURIComponent(patient_name as string));
      }
    };

    if (router.isReady) {
      fetchDisplayName();
    }
  }, [router.isReady, router.query]);

  useEffect(() => {
    const fetchDataAndDetermineRole = async () => {
      const id = user?.uid;
      if (!id) return;

      try {
        const userRole = await fetchRole(id);
        setRole(userRole);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchDataAndDetermineRole();
  }, [user?.uid]);

  useEffect(() => {
    const uid = user?.uid

    if (uid) {
      const conversationsQuery = role === "psychiatrist" ?
        query(collection(db, 'Conversations'), where('psychiatristId', '==', uid)) :
        query(collection(db, 'Conversations'), where('patientId', '==', uid));

      // Execute the query
      getDocs(conversationsQuery)
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
            setNoDocsFound(true); // Set state variable if no documents found
            console.log("DOCS NOT FOUND!!!")
          } else {
            if (role === "patient") {
              const allDeletedByPatient = querySnapshot.docs.every(doc => {
                const data = doc.data();
                return data.deletedByPatient === true;
              });
              if (allDeletedByPatient) setNoDocsFound(true);
              else setNoDocsFound(false); // Reset state variable if documents found
            } else {
              const allDeletedByPsych = querySnapshot.docs.every(doc => {
                const data = doc.data();
                return data.deletedByPsych === true;
              });
              if (allDeletedByPsych) setNoDocsFound(true);
              else setNoDocsFound(false); // Reset state variable if documents found
            }
            console.log("DOCS FOUND!!!")
          }
        })
        .catch((error) => {
          console.error("Error getting conversations: ", error);
        });
    } else {
      console.error("Invalid URL structure or psychiatristId not found in URL");
    }
  }, [db, role, user?.uid]);

  if (displayName !== "") {
    return (
      <div className="chat-area flex flex-col h-screen page-background">
        <NameArea name={displayName} credentials="Credentials" role={role} />
        <div className="flex-grow overflow-scroll">
          <div className='h-full overflow-scroll'><MessageList /></div>
        </div>
        <MessageComposer />
      </div>
    );
  } else {
    return (
      <div className="page-background text-center text-gray-400 pt-4 px-4 font-montserrat italic">
        {role === "patient" ? (
          noDocsFound ? "Explore and chat with medical professionals using the Discover Professionals tab." : "Start chatting by selecting a conversation."
        ) : (
          noDocsFound ? "You have not received any messages from patients yet." : "Start chatting by selecting a conversation."
        )}
      </div>
    )
  }
};

export default ChatArea;