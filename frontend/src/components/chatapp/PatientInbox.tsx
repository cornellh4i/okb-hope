import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { useAuth } from "../../../contexts/AuthContext";
import { doc, getDoc } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore'; // Importing Timestamp from Firestore for the type definition

type RecentMessage = {
  text: string;
  createdAt: Timestamp; // Using Timestamp type for the createdAt field
  photoURL: string;
};

type Conversation = {
  patientId: string;
  psychiatristId: string;
  recentMessage: RecentMessage;
};

const PatientInbox = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [psychiatristNames, setPsychiatristNames] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConversations = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!user) return;

        const q = query(
          collection(db, "Conversations"),
          where("patientId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const convos = querySnapshot.docs.map((doc) => doc.data() as Conversation);
        setConversations(convos);

        // Fetch psychiatrist names
        const psychiatristIds = convos.map(convo => convo.psychiatristId);
        await fetchPsychiatristNames(psychiatristIds);
      } catch (error) {
        setError("Error fetching conversations");
        console.error('Error fetching conversations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [user]);

  // Function to fetch psychiatrist names
  const fetchPsychiatristNames = async (psychiatristIds: string[]) => {
    const names: { [key: string]: string } = {};
    await Promise.all(psychiatristIds.map(async (psychiatristId) => {
      const name = await getPsychiatristNameById(psychiatristId);
      if (name) {
        names[psychiatristId] = name;
      }
    }));
    setPsychiatristNames(names);
  };

  // Function to get psychiatrist name by id
  const getPsychiatristNameById = async (psychiatristId: string) => {
    try {
      const psychiatristDocRef = doc(db, 'psychiatrists', psychiatristId);
      const docSnapshot = await getDoc(psychiatristDocRef);
      if (docSnapshot.exists()) {
        const { name } = docSnapshot.data();
        return name;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting psychiatrist name:', error);
      return null;
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Patient Inbox</h2>
      {conversations.map((conversation, index) => (
        <div key={index}>
          <p>Psychiatrist: {psychiatristNames[conversation.psychiatristId]}</p>
          {/* Render other conversation details here */}
        </div>
      ))}
    </div>
  );
};

export default PatientInbox;
