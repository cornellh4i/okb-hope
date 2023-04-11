// components/PsychiatristList.tsx
import React from 'react';
import BookMark from '../Assets/bookmark_icon.svg'
import Message from '../Assets/message.svg'

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

const PsychiatristList: React.FC<PsychiatristListProps> = ({ results }) => {
  return (
    <div className="psychiatrist-list space-y-16">
      {results.map((psychiatrist) => (
        <div key={psychiatrist.id} className="psychiatrist">
          {/* Display the psychiatrist's information here */}
          <div className="card card-side bg-base-100 shadow-xl grid-cols-5">
            <div className="col-span-1"><figure><img src="/" alt="Profile Pic" /></figure></div>
            <div className="card-body col-span-3">
              <div className="grid grid-cols-4 gap-4 items-center pb-1/12">
                <h2 className="card-title col-span-2">{psychiatrist.first_name} {psychiatrist.last_name}</h2>
                <button className="btn col-span-1"><BookMark /> Save Psychiatrist</button>
                <button className="btn col-span-1"><Message />Message</button>
              </div>
              <p>{psychiatrist.title} at {psychiatrist.location}</p>
              <p>{psychiatrist.description}</p>
            </div>
          </div>
        </div >
      ))
      }
    </div >
  );
};

export default PsychiatristList;
