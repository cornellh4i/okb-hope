import PyschiatristCard from './PsychiatristCard';
import results from '@/temp_data/psychiatrists.json';
import NoSavedPsychComponent from './NoSavedPsych';

const PsychiatristList = ({ max_size }: { max_size: number }) => {
  // Convert the results object into an array
  // Ensures # psychiatrist cards rendered <= max_size
  const psychiatristArr = Object.values(results).slice(0, max_size);

  // psychiatristArr.length = 0;

  // Check if psychiatristArr has no values
  const content = psychiatristArr.length === 0 ? (
    <NoSavedPsychComponent />
  ) : (
    psychiatristArr.map((psychiatrist: any) => (
      <div key={psychiatrist.id.toString()} className="psychiatrist">
        <PyschiatristCard
          p_name={psychiatrist.name}
          p_certifications={psychiatrist.certification}
        />
      </div>
    ))
  );

  const contentsStyle = psychiatristArr.length === 0 ? "" : "grid grid-cols-3 gap-4 items-center pb-1/12 shrink";

 return (
   (
    // renders a card containing all of the PsychiatristCards 
    <div className="card w-full bg-base-100 rounded-[6.5px] shadow-custom-shadow">
      <div className="card-body">
        <h1 className="card-title pt-1/15 text-[32px]">My Saved Psychiatrists</h1>
        <div className={contentsStyle}>
          {/* Use the content constant which either contains the NoSavedPsychComponent or the list of psychiatrist cards */}
          {content}
        </div>
      </div>
    </div>
    ) 
);
};

export default PsychiatristList;
