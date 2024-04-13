import React, { useEffect, useState } from 'react';
import { fetchProfessionalData, fetchPatientDetails } from '../../../firebase/fetchData';
import MessageList from './MessageList';
import MessageComposer from './MessageComposer';
import ellipsis from '../../assets/ellipses';
import okb_colors from '@/colors';
import router, { useRouter } from 'next/router';
import { useAuth } from '../../../contexts/AuthContext';

interface NameAreaType {
  name: string;
  credentials: string;
  role: 'patient' | 'psychiatrist';

}

const NameArea = ({ name, credentials, role }: NameAreaType) => {
  const router = useRouter();  // Use useRouter hook for routing actions
  const [psychiatristId, setPsychiatristId] = useState('');
  const [patientId, setPatientId] = useState('');

  useEffect(() => {
    const { psych_id } = router.query;
    if (psych_id) {
      setPsychiatristId(psych_id as string);
    }
  }, [router.query]);

  useEffect(() => {
    const { patient_id } = router.query;
    if (patient_id) {
      setPatientId(patient_id as string);
    }
  }, [router.query]);

  const handleProfileClick = () => {
    router.push({
      pathname: `/patient/${patientId}/prof_profile`,
      query: { psych_uid: psychiatristId },
    });
  };
  return (
    <div className='name-area flex py-4 px-6 justify-between items-center shrink-0 w-full bg-white border-b-solid border-b-2 border-[#DEDEDE]'>
      <p className='text-[24px] font-semibold color-black'>{name}</p>
      <div className="dropdown dropdown-click dropdown-bottom dropdown-end">
        <button className={`rounded-full color-[${okb_colors.dark_gray}] hover:bg-gray-200`}>
          {ellipsis}
        </button>
        <ul className='menu dropdown-content inline-flex py-2 px-4 flex-col items-start gap-[14px] rounded-[10px] border-[1px] border-[#C1C1C1] shadow bg-[#FFFDFD] -box w-52'>
          {role === 'psychiatrist' && (
            <>
              <li>Mark as Unread</li>
              <li>Delete Message Thread</li>
            </>
          )}
          {role === 'patient' && (
            <>
              <li>Mark as Unread</li>
              <button onClick={handleProfileClick}>View Profile</button>
              <li>Delete Message Thread</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

const ChatArea = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [displayName, setDisplayName] = useState('');
  const [role, setRole] = useState<'patient' | 'psychiatrist'>('patient');

  useEffect(() => {
    const fetchDataAndDetermineRole = async () => {
      const id = user?.uid;
      if (!id) return;

      try {
        const professionalData = await fetchProfessionalData(id);
        if (professionalData !== null) {
          setRole('psychiatrist');
          setDisplayName(`${professionalData.firstName} ${professionalData.lastName}`);
        } else {
          setRole('patient');
          // Fetch patient data here if needed
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      console.log(role)
    };

    fetchDataAndDetermineRole();
  }, [user?.uid]);

  useEffect(() => {
    const fetchPsychiatristName = async () => {
      const { psych_id, psych_name } = router.query;

      if (psych_name) {
        setDisplayName(decodeURIComponent(psych_name as string));
      } else if (psych_id) {
        try {
          const psychiatristData = await fetchProfessionalData(psych_id as string);
          if (psychiatristData) {
            setDisplayName(`${psychiatristData.firstName} ${psychiatristData.lastName}`);
          }
        } catch (error) {
          console.error('Failed to fetch psychiatrist data:', error);
        }
      }
    };

    if (router.isReady) {
      fetchPsychiatristName();
    }
  }, [router.isReady, router.query]);

  return (
    <div className="chat-area flex flex-col h-screen">
      <NameArea name={displayName} credentials="Credentials" role={role} />
      <div className="flex-grow overflow-scroll">
        <div className='h-full overflow-scroll'><MessageList /></div>
      </div>
      <MessageComposer />
    </div>
  );
};

export default ChatArea;
