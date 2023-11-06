import { useState, useEffect, useRef } from 'react';
import PsychiatristCard from './PsychiatristCard';
import results from '@/temp_data/psychiatrists.json';
import { IUser } from '@/schema';
import { db, auth } from '../../../firebase/firebase';
import { collection, getDocs, where, query, DocumentData, onSnapshot, doc, writeBatch, getDoc, DocumentReference } from "firebase/firestore";
import { IPsychiatrist } from '@/schema';

import NoSavedPsychComponent from './NoSavedPsych';

const PsychiatristList = ({ max_size }: { max_size: number }) => {
  const uid = auth.currentUser?.uid;
  const patientsRef = collection(db, "patients");
  const [savedPsychiatrists, setSavedPsychiatrists] = useState<(DocumentData | null)[]>([]);

  useEffect(() => {
    if (uid) {
      const queryDoc = query(patientsRef, where("uid", "==", uid));

      const unsubscribe = onSnapshot(queryDoc, (querySnapshot) => {
        let savedPsychRefs: DocumentReference[] = [];

        querySnapshot.forEach((doc) => {
          const patientData = doc.data();
          const savedPsychRefsForPatient = patientData.savedPsychiatrists;
          savedPsychRefs = savedPsychRefs.concat(savedPsychRefsForPatient);
        });

        if (savedPsychRefs.length !== 0) {
          try {
            // Now, you need to fetch data from Firestore using these references
            const fetchDataFromRefs = async () => {
              const savedPsychData = await Promise.all(savedPsychRefs.map(async (psychRef) => {
                try {
                  const docSnapshot = await getDoc(psychRef);
                  if (docSnapshot.exists()) {
                    return docSnapshot.data() as DocumentData;
                  }
                  return null;
                } catch (error) {
                  console.log(error);
                  return null;
                }
              }));

              // Filter out null values (references that didn't fetch successfully)
              const filteredSavedPsychData = savedPsychData.filter((data) => data !== null);

              setSavedPsychiatrists(filteredSavedPsychData);
            };

            fetchDataFromRefs();
          } catch (error) {
            console.log(error)
          }
        }
      }, (error) => {
        console.error('Error fetching data: ', error);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [uid]);

  console.log(savedPsychiatrists);

  const content = savedPsychiatrists.length === 0 ? (
    <NoSavedPsychComponent />
  ) : (
    savedPsychiatrists.slice(0, max_size).map((psychiatrist: any) => {
      return (
        <div key={psychiatrist.id} className="psychiatrist">
          <PsychiatristCard
            p_first_name={psychiatrist.firstName}
            p_last_name={psychiatrist.lastName}
            p_certifications={psychiatrist.position}
            p_location={psychiatrist.location}
          />
        </div>
      );
    })

  );

  const contentsStyle = savedPsychiatrists.length === 0 ? "" : "grid grid-cols-3 gap-4 items-center pb-1/12 shrink";


  //temporary function to add fields to user collection until this can be resolved
  async function addFieldToUsersCollection() {
    const tempRef = collection(db, "users");

    const batch = writeBatch(db);

    try {
      const querySnapshot = await getDocs(tempRef);

      querySnapshot.forEach((doc) => {
        const docRef = doc.ref;
        const existingData = doc.data();
        const savedPsychiatrists = existingData.savedPsychiatrists || [];

        const dataToUpdate = {
          savedPsychiatrists: savedPsychiatrists,
          age:existingData.age || 0,
          language: existingData.language || ["English"],
          genderPref: existingData.genderPref || 1
        };
        
        batch.update(docRef, dataToUpdate);
      });

      await batch.commit();
      console.log("Batch update completed successfully.");
    } catch (error) {
      console.error("Error updating documents:", error);
    }
  }
  // addFieldToUsersCollection();

  return (
    (
      // renders a card containing all of the PsychiatristCards 
      <div className="card w-full bg-base-100 rounded-[6.5px] shadow-custom-shadow">
        <div className="card-body">
          <h1 className="card-title pt-1/15 text-[32px]">My Saved Psychiatrists</h1>
          <div className={contentsStyle}>
            {/* Use the content constant which either contains the NoSavedPsychComponent or the list of psychiatrist cards */}
            {content}
          </div>
        </div>
      </div>
    )
  );
};

export default PsychiatristList;
