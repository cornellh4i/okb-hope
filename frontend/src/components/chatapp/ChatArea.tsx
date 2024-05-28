import React, { useEffect, useState } from 'react';
import { fetchProfessionalData, fetchPatientDetails } from '../../../firebase/fetchData';
import MessageList from './MessageList';
import MessageComposer from './MessageComposer';
import Ellipses from '../../assets/ellipses';
import okb_colors from '@/colors';
import router, { useRouter } from 'next/router';
import { useAuth } from '../../../contexts/AuthContext';
import { collection, onSnapshot, writeBatch, query, where, doc, getDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase/firebase";
import DeleteModal from './DeleteModal';
import { getFirestore } from 'firebase/firestore';
import { fetchRole } from '../../../firebase/firebase';



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
    } else if (patient_name) {
      setPatientId(patient_id as string);
      setPsychiatristId(uid as string);
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

  const reportPatient = async () => {
    
  }

  const toggleDropdown = (event) => {
    event.preventDefault();
    console.log("Dropdown toggle clicked");
    setOpenDropdown(prev => !prev);
  };

  return (
    <div className='name-area flex py-4 px-6 justify-between items-center shrink-0 w-full page-background border-b-solid border-b-2 border-[#DEDEDE]'>
      <p className='text-[24px] font-montserrat font-semibold color-black'>{name}</p>
      <div className="dropdown dropdown-click dropdown-bottom dropdown-end">
        <button onClick={toggleDropdown} className={`rounded-full color-[${okb_colors.dark_gray}] hover:bg-gray-200`}>
          {Ellipses}
        </button>
        {openDropdown && (
          <ul className='menu absolute top-full right-0 inline-flex py-2 px-4 flex-col items-start gap-[14px] font-montserrat rounded-[10px] border-[1px] border-[#C1C1C1] shadow bg-[#FFFDFD] w-56'>
            {role === 'psychiatrist' && (
              <>
                <button onClick={markAsUnread}>Mark as Unread</button>
                <button onClick={reportPatient}>Report Patient</button>
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
    console.log("role")
    console.log(role)

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
