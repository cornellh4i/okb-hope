import AdminView from '@/components/admin/AdminView';
import { IPsychiatrist } from '@/schema';
import StatusIcon from '@/components/filter/StatusIcon'
import ApproveAccount from './ApproveAccount'
import { fetchProfessionalData } from '../../../../firebase/fetchData';
import React, {useState, useEffect} from 'react';

const PsychiatristProfile = ({ psychiatrist }) => {
    return (
      <div className="w-full max-w-6xl flex justify-center items-center">
        <div className="w-full bg-white p-6 rounded-md shadow-md">
          <div className="flex items-center">
            {/* Profile Picture */}
            <img src={psychiatrist.profileImage} alt="Profile" className="rounded-full w-32 h-32 mr-6" />
  
            <div className="flex-1">
              {/* Name and Status */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{psychiatrist.name}</h2>
                <StatusIcon status={psychiatrist.status} /> {/* StatusIcon replaces the warning triangle */}
              </div>
  
              <p className="text-gray-600">{psychiatrist.title}</p>
              <p>{psychiatrist.description}</p>
              <a href={psychiatrist.website} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                {psychiatrist.website}
              </a>
            </div>
          </div>
  
          {/* Download Button */}
          <div className="mt-6">
            <button id="download" color="primary">
              Download
            </button>
          </div>
  
          {/* Approve Account Component */}
          <div className="mt-8">
            <ApproveAccount />
          </div>
        </div>
      </div>
    );
  };
  
  // const Bookings = () => {
  //   // UPDATE
  //   const psychiatrist = {
  //     name: 'Dr. Gloria Shi',
  //     profileImage: '/path/to/image.jpg',
  //     title: 'Psychiatrist at Wohohame Hospital',
  //     description: 'Dr. Gloria Shi is a psychiatrist based in Accra, Ghana...',
  //     status: 'requires_approval', // Assuming a status is passed
  //     website: 'https://www.mentalhealthsite.com'
  //   };
  
  //   return (
  //     <div className="w-full min-h-screen flex justify-center">
  //       {/* <AdminView /> */}
  //       <PsychiatristProfile psychiatrist={psychiatrist} />
  //     </div>
  //   );
  // };

  const Bookings = ({ psych_uid }) => {
    const [psychiatrist, setPsychiatrist] = useState<IPsychiatrist | null>(null); // Allow both IPsychiatrist and null
    const [loading, setLoading] = useState(true); // State to handle loading
    const [error, setError] = useState<string | null>(null); // State to handle errors
  
    useEffect(() => {
      // Fetch data on component mount
      if (!psych_uid) {
        console.error('Error: psych_uid is undefined or null');
        setError('Invalid psychiatrist ID.');
        setLoading(false);
        return;
      }
  
      // Log psych_uid to verify it's being passed correctly
      console.log('Fetching data for psych_uid:', psych_uid);
      const fetchData = async () => {
        try {
          const data = await fetchProfessionalData(psych_uid); // Fetch psychiatrist data using psych_uid
          setPsychiatrist(data);
          setLoading(false);
        } catch (error: unknown) {
          if (error instanceof Error) {
            // Handle the error as an Error object
            console.error('Error fetching psychiatrist data:', error.message);
            setError(error.message);
          } else {
            // Fallback for other error types
            console.error('Unknown error:', error);
            setError('An unknown error occurred.');
          }
          setLoading(false);
      };}
  
      fetchData();
    }, [psych_uid]);
  
    if (loading) {
      return <p>Loading...</p>; // Render loading state
    }
  
    if (error) {
      return <p>Error: {error}</p>; // Render error message if fetch fails
    }
  
    if (!psychiatrist) {
      return <p>No data available</p>; // Render if no data is available
    }
  
    return (
      <div className="w-full min-h-screen bg-gray-100">
        <AdminView />
        <PsychiatristProfile psychiatrist={psychiatrist} />
      </div>
    );
  };
  
  export default Bookings;