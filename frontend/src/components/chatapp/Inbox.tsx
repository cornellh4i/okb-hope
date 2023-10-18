// components/Inbox.tsx
import React from "react";
import { useAuth } from "../../../contexts/AuthContext";
import PatientInbox from "./PatientInbox";
import PsychiatristInbox from "./PsychiatristInbox";

const Inbox = () => {
  const { user, role } = useAuth();

  if (!user) {
    return <div>Please log in.</div>;
  }

  if (role === "psychiatrist") {
    return <PsychiatristInbox />;
  } else {
    return <PatientInbox />;
  }
};

export default Inbox;
