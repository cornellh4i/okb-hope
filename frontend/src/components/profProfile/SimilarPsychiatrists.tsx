import { useState, useEffect } from 'react';
import { IPsychiatrist } from '@/schema';
import { useRouter } from 'next/router';
import { fetchUnreportedProfessionals } from '../../../firebase/fetchData';
import SimilarPsychCard from '@/components/profProfile/SimilarPsychCard';
import { useAuth } from '../../../contexts/AuthContext';


const SimilarPsychiatristsDisplay: React.FC = () => {
 const router = useRouter();
 const { user } = useAuth();
 const currentPsychiatristId = router.query.id as string;


 const [psychiatrists, setPsychiatrists] = useState<IPsychiatrist[]>([]);
 const [currentPsychiatrist, setCurrentPsychiatrist] = useState<IPsychiatrist | null>(null);




 useEffect(() => {
   async function fetchData() {
    
     if (!user ) return;


     try {
       const fetchedPsychiatrists: IPsychiatrist[] = await fetchUnreportedProfessionals(user.uid);


       const current = fetchedPsychiatrists.find(
         (psych) => psych.uid === currentPsychiatristId
       );


       setCurrentPsychiatrist(current || null);


       const others = fetchedPsychiatrists.filter(
         (psych) => psych.uid !== currentPsychiatristId
       );
       setPsychiatrists(others);
     } catch (err: any) {
       console.error("Error fetching psychiatrists:", err.message);
     }
   }


  


   fetchData();
  }, [user, currentPsychiatristId]);


  const sortedPsychiatrists = currentPsychiatrist
    ? psychiatrists.sort((a, b) => {
        const sharedA = currentPsychiatrist.specialty?.filter((spec) =>
          a.specialty?.includes(spec)
        ).length || 0;
        const sharedB = currentPsychiatrist.specialty?.filter((spec) =>
          b.specialty?.includes(spec)
        ).length || 0;
 
 
        return sharedB - sharedA;
      })
    : psychiatrists;
    const topPsychiatrists = sortedPsychiatrists.slice(0, 4);


    return (
      <div className="w-full flex justify-center">
        <div className="w-full max-w-2xl px-4">
          {topPsychiatrists.length > 0 ? (
            topPsychiatrists.map((psychiatrist) => (
              <SimilarPsychCard key={psychiatrist.uid} psychiatrist={psychiatrist} />
            ))
          ) : (
            <div className="text-center my-10">
              <p className="mb-4">No Psychiatrists found.</p>
            </div>
          )}
        </div>
      </div>
    );
   };
   
   
   export default SimilarPsychiatristsDisplay;