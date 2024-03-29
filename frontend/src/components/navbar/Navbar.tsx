import { logout, logInWithGoogle } from "../../../firebase/firebase";
import { useAuth } from "../../../contexts/AuthContext";
import Link from "next/link";
import Logo from '@/assets/logo.svg'
import colors from "@/colors";
import { useRouter } from 'next/router';
import { useEffect } from "react";

const Navbar = () => {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div className={`flex p-2.5 bg-[${colors.white}] items-end boxShadow-custom-shadow`}>

      <div className="justify-start items-center gap-8 flex ml-2">
        <ul className="menu menu-horizontal px-1 gap-5">
          <Link href="/" className="w-18">
            <Logo />
          </Link>
          {user ? user.userType == "patient" ?
            <li className={`${router.pathname === '/dashboard' ? 'underline-offset-1 custom-active' : ''}`}>
              {/* A link to the patient's dashboard */}
              <Link href={`/${user.userType}/${user.uid}/dashboard`} className="w-18">
                <div className="text-[18px] text-[#195BA5]">My Dashboard</div>
              </Link>
            </li>
            : user.userType == "psychiatrist" ?
              <li className={`${router.pathname === '/psych_dashboard' ? 'underline-offset-1 custom-active' : ''}`}>
                {/* A link to the psychiatrist's dashboard */}
                <Link href={`/${user.userType}/${user.uid}/psych_dashboard`} className="w-18">
                  <div className="text-[18px] text-[#195BA5]">My Dashboard</div>
                </Link>
              </li>
              : <div></div>
            : <div></div>}
        </ul>
      </div>

      <div className="flex-1"></div>
      <ul className="menu menu-horizontal px-1 gap-5">
        {!user &&
          <li className={`${router.pathname === '/discover' ? 'underline-offset-1 custom-active' : ''}`}>
            {/* A link to the user's discover page */}
            <Link href={`/discover`} className="w-18">
              <div className="text-[18px] text-[#195BA5]">Discover Professionals</div>
            </Link>
          </li>}
        {user && user.userType == "patient" &&
          <li className={`${router.pathname === '/discover' ? 'underline-offset-1 custom-active' : ''}`}>
            {/* A link to the user's discover page */}
            <Link href={`/${user?.userType}/${user?.uid}/discover`} className="w-18">
              <div className="text-[18px] text-[#195BA5]">Discover Professionals</div>
            </Link>
          </li>}

        {user && (user.userType == "patient" || user.userType == "psychiatrist") ?
          <li className={`${router.pathname === '/messages' ? 'underline-offset-1 custom-active' : ''}`}>
            {/* A link to the user's messages */}
            <Link href={`/${user.userType}/${user.uid}/messages`} className="w-18">
              <div className="text-[18px] text-[#195BA5]">Messages</div>
            </Link>
          </li>
          :
          <div></div>}

        {!user || (user.userType == "patient" || user.userType == "psychiatrist") ?
          <li className={`${router.pathname === '/about' ? 'underline-offset-1 custom-active' : ''}`}>
            <Link href="https://www.wohohiame.com/" className="w-18">
              <div className="text-[18px] text-[#195BA5]">About</div>
            </Link>
          </li>
          : <div></div>}

        {user && user.userType == "admin" ?
          <>
            <li className={`${router.pathname === '/database' ? 'underline-offset-1 custom-active' : ''}`}>
              <Link href={`/${user?.userType}/${user?.uid}/database`} className="w-18">
                <div className="text-[18px] text-[#195BA5]">Database</div>
              </Link>
            </li><li className={`${router.pathname === '/analytics' ? 'underline-offset-1 custom-active' : ''}`}>
              {/* Update this href to go to the analytics page */}
              <Link href="https://www.wohohiame.com/" className="w-18">
                <div className="text-[18px] text-[#195BA5]">Analytics</div>
              </Link>
            </li>
            <li className={`${router.pathname === '/reports' ? 'underline-offset-1 custom-active' : ''}`}>
              {/* Update this href to go to the reports page */}
              <Link href="https://www.wohohiame.com/" className="w-18">
                <div className="text-[18px] text-[#195BA5]">Reports</div>
              </Link>
            </li>
          </>
          : <div></div>}


        {!user ? <li className={`${router.pathname === '/questionnaire' ? 'underline-offset-1 custom-active' : ''}`}>
          <Link href="/questionnaire" className="w-18">
            <div className="text-[18px] text-[#195BA5]">Sign Up</div>
          </Link>
        </li> : <div></div>}

        {
          user ? <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
            <div tabIndex={0} className={`btn btn-circle bg-[${colors.okb_blue}] text-[18px] font-normal`}>{user.displayName?.charAt(0)}</div>
            <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52">
              {/* A link to the user's edit profile page */}
              {user.userType == "patient" ? <Link href={`/${user.userType}/${user.uid}/edit_profile`}>
                <li>Edit Profile</li>
              </Link> : <Link href={`/${user.userType}/${user.uid}/edit_psych`}>
                <li>Edit Profile</li>
              </Link>}
              <Link href="/" onClick={logout}>
                <li>Log Out</li>
              </Link>
            </ul>
          </div> : <li>
            <div className="flex justify-center items-center">
              <button
                className="w-[104px] h-8 py-1.5 bg-sky-700 rounded-[10px] border-2 border-sky-700 justify-center items-center flex text-white"
                onClick={() => logInWithGoogle()}
              >
                <div className="text-[18px] font-[600]">Log In</div>
              </button>
            </div>
          </li>
        }
      </ul>
    </div>
  )
}

export default Navbar;