import { logout, logInWithGoogle } from "../../../firebase/firebase";
import { useAuth } from "../../../contexts/AuthContext";
import Link from "next/link";
import Logo from '@/assets/logo.svg'
import colors from "@/colors";
import { useRouter } from 'next/router';
import { useEffect } from "react";
import Logout from "@/assets/logout.svg";

const Navbar = () => {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div className={`flex flex-row justify-between items-start w-full p-2.5 bg-[${colors.white}] items-end boxShadow-custom-shadow`}>

      <div className="flex justify-start items-center gap-8 flex ml-2">
        <ul className="menu lg:menu-horizontal px-1 gap-5">
          <Link href="/" className="flex justify-start">
            <Logo />
          </Link>
          {user ? user.userType == "patient" ?
            <li className={`${router.pathname === '/dashboard' || router.pathname == `/patient/[patient_id]/dashboard` ? 'underline-offset-1 custom-active' : ''}`}>
              {/* A link to the patient's dashboard */}
              <Link href={`/${user.userType}/${user.uid}/dashboard`} className="flex justify-start">
                <div className="text-[18px] text-[#195BA5]">My Dashboard</div>
              </Link>
            </li>
            : user.userType == "psychiatrist" ?
              <li className={`${router.pathname === '/psych_dashboard' || router.pathname == `/psychiatrist/[psychiatrist_id]/psych_dashboard` ? 'underline-offset-1 custom-active' : ''}`}>
                {/* A link to the psychiatrist's dashboard */}
                <Link href={`/${user.userType}/${user.uid}/psych_dashboard`} className="flex justify-start">
                  <div className="text-[18px] text-[#195BA5]">My Dashboard</div>
                </Link>
              </li>
              : <div></div>
            : <div></div>}
        </ul>
      </div>

      <div className="flex justify-center md:justify-end items-center">
        <ul className="menu flex flex-col-reverse md:flex-row px-1 gap-5">
          {!user &&
            <li className={`${router.pathname === '/discover' ? 'underline-offset-1 custom-active' : ''}`}>
              {/* A link to the user's discover page */}
              <Link href={`/discover`} className="w-full">
                <div className="text-right text-[18px] text-[#195BA5]">Discover Professionals</div>
              </Link>
            </li>}
          {user && user.userType == "patient" &&
            <li className={`${router.pathname === '/discover' || router.pathname == `/patient/[patient_id]/discover` ? 'underline-offset-1 custom-active' : ''}`}>
              {/* A link to the user's discover page */}
              <Link href={`/${user?.userType}/${user?.uid}/discover`} className="flex w-full justify-end">
                <div className="text-right text-[18px] text-[#195BA5]">Discover Professionals</div>
              </Link>
            </li>}

          {user && (user.userType == "patient" || user.userType == "psychiatrist") ?
            <li className={`${router.pathname === '/messages' || router.pathname == `/patient/[patient_id]/messages` || router.pathname == `/psychiatrist/[psychiatrist_id]/messages` ? 'underline-offset-1 custom-active' : ''}`}>
              {/* A link to the user's messages */}
              <Link href={`/${user.userType}/${user.uid}/messages`} className="flex w-full justify-end">
                <div className="text-[18px] text-[#195BA5]">Messages</div>
              </Link>
            </li>
            :
            <div></div>}

          {!user || (user.userType == "patient" || user.userType == "psychiatrist") ?
            <li className={`${router.pathname === '/about' ? 'underline-offset-1 custom-active' : ''}`}>
              <Link href="https://www.wohohiame.com/" className="flex w-full justify-end">
                <div className="text-[18px] text-[#195BA5]">About</div>
              </Link>
            </li>
            : <div></div>}

          {user && user.userType == "admin" ?
            <>
              <li className={`${router.pathname === '/database' ? 'underline-offset-1 custom-active' : ''}`}>
                <Link href={`/${user?.userType}/${user?.uid}/database`} className="flex w-full justify-end">
                  <div className="text-[18px] text-[#195BA5]">Database</div>
                </Link>
              </li><li className={`${router.pathname === '/analytics' ? 'underline-offset-1 custom-active' : ''}`}>
                {/* Update this href to go to the analytics page */}
                <Link href="https://www.wohohiame.com/" className="flex w-full justify-end">
                  <div className="text-[18px] text-[#195BA5]">Analytics</div>
                </Link>
              </li>
              <li className={`${router.pathname === '/reports' ? 'underline-offset-1 custom-active' : ''}`}>
                {/* Update this href to go to the reports page */}
                <Link href="https://www.wohohiame.com/" className="flex w-full justify-end">
                  <div className="text-[18px] text-[#195BA5]">Reports</div>
                </Link>
              </li>
            </>
            : <></>}


          {!user ? <li className={`${router.pathname === '/questionnaire' ? 'underline-offset-1 custom-active' : ''}`}>
            <Link href="/questionnaire" className="flex w-full justify-end">
              <div className="text-[18px] text-[#195BA5]">Sign Up</div>
            </Link>
          </li> : <></>}

          {
            user ?
              <div className="flex dropdown dropdown-hover dropdown-bottom dropdown-end justify-end">
                <div tabIndex={0} className={`btn btn-circle bg-[${colors.okb_blue}] text-[18px] font-normal`}>{user.displayName?.charAt(0)}</div>
                <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52">
                  <div style={{ width: '100%', height: '100%', paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8, background: 'white', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 48, display: 'inline-flex' }}>
                    {user.userType == "patient" ?
                      <><Link href={`/patient/${user.uid}/edit_profile`} className={`text-[18px] font-normal`} style={{ color: '#195BA5', wordWrap: 'break-word' }}>Edit Profile</Link>
                        <Link href={`/patient/${user?.uid}/report_history`} className={`text-[18px] font-normal`} style={{ color: '#195BA5', wordWrap: 'break-word' }}>Report History</Link></> : user.userType == "psychiatrist" ?
                        <Link href={`/psychiatrist/${user.uid}/edit_psych`} className={`text-[18px] font-normal`} style={{ color: '#195BA5', wordWrap: 'break-word' }}>Edit Profile</Link> : <></>}
                    <div onClick={logout} style={{ justifyContent: 'center', alignItems: 'center', display: 'inline-flex', gap: '15px', cursor: 'pointer' }}>
                      <div className={`text-[18px] font-normal`} style={{ textAlign: 'center', color: '#A52119', wordWrap: 'break-word' }}>Log Out</div><Logout />
                    </div>
                  </div>
                </ul>
              </div> :
              <li>
                <div className="flex justify-end">
                  <button
                    className="w-[104px] h-8 py-1.5 bg-sky-700 rounded-[10px] border-2 border-sky-700 justify-center items-center flex text-white"
                    onClick={() => logInWithGoogle()}>
                    <div className="text-[18px] font-[600]">Log In</div>
                  </button>
                </div>
              </li>
          }
        </ul>
      </div>
    </div>
  )
}


export default Navbar;