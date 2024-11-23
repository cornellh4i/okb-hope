import { useState, useEffect } from 'react';
import { IPsychiatrist } from '@/schema';
import { fetchUnreportedProfessionals } from '../../../firebase/fetchData';
import { useAuth } from '../../../contexts/AuthContext';
import SimilarPsychCard from '@/components/profProfile/SimilarPsychCard';

const SimilarPsychiatristsDisplay: React.FC = () => {
  const { user } = useAuth();
  const [psychiatrists, setPsychiatrists] = useState<IPsychiatrist[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (user) {
          const fetchedPsychiatrists: IPsychiatrist[] = await fetchUnreportedProfessionals(user.uid);
          setPsychiatrists(fetchedPsychiatrists);
        }
      } catch (err: any) {
        console.error(err.message);
      }
    }
    fetchData();
  }, [user]);

  const topPsychiatrists = psychiatrists.slice(0, 4);

  return (
    <div className="w-full flex justify-end">
      <div className="w-64 pr-4">
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
