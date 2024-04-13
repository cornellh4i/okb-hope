// components/Inbox.tsx
import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import PatientInbox from "./PatientInbox";
import PsychiatristInbox from "./PsychiatristInbox";

type InboxProps = {
  onSearch: string | null; // Prop to receive search input
};

const Inbox = ({ onSearch }: InboxProps) => {
  const { user, role } = useAuth();

  if (!user) {
    return <div>Please log in.</div>;
  }

  return (
    <div>
      {role === "psychiatrist" ? <PsychiatristInbox /> : <PatientInbox searchInput={onSearch} />}
    </div>
  );
};

export default Inbox;
