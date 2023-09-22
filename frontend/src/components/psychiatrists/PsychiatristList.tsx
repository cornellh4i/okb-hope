// // components/PsychiatristList.tsx
// import { IPsychiatrist } from '@/schema';
// import BookMark from '@assets/bookmark.svg'
// import Message from '@assets/message.svg'

// interface PsychiatristListProps {
//   results: IPsychiatrist[];
// }

// const PsychiatristList: React.FC<PsychiatristListProps> = ({ results }) => {
//   return (
//     <div className="psychiatrist-list space-y-16">
//       {results.map((psychiatrist) => (
//         <div key={psychiatrist.id} className="psychiatrist">
//           {/* Display the psychiatrist's information here */}
//           <div className="card card-side bg-base-100 shadow-xl grid-cols-5">
//             <div className="col-span-1"><figure><img src="/" alt="Profile Pic" /></figure></div>
//             <div className="card-body col-span-3">
//               {/* Grid (to enable easier organization of columns) w/ psychiatrist name + buttons */}
//               <div className="grid grid-cols-4 gap-4 items-center pb-1/12">
//                 <h2 className="card-title col-span-2 text-[#5F5F5F] text-[24px] font-bold">{psychiatrist.first_name} {psychiatrist.last_name}</h2>
//                 <button className="btn col-span-1 bg-[#E5E5E5] text-[#9A9A9A] text-[16px] flex space-x-3" >
//                   <BookMark />
//                   <div>Save Psychiatrist</div>
//                 </button>
//                 <button className="btn col-span-1 bg-[#E5E5E5] text-[#9A9A9A] text-[16px] flex space-x-3"><Message /><div>Message</div></button>
//               </div>
//               {/* Additional psychiatrist info */}
//               <p className="text-[#5F5F5F] text-[16px] font-bold">{psychiatrist.title} at {psychiatrist.location}</p>
//               <p className="text-[#5F5F5F] text-[12px]">{psychiatrist.description}</p>
//             </div>
//           </div>
//         </div >
//       ))
//       }
//     </div >
//   );
// };

// export default PsychiatristList;
