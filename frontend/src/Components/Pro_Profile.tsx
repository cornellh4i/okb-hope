import Left_Arrow from '../Assets/left_arrow.svg'
import Link_Icon from '../Assets/link_icon.svg'
import Saved from '../Assets/saved.svg'
import Message from '../Assets/message.svg'
import Unsaved from '../Assets/unsaved.svg'
import pro_profile from "../pro_profile.json"

interface PsychiatristsType {
  description: string;
  title: string;
  name: string;
  id: string;
}


// const description = collection(db, 'Psychiatrists/`Psychiatrist 1`/description')
// const name = collection(db, 'Psychiatrists/Psychiatrist 1/name')
// const title = collection(db, 'Psychiatrists/Psychiatrist 1/title')

// export default function getName() {
//   const [psychiatristData, setPsychiatristData] = useState<PsychiatristsType[]>([]);

//   async function fetchPsychiatrists() {
//     const users: PsychiatristsType[] = []
//     const userSnapshot = await getDocs(collection(db, "Psychiatrists"));
//     userSnapshot.forEach((doc) => {
//       users.push({ ...doc.data(), id: doc.id } as PsychiatristsType);
//     })
//     // console.log(users[0].name) //jane
//     // console.log(users[1].name) //janice
//     // console.log(users[2].name) // ababio
//     // users is the document array
//     setPsychiatristData(users);
//   }

//   useEffect(() => { fetchPsychiatrists() }, []);
//   // (user => console.log(user.name))
//   // console.log(psychiatristData[0])
//   // psychiatristData.forEach(user => console.log(user.title));
// }
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

interface Props {
  name: string, 
  description: string, 
  title: string, 
  gender: string, 
  languages: string[], 
  photo_id: string
}
// certifications, link, availabilities, description: string, title: string, gender: string, languages: string[], name: string, photo_id: string
const Pro_Profile: React.FC<Props> = ({name, description, title, gender, languages, photo_id}) => {
  
  let languagesList : JSX.Element[] = [];

  languages.forEach((language) => {
    languagesList.push(<div className="badge badge-outline">{language}</div>);
  });

  let daysList : JSX.Element[] = [];

  days.forEach((day) => {
    daysList.push(<div className="card shadow-xl">
    <div className="card-body">
      <h2 className="card-title">{day}</h2>
    </div>
  </div>)
  });

  return (
    <div>
      <div className='sm:text-3xl'> {/* this is name*/}
        {name}
        {/* should be db title + db name */}
      </div>
      <div className=''> {/* img */}
        {/* <img>{photo_id}</img> */}
      </div>

      <div className=''> {/* certifications */}
        <div className="badge badge-outline">
          {/* {pro_profile[0].certifications} */}
          {/* json certs */}
        </div>

        {/* this is save button*/}
        <button className="btn col-span-1 bg-[#E5E5E5] text-[#9A9A9A] text-[16px] flex space-x-3" >
            <Unsaved />
            <div>Save Psychiatrist</div>
        </button>

        {/* this is message button*/}
        <button className="btn col-span-1 bg-[#E5E5E5] text-[#9A9A9A] text-[16px] flex space-x-3">
          <Message />
          <div>Message</div>
        </button>
        </div>

        {/* gender tag */}
        <div className="badge badge-outline">
          {gender}
        </div>

        {/* language tag */}
        <div>{languagesList}</div>

        {/* intro paragraph */}
        <div className=''>
          {description}
        </div>

        {/* link, make sure to add svg */}
        <button className="btn btn-outline">
          <div>{Link_Icon}</div>
          <div>www.mentalhealthsite.com</div>
          {/* <div>{pro_profile[0].link}</div> */}
        </button>
    
        <div className=''> {/* monday?*/}
          {/*  */}
          <div className=''> {/* availabilities*/}
            {/* */}
          </div>
        </div>
        <div className='sm:text-3xl'>
          Availability
        </div>
        {/* schedule cards */}
        <div className='grid grid-flow-col auto-cols-max gap-x-px'>{daysList}</div>

        <div className='sm:text-3xl'>
          Book Appointment
        </div>
      </div>
  )
}

export default Pro_Profile