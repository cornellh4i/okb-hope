import { useState } from 'react'
import BookmarkIcon from '@/assets/bookmark.svg'
import PsychiatristIcon from '@/assets/psychiatrist.svg'

const PyschiatristCard = ({ p_name, p_certifications }: { p_name: string, p_certifications: string }) => {
  // toggles whether to show psychiatrist profile or not
  const [isShown, setIsShown] = useState(false);
  const handleClick = event => {
    setIsShown(!isShown);
  };

  return (
    <div className="card w-11/12 bg-base-100 shadow-xl m-6 border-[3px]">
      <div className="card-body items-center p-4">
        {/* image of psychiatrist */}
        <PsychiatristIcon />
        <h2 className="card-title">{p_name}</h2>
        <h2 className="font-[400] italic mb-0">{p_certifications}</h2>
        {/* view profile button */}
        <div className="card-actions flex w-full mt-2 justify-left">
          <button className="btn w-9/12 bg-okb-blue border-transparent">View Profile</button>
          
          <button className="btn w-2/12 p-0 glass object-cover bg-contain" >
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
              <h2 className="card-title text-[16px] text-center">{p_name}</h2>
              <p>Pyschiatrist Profile</p>
            </div>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default PyschiatristCard;