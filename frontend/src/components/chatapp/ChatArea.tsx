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
    const batch = writeBatch(db);

    try {
      console.log(`Starting delete operation for patientId: ${patientId}, psychiatristId: ${psychiatristId}`);

      const userRole = role; // 'role' should be 'patient' or 'psychiatrist'

      // The field names your Firestore collection for user IDs
      const userField = userRole === "patient" ? "uid" : "recipientId";
      const recipientField = userRole === "patient" ? "recipientId" : "uid";

      // Query to find all conversations between the patient and psychiatrist
      const conversationQuery = query(
        collection(db, "Conversations"),
        where("patientId", "==", patientId),
        where("psychiatristId", "==", psychiatristId)
      );

      // Execute the query to fetch conversation documents
      const conversationSnapshot = await getDocs(conversationQuery);

      // If no conversation documents are found, log an error and exit the function
      if (conversationSnapshot.empty) {
        console.error("No conversations found for the given IDs");
        return;
      }

      // Log for debugging
      console.log(`Found ${conversationSnapshot.docs.length} conversations to mark as deleted`);

      // For each conversation, mark it as deleted by the current user role
      conversationSnapshot.forEach((conversationDoc) => {
        const deletionFlag = userRole === "patient" ? 'deletedByPatient' : 'deletedByPsych';

        if (conversationDoc.data()[deletionFlag] !== true) {
          // If the conversation is not already deleted by the current user, mark it as deleted
          batch.update(conversationDoc.ref, { [deletionFlag]: true });
          console.log(`Marking conversation ${conversationDoc.id} as deleted by: ${deletionFlag}`);
        } else {
          // If the conversation is already deleted by the current user, delete the conversation document
          batch.delete(conversationDoc.ref);
          console.log(`Deleting conversation ${conversationDoc.id} because it was deleted by both parties`);
        }
      });

      // Query to find all chat messages where the user is either the sender or recipient
      const chatsQuery = query(
        collection(db, "Chats"),
        where(userField, "==", patientId),
        where(recipientField, "==", psychiatristId)
      );

      // Execute the query to fetch chat messages
      const chatSnapshot = await getDocs(chatsQuery);

      // Log for debugging
      console.log(`Found ${chatSnapshot.docs.length} chats to mark as deleted`);

      // For each chat message, mark it as deleted by the current user role
      chatSnapshot.forEach((chatDoc) => {
        const deletionFlag = userRole === "patient" ? 'deletedByPatient' : 'deletedByPsych';
        const oppositeFlag = userRole === "patient" ? 'deletedByPsych' : 'deletedByPatient';

        if (chatDoc.data()[oppositeFlag] !== true) {
          // If the chat is not already deleted by the other party, mark it as deleted
          batch.update(chatDoc.ref, { [deletionFlag]: true });
          console.log(`Marking chat ${chatDoc.id} as deleted by: ${deletionFlag}`);
        } else {
          // If the chat is already deleted by the other party, delete the chat document
          batch.delete(chatDoc.ref);
          console.log(`Deleting chat ${chatDoc.id} because it was deleted by both parties`);
        }
      });

      // Commit the batch operation
      await batch.commit();
      console.log("Batch commit successful. Conversations and chat messages marked as deleted.");
    } catch (error) {
      // Log any errors that occur during the operation
      console.error("Error during batch commit:", error);
    } finally {
      // Close the delete modal whether the operation was successful or not
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
    <div className='name-area flex py-2 px-6 justify-between items-center shrink-0 w-full page-background border-b-solid border-b-2 border-[#DEDEDE]'>
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
    return null
  }
};

export default ChatArea;
