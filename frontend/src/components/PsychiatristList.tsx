import { useState } from 'react';
import NotBookMark from '../assets/bookmark.svg'
import BookMarked from '../assets/bookmark.svg'
import Message from '../assets/message.svg'
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import { signInWithGoogle } from '../../firebase/firebase';
import { useRouter } from 'next/router';
import { LoginPopup } from './LoginPopup';
import { IPsychiatrist } from '@/schema';

interface PsychiatristListProps {
  results: IPsychiatrist[];
}

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

  const [saved, setSaved] = useState(false);

  function toggleSaved() {
    setSaved(!saved);
  }

  const signInWithGoogleAndRedirect = async (onClose: () => void) => {
    await signInWithGoogle();
    router.push('/messages'); // Moved this line before the closing of the popup
    setShowPopup(false);
    onClose();
  };

  return (
    <div className="psychiatrist-list space-y-16">
      {showPopup && <LoginPopup onClose={() => setShowPopup(false)} signInWithGoogleAndRedirect={signInWithGoogleAndRedirect} />}
      {results.map((psychiatrist) => (
        <div key={psychiatrist.id} className="psychiatrist">
          {/* Display the psychiatrist's information here */}
          <div className="card card-side bg-base-100 shadow-xl grid-cols-5 hover:brightness-90">
            <div className="col-span-1 flex items-center justify-center">
              <figure>
                <img src="https://lh3.googleusercontent.com/a/AGNmyxZobZdPI78Xzk3dOtXciW5fAE3Wn-QIZYlJTdk_=s96-c" alt="Profile Pic" className="rounded-full w-20 h-20 object-cover ml-4" />
              </figure>
            </div>
            <div className="card-body col-span-3">
              {/* Grid (to enable easier organization of columns) w/ psychiatrist name + buttons */}
              <div className="grid grid-cols-4 gap-4 items-center pb-1/12">
                <h2 className="card-title col-span-2 text-[#5F5F5F] text-[24px] font-bold">{psychiatrist.first_name} {psychiatrist.last_name}</h2>
                <button onClick={toggleSaved} className="btn col-span-1 bg-[#E5E5E5] text-[#9A9A9A] text-[16px] flex space-x-3" >
                  {saved ? <BookMarked /> : <NotBookMark />}
                  {/* replace saved with whether boolean in db to indicate whether psych has saved or not */}
                  <div>{saved ? 'Save Psychiatrist' : 'Saved Psychiatrist'}</div>
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

