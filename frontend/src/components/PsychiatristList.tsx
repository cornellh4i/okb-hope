import React, { useState } from 'react';
import BookMark from '../assets/bookmark.svg'
import Message from '../assets/message.svg'
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import { signInWithGoogle } from '../../firebase/firebase';
import { useRouter } from 'next/router';

enum Gender {
  Male = 0,
  Female = 1
}

interface Psychiatrist {
  id: number;
  first_name: string;
  last_name: string;
  title: string;
  profile_pic: null;
  availability: string[];
  gender: Gender;
  location: string;
  language: string[];
  specialty: string[];
  description: string
}

interface PsychiatristListProps {
  results: Psychiatrist[];
}

const LoginPopup: React.FC<{ onClose: () => void, signInWithGoogleAndRedirect: (onClose: () => void) => Promise<void> }> = ({ onClose, signInWithGoogleAndRedirect }) => {

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="relative bg-white p-8 rounded shadow-md text-center space-y-4">
        {/* Added "X" button */}
        <button className="absolute top-2 right-2 text-[#5F5F5F] text-[24px] font-bold" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-xl font-bold">Log in to save, message, and book appointments with psychiatrists</h2>
        <button className="btn bg-[#E5E5E5] w-full" onClick={() => signInWithGoogleAndRedirect(onClose)}>
          Login
        </button>
        <p>
          Don't have an account?{' '}
          <button className="text-[#000000] font-bold" onClick={() => signInWithGoogleAndRedirect(onClose)}>
            Create one here
          </button>
        </p>
      </div>
    </div>
  );
};

const PsychiatristList: React.FC<PsychiatristListProps> = ({ results }) => {
  const { user } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const handleSendMessage = (event: React.MouseEvent) => {
    if (!user) {
      event.preventDefault();
      setShowPopup(true);
    }
  };

  const signInWithGoogleAndRedirect = async (onClose: () => void) => {
    await signInWithGoogle();
    setShowPopup(false);
    onClose();
    router.push('/messages');
  };

  return (
    <div className="psychiatrist-list space-y-16">
      {showPopup && <LoginPopup onClose={() => setShowPopup(false)} signInWithGoogleAndRedirect={signInWithGoogleAndRedirect} />}
      {results.map((psychiatrist) => (
        <div key={psychiatrist.id} className="psychiatrist">
          {/* Display the psychiatrist's information here */}
          <div className="card card-side bg-base-100 shadow-xl grid-cols-5">
            <div className="col-span-1"><figure><img src="/" alt="Profile Pic" /></figure></div>
            <div className="card-body col-span-3">
              {/* Grid (to enable easier organization of columns) w/ psychiatrist name + buttons */}
              <div className="grid grid-cols-4 gap-4 items-center pb-1/12">
                <h2 className="card-title col-span-2 text-[#5F5F5F] text-[24px] font-bold">{psychiatrist.first_name} {psychiatrist.last_name}</h2>
                <button className="btn col-span-1 bg-[#E5E5E5] text-[#9A9A9A] text-[16px] flex space-x-3" >
                  <BookMark />
                  <div>Save Psychiatrist</div>
                </button>
                <Link href="/messages">
                  <div
                    className="btn col-span-1 bg-[#E5E5E5] text-[#9A9A9A] text-[16px] flex space-x-3"
                    onClick={handleSendMessage}
                  >
                    <Message />
                    <div>Message</div>
                  </div>
                </Link>
              </div>
              {/* Additional psychiatrist info */}
              <p className="text-[#5F5F5F] text-[16px] font-bold">{psychiatrist.title} at {psychiatrist.location}</p>
              <p className="text-[#5F5F5F] text-[12px]">{psychiatrist.description}</p>
            </div>
          </div>
        </div >
      ))
      }
    </div >
  );
};

export default PsychiatristList;

