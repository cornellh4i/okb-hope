import Left_Arrow from '../Assets/left_arrow.svg'
import Link_Icon from '../Assets/link_icon.svg'
import Saved from '../Assets/saved.svg'
import Unsaved from '../Assets/unsaved.svg'
import pro_profile from "../pro_profile.json"
import { useFirestoreDocData } from 'reactfire';
import 'firebase/firestore';

export default function Pro_Profile() {
  return (
    <div className='sm:text-3xl'>
      Book Appointment now
    </div>
  )
}