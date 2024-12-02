import React from 'react';
import { IPsychiatrist } from '@/schema';


interface SimilarPsychCardProps {
 psychiatrist: IPsychiatrist;
}


const SimilarPsychCard: React.FC<SimilarPsychCardProps> = ({ psychiatrist }) => {
   return (
     <div className="py-3 border-b last:border-none w-full">
       <div className="flex items-start space-x-4">
         <img
           src={psychiatrist.profile_pic || '/default-avatar.png'}
           alt={`${psychiatrist.lastName}'s profile`}
           className="w-12 h-12 rounded-full object-cover border border-gray-300"
         />
         <div className="flex-1 min-w-0">
           <h4
             className="text-sm font-semibold text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis"
             style={{ maxWidth: "calc(100% - 3rem)" }}
           >
             Dr. {psychiatrist.firstName} {psychiatrist.lastName}
           </h4>
           <p className="text-xs text-gray-600">
             Psychiatrist at {psychiatrist.location || 'Unknown Hospital'}
           </p>
         </div>
       </div>
       <div className="mt-4 flex justify-start space-x-4">
         <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600">
           Save
         </button>
         <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600">
           Message
         </button>
       </div>
     </div>
   );
 };
  export default SimilarPsychCard;