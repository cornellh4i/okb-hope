import { useState, useEffect, useRef } from 'react';
import PyschiatristCard from './PsychiatristCard';
import results from '@/temp_data/psychiatrists.json';
import { db, auth } from '../../../firebase/firebase';
import { collection, getDocs, where, query, DocumentData, onSnapshot,doc, writeBatch } from "firebase/firestore";
 
import NoSavedPsychComponent from './NoSavedPsych';

const PsychiatristList = ({ max_size }: { max_size: number }) => {
  const uid = auth.currentUser?.uid;
  const usersRef = collection(db, "users");
  const [savedPsychiatrists, setSavedPsychiatrists] = useState<DocumentData[]>([]);
  


  // Convert the results object into an array
  // Ensures # psychiatrist cards rendered <= max_size
  // const psychiatristArr = Object.values(results).slice(0, max_size);

  // psychiatristArr.length = 0;

  // Check if psychiatristArr has no values
  // const content = psychiatristArr.length === 0 ? (
  //   <NoSavedPsychComponent />
  // ) : (
  //   psychiatristArr.map((psychiatrist: any) => (
  //     <div key={psychiatrist.id.toString()} className="psychiatrist">
  //       <PyschiatristCard
  //         p_name={psychiatrist.name}
  //         p_certifications={psychiatrist.certification}
  //       />
  //     </div>
  //   ))
  // );

  useEffect(() =>{
    if(uid){
      const queryDoc = query(usersRef,where("user_id","==",uid));
      console.log(queryDoc);
      const unsubscribe = onSnapshot(queryDoc, (querySnapshot) => {
        const savedPsychData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          savedPsychiatrists: doc.data().savedPsychiatrists
        }));
        console.log(querySnapshot.docs);
        console.log("hiiiii" + savedPsychData);
        setSavedPsychiatrists(savedPsychData.map(data => data.savedPsychiatrists));
      },(error) => {console.error("Error fetching data: ", error);});
      
      return () => {
        unsubscribe();
      };
    }
  },[]);
  console.log(savedPsychiatrists[0]);
  const content = savedPsychiatrists.length === 0 ? (
    <NoSavedPsychComponent />
  ) : (
    savedPsychiatrists.slice(0, max_size).map((psychiatrist: any) => (
      <div key={psychiatrist.id} className="psychiatrist">
        <PyschiatristCard
          p_name={psychiatrist.firstName}
          p_certifications={psychiatrist.position}
        />
      </div>
    ))
    
  );
  
  const contentsStyle = savedPsychiatrists.length === 0 ? "" : "grid grid-cols-3 gap-4 items-center pb-1/12 shrink";


  //function to add fields to user collection
  async function addFieldToUsersCollection() {
    const uid = auth.currentUser?.uid;
    const tempRef = collection(db, "users");
    const psychRefDoc = doc(db, "psychiatrists","2LSl9NbxLbpTCiOA26Tc");

    const batch = writeBatch(db);
  
    try {
      const querySnapshot = await getDocs(tempRef);
  
      querySnapshot.forEach((doc) => {
        const docRef = doc.ref;
        const dataToUpdate = {
          savedPsychiatrists: psychRefDoc,
        };
        // const dataToDelete = {
        //   newField: newField.delete()
        // }
        batch.update(docRef, dataToUpdate);
      });
  
      await batch.commit();
      console.log("Batch update completed successfully.");
    } catch (error) {
      console.error("Error updating documents:", error);
    }
  }
  addFieldToUsersCollection();

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
