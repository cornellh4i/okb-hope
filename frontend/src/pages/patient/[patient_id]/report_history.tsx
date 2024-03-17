import { useState, useEffect } from 'react';
import { IPsychiatrist } from '@/schema';
import PsychiatristList from '@/components/psychiatrists/PsychiatristList';
import { fetchAllProfessionals } from '../../../firebase/fetchData';

const DiscoverPage: React.FC = () => {
  const [psychiatrists, setPsychiatrists] = useState<IPsychiatrist[]>([]);

  // Get all psychiatrists from the database
  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedPsychiatrists: IPsychiatrist[] = await fetchAllProfessionals();
        setPsychiatrists(fetchedPsychiatrists);
      } catch (err: any) {
        console.error(err.message);
      }
    }
    fetchData();
  }, []);

  return (
    <div className={'px-24 pt-9 pb-14'}>
      {psychiatrists.length > 0 ? (
        <PsychiatristList results={psychiatrists} buttonType="report" />
      ) : (
        <div className="text-center my-10">
          <p className="mb-4">No Psychiatrists found.</p>
        </div>
      )}
    </div>
  );
};

export default DiscoverPage;
