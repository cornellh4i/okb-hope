import Navbar from '../components/navbar/Navbar'
import Pro_Profile from '../components/Pro_Profile'
import pro_profile from "../pro_profile.json"
import { usePsychiatrist1 } from "../components/dummy_psych";

const languages: string[] = pro_profile[1].languages
const gender: string = pro_profile[1].gender
const link: string = pro_profile[1].link
const certifications = pro_profile[1].certifications
const times = pro_profile[1].dates

export default function PsychiatristProfile() {
  const psychiatrist = usePsychiatrist1();
  return (
    <div>
      <Navbar />
      <Pro_Profile name={psychiatrist?.name ?? ""}
        description={psychiatrist?.description ?? ""}
        title={psychiatrist?.title ?? ""} gender={gender}
        languages={languages}
        photo_id={psychiatrist?.photo_id ?? ""}
        link={link} times={times}
        certifications={certifications}></Pro_Profile>
    </div >
  )
}
