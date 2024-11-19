import { useState, useEffect } from ‘react’;
import { IPsychiatrist } from ‘@/schema’;
import { useRouter } from ‘next/router’;
import { fetchUnreportedProfessionals } from ‘../../../firebase/fetchData’;
import PsychiatristList from ‘@/components/psychiatrists/PsychiatristList’;
import { useAuth } from ‘../../../contexts/AuthContext’;

const SimilarPsychiatristsDisplay: React.FC = () => {
  const router = useRouter();
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
  return (
    <div className=“flex flex-col px-23 pt-9 pb-14”>
      <div className=“flex justify-center pb-8">
        {psychiatrists.length > 0 ? (
          <PsychiatristList results={psychiatrists} buttonType={‘discover’} />
        ) : (
          <div className=“text-center my-10”>
            <p className=“mb-4">No Psychiatrists found.</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default SimilarPsychiatristsDisplay;