import { useEffect, useState } from 'react'
import BookmarkIcon from '@/assets/bookmark.svg'
import PsychiatristIcon from '@/assets/psychiatrist.svg'
import { IPsychiatrist, IUser } from '@/schema';
import { fetchAllUsers, fetchProfessionalData } from '../../../firebase/fetchData';
import router from 'next/router';
import { useAuth } from '../../../contexts/AuthContext';

const PsychiatristCard = ({ psych_uid }: { psych_uid: string }) => {
  const { user } = useAuth();
  
  // Toggles whether to show psychiatrist profile or not
  const [isShown, setIsShown] = useState(false);
  const [professional, setProfessional] = useState<IPsychiatrist | null>(null);

  const handleClick = event => {
    setIsShown(!isShown);
  };

  console.log(psych_uid)

  const handleUnbookmark = async () => {

    //finish this to delete users when clcik bookmark
    const fetchUsers: IUser[] = await fetchAllUsers();
    const currentUser = fetchUsers[0];

    //const currentPsych: IPsychiatrist[] await 

    // currentUser.savedPsychiatrists.pop(`${psychiatrist.firstName} ${psychiatrist.lastName}`);

    // const updatedSavedPsychiatrists = currentUser.savedPsychiatrists.filter(id => id !== psychiatristId);

    //   // Update the user data in Firestore
    //   updateUser(user.uid, { savedPsychiatrists: updatedSavedPsychiatrists });
    // }
  }

  useEffect(() => {
    const fetchProfessional = async () => {
        // Check if both first name and last name are defined
        if (psych_uid) {
            // Fetch professional data based on psychiatrist's uid
            const data = await fetchProfessionalData(psych_uid);
            console.log(data);
            setProfessional(data);
        }
    };

    fetchProfessional();
}, []);

  // Redirects to a professional's profile page and passes their uid as query parameter
  function handleGoToProfProfile(psych_uid: string) {
    console.log(psych_uid)
    router.push({
      pathname: `/${user?.uid}/prof_profile`,
      query: { psych_uid: psych_uid }
    })
  }

  return (
    <div className="card w-11/12 bg-base-100 shadow-xl m-6 border-[3px]">
      <div className="card-body items-center p-4">
        {/* image of psychiatrist */}
        <PsychiatristIcon />
        <h2 className="card-title">{professional?.firstName} {professional?.lastName}</h2>
        {/* <h2 className="font-[400] italic mb-0">{p_certifications}</h2> */}
        {/* view profile button */}
        <div className="card-actions flex w-full mt-2 justify-left">
          <button onClick={() => handleGoToProfProfile(psych_uid)} className="btn w-9/12 bg-okb-blue border-transparent">View Profile</button>

          <button className="btn w-2/12 p-0 glass object-cover bg-contain" onClick={handleUnbookmark}>
            <BookmarkIcon />
          </button>
          {/* dummy component when view profile is pressed */}
          {/* note: right now, this won't execute because button's onClick isn't initiated to setIsShown */}
          {isShown && <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="card-actions justify-end">
                <button className="btn btn-square btn-sm " onClick={handleClick}>

                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <h2 className="card-title text-[16px] text-center">{professional?.firstName} {professional?.lastName}</h2>
              <p>Psychiatrist Profile</p>
            </div>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default PsychiatristCard;