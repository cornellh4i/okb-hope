import Left_Arrow from '../Assets/left_arrow.svg'
import Link_Icon from '../Assets/link_icon.svg'
import Saved from '../Assets/saved.svg'
import Unsaved from '../Assets/unsaved.svg'
import pro_profile from "../pro_profile.json"
import { useFirestoreDocData } from 'reactfire';
import { db } from "../../firebase/firebase";
import { useEffect, useState } from "react";
import { getDocs, collection, doc, addDoc, setDoc, updateDoc, onSnapshot, getDoc } from "firebase/firestore";
import 'firebase/firestore';



interface PsychiatristsType {
  description: string;
  title: string;
  name: string;
  id: string;


}


// const description = collection(db, 'Psychiatrists/`Psychiatrist 1`/description')
// const name = collection(db, 'Psychiatrists/Psychiatrist 1/name')
// const title = collection(db, 'Psychiatrists/Psychiatrist 1/title')

export default function getName() {
  const [psychiatristData, setPsychiatristData] = useState<PsychiatristsType[]>([]);

  async function fetchPsychiatrists() {
    const users: PsychiatristsType[] = []
    const userSnapshot = await getDocs(collection(db, "Psychiatrists"));
    userSnapshot.forEach((doc) => {
      users.push({ ...doc.data(), id: doc.id } as PsychiatristsType);
    })
    // console.log(users[0].name) //jane
    // console.log(users[1].name) //janice
    // console.log(users[2].name) // ababio
    // users is the document array
    setPsychiatristData(users);
  }

  useEffect(() => { fetchPsychiatrists() }, []);
  // (user => console.log(user.name))
  // console.log(psychiatristData[0])
  // psychiatristData.forEach(user => console.log(user.title));
}

// certifications, link, availabilities, description: string, title: string, gender: string, languages: string[], name: string, photo_id: string
// export default function Pro_Profile() {
//   return (


//     <div>
//       <div className='sm:text-3xl'> {/* this is name*/}
//         {/* should be db title + db name */}
//       </div>
//       <div className=''> {/* img */}
//         <img></img>
//       </div>
//       <div className=''> {/* certifications */}
//         <div className="badge badge-outline">
//           pro_profile[0].certifications
//           {/* json certs */}
//         </div>
//         <div className=''> {/* this is save button*/}
//           {/*  */}
//         </div>
//         <div className=''> {/* this is message button*/}
//           {/* */}
//         </div>
//         <div className=''> {/* gender tag*/}
//           {/* */}
//         </div>
//         <div className=''> {/* language tag, make loop?*/}
//           {/* */}
//         </div>
//         <div className=''> {/* intro paragraph */}
//           {/* db description */}
//         </div>
//         <div className=''> {/* link, make sure to add svg */}
//           {/* json link */}
//         </div>
//         <div className=''> {/* monday?*/}
//           {/*  */}
//           <div className=''> {/* availabilities*/}
//             {/* */}
//           </div>
//         </div>
//         <div className='sm:text-3xl'>
//           Availability
//         </div>
//         <div className='sm:text-3xl'>
//           Book Appointment
//         </div>
//       </div> </div>
//   )
// }