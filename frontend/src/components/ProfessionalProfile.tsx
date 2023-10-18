import Link from "next/link";
import Logo from '@/assets/logo.svg'
import colors from "@/colors";

const ProfessionalProfile = ({psychiatrist}) => {
  return(
    <div className="flex justify-center">
      <div className="card-title font-montserrat">
        Dr. X
      </div>
      <div>
        <Link href="/edit_psych" >
          <button className="text-[16px]">Edit Profile</button>
        </Link>
        
      </div>
    </div>
  )
  };

  export default ProfessionalProfile;