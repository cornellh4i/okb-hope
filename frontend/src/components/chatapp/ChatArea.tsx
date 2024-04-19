import React, { useEffect, useState } from 'react';
import { fetchProfessionalData, fetchPatientDetails } from '../../../firebase/fetchData';
import MessageList from './MessageList';
import MessageComposer from './MessageComposer';
import ellipsis from '../../assets/ellipses';
import okb_colors from '@/colors';
import router, { useRouter } from 'next/router';
import { useAuth } from '../../../contexts/AuthContext';
import { collection, onSnapshot, writeBatch, query, where, doc, getDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase/firebase";
import DeleteModal from './DeleteModal';

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

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDelete = async () => {
    console.log(patientId)

    try {
      const conversationQuery = query(collection(db, "Conversations"),
        where("patientId", "==", patientId),
        where("psychiatristId", "==", psychiatristId));
      const querySnapshot = await getDocs(conversationQuery);

      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (doc) => {
          // Update the conversation document
          if (role === "patient") {
            if (doc.data().deletedByPsych === true) {
              await deleteDoc(doc.ref);

              const chatQuery = query(collection(db, "Chats"),
                where("uid", "in", [patientId, psychiatristId]),
                where("recipientId", "in", [patientId, psychiatristId]));
              const chatSnapshot = await getDocs(chatQuery);

              chatSnapshot.forEach(async (doc) => {
                await deleteDoc(doc.ref);
              });
            } else {
              await updateDoc(doc.ref, { deletedByPatient: true });
            }
          }

          if (role === "psychiatrist") {
            if (doc.data().deletedByPatient === true) {
              await deleteDoc(doc.ref);

              const chatQuery = query(collection(db, "Chats"),
                where("uid", "in", [patientId, psychiatristId]),
                where("recipientId", "in", [patientId, psychiatristId]));
              const chatSnapshot = await getDocs(chatQuery);

              chatSnapshot.forEach(async (doc) => {
                await deleteDoc(doc.ref);
              });

            } else {
              await updateDoc(doc.ref, { deletedByPsych: true });
            }
          }

        })
      }
      console.log("Message thread deleted successfully");
    } catch (error) {
      console.error("Error deleting message thread:", error);
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

  return (
    <div className='name-area flex py-4 px-6 justify-between items-center shrink-0 w-full bg-white border-b-solid border-b-2 border-[#DEDEDE]'>
      <p className='text-[24px] font-semibold color-black'>{name}</p>
      <div className="dropdown dropdown-click dropdown-bottom dropdown-end">
        <button className={`rounded-full color-[${okb_colors.dark_gray}] hover:bg-gray-200`}>
          {ellipsis}
        </button>
        <ul className='menu dropdown-content inline-flex py-2 px-4 flex-col items-start gap-[14px] rounded-[10px] border-[1px] border-[#C1C1C1] shadow bg-[#FFFDFD] -box w-52'>
          {role === 'psychiatrist' && (
            <>
              <button onClick={markAsUnread}>Mark as Unread</button>
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

  return (
    <div className="chat-area flex flex-col h-screen">
      <NameArea name={displayName} credentials="Credentials" role={role} />
      <div className="flex-grow overflow-scroll">
        <div className='h-full overflow-scroll'><MessageList /></div>
      </div>
      <MessageComposer />
    </div>
  );
};

export default ChatArea;
