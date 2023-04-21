import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";

interface Psychiatrist {
  description: string;
  name: string;
  title: string;
  photo_id: string;
}

export function usePsychiatrist1() {
  const [psychiatrist, setPsychiatrist] = useState<Psychiatrist | null>(null);

  useEffect(() => {
    async function fetchPsychiatrist() {
      const psychiatristDocRef = doc(db, "Psychiatrists", "Psychiatrist 1");
      const psychiatristDocSnap = await getDoc(psychiatristDocRef);
      if (psychiatristDocSnap.exists()) {
        const data = psychiatristDocSnap.data();
        if (data) {
          const { description, name, title, photo_id } = data;
          setPsychiatrist({ description, name, title, photo_id });
        }
      }
    }

    fetchPsychiatrist();
  }, []);

  return psychiatrist;
}

export function usePsychiatrist2() {
  const [psychiatrist, setPsychiatrist] = useState<Psychiatrist | null>(null);

  useEffect(() => {
    async function fetchPsychiatrist() {
      const psychiatristDocRef = doc(db, "Psychiatrists", "Psychiatrist 3");
      const psychiatristDocSnap = await getDoc(psychiatristDocRef);
      if (psychiatristDocSnap.exists()) {
        const data = psychiatristDocSnap.data();
        if (data) {
          const { description, name, title, photo_id } = data;
          setPsychiatrist({ description, name, title, photo_id });
        }
      }
    }

    fetchPsychiatrist();
  }, []);

  return psychiatrist;
}

export function usePsychiatrist3() {
  const [psychiatrist, setPsychiatrist] = useState<Psychiatrist | null>(null);

  useEffect(() => {
    async function fetchPsychiatrist() {
      const psychiatristDocRef = doc(db, "Psychiatrists", "Psychiatrist 3");
      const psychiatristDocSnap = await getDoc(psychiatristDocRef);
      if (psychiatristDocSnap.exists()) {
        const data = psychiatristDocSnap.data();
        if (data) {
          const { description, name, title, photo_id } = data;
          setPsychiatrist({ description, name, title, photo_id });
        }
      }
    }

    fetchPsychiatrist();
  }, []);

  return psychiatrist;
}

// export const getDescription1 = (psychiatrist: Psychiatrist) => psychiatrist.description;

// export const getName1 = (psychiatrist: Psychiatrist) => psychiatrist.name;

// export const getTitle1 = (psychiatrist: Psychiatrist) => psychiatrist.title;

// export const getPhotoId1 = (psychiatrist: Psychiatrist) => psychiatrist.photo_id;
