import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { useAuth } from "../../../contexts/AuthContext";

type Conversation = {
  user: {
    uid: string;
    name: string;
  };
  psychiatrist: {
    uid: string;
    name: string;
  };
  messages: any[]; // You can replace 'any' with the actual message type
};

const PatientInbox = () => {
  const { currentUser } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    const fetchConversations = async () => {
      if (!currentUser) return;

      const q = query(
        collection(db, "Chats"),
        where("user.uid", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      setConversations(querySnapshot.docs.map((doc) => doc.data() as Conversation));
    };

    fetchConversations();
  }, [currentUser]);

  return (
    <div>
      <h2>Patient Inbox</h2>
      {conversations.map((conversation, index) => (
        <div key={index}>
          <p>Psychiatrist: {conversation.psychiatrist.name}</p>
          {/* Render other conversation details here */}
        </div>
      ))}
    </div>
  );
};

export default PatientInbox;
