import React from 'react';
import PyschiatristCard from './PsychiatristCard';
import results from '../../../psychiatrists.json';

const PsychiatristList = ({ max_size }: { max_size: number }) => {
  // Convert the results object into an array
  // Ensures # psychiatrist cards rendered <= max_size
  const psychiatristArr = Object.values(results).slice(0, max_size);

  return (
    // renders a card containing all of the PsychiatristCards 
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <h1 className="card-title pt-1/15">My Saved Psychiatrists</h1>
        <div className="grid grid-cols-4 gap-4 items-center pb-1/12 shrink">
          {/* map each JSON object to each individual PsychiatristCard*/}
          {psychiatristArr.map(psychiatrist => (
            <div key={psychiatrist.id.toString()} className="psychiatrist">
              <PyschiatristCard p_name={psychiatrist.name} p_certifications={psychiatrist.certification}></PyschiatristCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PsychiatristList