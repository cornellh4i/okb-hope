import { logout, logInWithGoogle } from "../../../firebase/firebase";
import { useAuth } from "../../../contexts/AuthContext";
import Link from "next/link";
import Logo from '@/assets/logo.svg'
import colors from "@/colors";
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from "react";
import Logout from "@/assets/logout.svg";
import { MenuIcon, XIcon } from '@heroicons/react/outline';

const Navbar = () => {
  const { user } = useAuth();
  const router = useRouter();

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const profileButtonRef = useRef<HTMLButtonElement>(null);
  const profileMenuRef = useRef<HTMLUListElement>(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setProfileMenuOpen(false);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && !menuRef.current.contains(event.target) &&
        menuButtonRef.current && !menuButtonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }

      if (
        profileMenuRef.current && !profileMenuRef.current.contains(event.target) &&
        profileButtonRef.current && !profileButtonRef.current.contains(event.target)
      ) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);



  return (
    <div className={`flex flex-row justify-between items-center w-full px-1 xs:px-2 md:px-4 bg-[${colors.white}] shadow-navbar-shadow z-50`}>
      <div className="flex justify-start items-center gap-8 flex h-full">
        <ul className="menu menu-horizontal gap-2 sm:gap-5 items-center h-full">
          <Link href="/" className="flex justify-start py-2 h-full">
            <Logo />
          </Link>
          {user ? user.userType == "patient" ?
            <li className={`h-full items-center ${router.pathname === '/dashboard' || router.pathname == `/patient/[patient_id]/dashboard` ? 'underline-offset-1 custom-active' : ''}`}>
              {/* A link to the patient's dashboard */}
              <Link href={`/${user.userType}/${user.uid}/dashboard`} className="flex justify-start h-full items-center ">
                <div className="text-[18px] text-[#195BA5] font-montserrat font-medium">My Dashboard</div>
              </Link>
            </li>
            : user.userType == "psychiatrist" ?
              <li className={`h-full ${router.pathname === '/psych_dashboard' || router.pathname == `/psychiatrist/[psychiatrist_id]/psych_dashboard` ? 'underline-offset-1 custom-active' : ''}`}>
                {/* A link to the psychiatrist's dashboard */}
                <Link href={`/${user.userType}/${user.uid}/psych_dashboard`} className="flex justify-start h-full">
                  <div className="text-[18px] text-[#195BA5] font-montserrat font-medium">My Dashboard</div>
                </Link>
              </li>
              : <></>
            : <></>}
        </ul>
      </div>

      <div className="flex justify-center lg:justify-end items-center relative gap-2 sm:gap-5 h-full">
        <div className="lg:hidden flex justify-end w-full px-4">
          <button ref={menuButtonRef} onClick={toggleMenu} className="focus:outline-none">
            <MenuIcon className="h-6 w-6 text-[#195BA5]" />
          </button>
        </div>
        <ul
          ref={menuRef}
          className={`menu flex-col lg:flex-row lg:flex gap-5 ${menuOpen ? 'flex' : 'hidden h-full'
            } lg:flex absolute lg:relative top-[65px] lg:top-0 right-[68px] 
            lg:right-auto w-[160px] lg:w-auto bg-white lg:bg-transparent shadow lg:shadow-none z-50 items-center`}
        >
          {!user && (
            <li
              className={`h-full ${router.pathname === '/discover' ? 'underline-offset-0 custom-active' : ''
                }`}
            >
              <Link href={`/discover`} className="w-full h-full">
                <div className="text-center lg:text-right text-[18px] text-[#195BA5] font-montserrat font-medium">
                  Discover Professionals
                </div>
              </Link>
            </li>
          )}
          {user && user.userType === 'patient' && (
            <li
              className={`h-full ${router.pathname === '/discover' || router.pathname === `/patient/[patient_id]/discover`
                ? 'underline-offset-1 custom-active'
                : ''
                }`}
            >
              <Link href={`/${user?.userType}/${user?.uid}/discover`} className="flex w-full justify-end h-full">
                <div className="text-center lg:text-right text-[18px] text-[#195BA5] font-montserrat font-medium">
                  Discover Professionals
                </div>
              </Link>
            </li>
          )}
          {user && (user.userType === 'patient' || user.userType === 'psychiatrist') ? (
            <li
              className={`h-full ${router.pathname === '/messages' ||
                router.pathname === `/patient/[patient_id]/messages` ||
                router.pathname === `/psychiatrist/[psychiatrist_id]/messages`
                ? 'underline-offset-1 custom-active'
                : ''
                }`}
            >
              <Link href={`/${user.userType}/${user.uid}/messages`} className="flex w-full justify-center lg:justify-end h-full">
                <div className="text-[18px] text-[#195BA5] font-montserrat font-medium">Messages</div>
              </Link>
            </li>
          ) : (
            <></>
          )}
          {!user || (user.userType === 'patient' || user.userType === 'psychiatrist') ? (
            <li className={`h-full ${router.pathname === '/about' ? 'underline-offset-1 custom-active' : ''}`}>
              <Link href="https://www.wohohiame.org/about-us" className="flex w-full justify-center lg:justify-end h-full">
                <div className="text-[18px] text-[#195BA5] font-montserrat font-medium">About</div>
              </Link>
            </li>
          ) : (
            <></>
          )}
          {user && user.userType === 'admin' ? (
            <>
              <li className={`h-full ${router.pathname === '/database' || router.pathname === `/admin/[admin_id]/database` ? 'underline-offset-1 custom-active' : ''}`}>
                <Link href={`/admin/${user?.uid}/database`} className="flex w-full justify-center lg:justify-end h-full">
                  <div className="text-[18px] text-[#195BA5] font-montserrat font-medium">Database</div>
                </Link>
              </li>
              <li className={`h-full ${router.pathname === '/data-analytics' || router.pathname === `/admin/[admin_id]/data-analytics` ? 'underline-offset-1 custom-active' : ''}`}>
                <Link href={`/admin/${user?.uid}/data-analytics`} className="flex w-full justify-center lg:justify-end h-full">
                  <div className="text-[18px] text-[#195BA5] font-montserrat font-medium">Analytics</div>
                </Link>
              </li>
              <li className={`h-full ${router.pathname === '/admin_reports' || router.pathname === `/admin/[admin_id]/admin_reports` ? 'underline-offset-1 custom-active' : ''}`}>
                <Link href={`/admin/${user?.uid}/admin_reports`} className="flex w-full justify-center lg:justify-end h-full">
                  <div className="text-[18px] text-[#195BA5] font-montserrat font-medium">Reports</div>
                </Link>
              </li>
            </>
          ) : (
            <></>
          )}
          {!user ? (
            <li className={`h-full ${router.pathname === '/questionnaire' ? 'underline-offset-1 custom-active' : ''}`}>
              <Link href="/questionnaire" className="flex w-full justify-center lg:justify-end h-full">
                <div className="text-[18px] text-[#195BA5] font-montserrat font-medium">Sign Up</div>
              </Link>
            </li>
          ) : (
            <></>
          )}
        </ul>
        {user ? (
          <div className="relative flex justify-end">
            <div className="dropdown dropdown-end">
              <button
                ref={profileButtonRef}
                onClick={toggleProfileMenu}
                tabIndex={0}
                className={`btn btn-circle bg-[${colors.okb_blue}] text-[18px] font-normal`}
              >
                {user.displayName?.charAt(0)}
              </button>
              <ul
                ref={profileMenuRef}
                tabIndex={0}
                className={`${profileMenuOpen ? 'block' : 'hidden'
                  } absolute right-0 menu p-2 shadow bg-base-100 top-[49px] w-52 mt-2 m1-5 absolute right-0`}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingTop: 8,
                    paddingBottom: 8,
                    background: 'white',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 48,
                    display: 'inline-flex',
                  }}
                >
                  {user.userType === 'patient' ? (
                    <>
                      <Link
                        href={`/patient/${user.uid}/edit_profile`}
                        className={`text-[18px] font-normal font-montserrat`}
                        style={{ color: '#195BA5', wordWrap: 'break-word' }}
                      >
                        Edit Profile
                      </Link>
                      <Link
                        href={`/patient/${user?.uid}/report_history`}
                        className={`text-[18px] font-normal font-montserrat`}
                        style={{ color: '#195BA5', wordWrap: 'break-word' }}
                      >
                        Report History
                      </Link>
                    </>
                  ) : user.userType === 'psychiatrist' ? (
                    <Link
                      href={`/psychiatrist/${user.uid}/edit_psych`}
                      className={`text-[18px] font-normal font-montserrat`}
                      style={{ color: '#195BA5', wordWrap: 'break-word' }}
                    >
                      Edit Profile
                    </Link>
                  ) : (
                    <></>
                  )}
                  <div
                    onClick={logout}
                    style={{ justifyContent: 'center', alignItems: 'center', display: 'inline-flex', gap: '15px', cursor: 'pointer' }}
                  >
                    <div
                      className={`text-[18px] font-normal font-montserrat`}
                      style={{ textAlign: 'center', color: '#A52119', wordWrap: 'break-word' }}
                    >
                      Log Out
                    </div>
                    <Logout />
                  </div>
                </div>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex justify-end">
            <button
              className="w-[104px] h-8 py-1.5 bg-sky-700 rounded-[10px] border-2 border-sky-700 justify-center items-center flex text-white"
              onClick={() => logInWithGoogle()}
            >
              <div className="text-[18px] font-montserrat font-bold">Log In</div>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}


export default Navbar;
