import { logout, signInWithGoogle } from "../../firebase/firebase";
import { useAuth } from "../../contexts/AuthContext";
import Link from "next/link";
import Logo from '@/assets/logo.svg'
import colors from "@/colors";
import { useRouter } from 'next/router';

const Navbar = () => {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div className={`flex p-2.5 bg-[${colors.dark_gray}] items-end`}>

      <div className="justify-start items-center gap-8 flex ml-2">
        <ul className="menu menu-horizontal px-1 gap-5">
          <Link href="/" className="w-18">
            <Logo />
          </Link>
          {user ? <li className={`${router.pathname === '/dashboard' ? 'underline-offset-1 custom-active' : ''}`}>
            <Link href="/dashboard" className="w-18">
              <div className="text-[18px] text-[#195BA5]">My Dashboard</div>
            </Link>
          </li> : <div></div>}
        </ul>
      </div>

      <div className="flex-1"></div>
      <ul className="menu menu-horizontal px-1 gap-5">
        <li className={`${router.pathname === '/discover' ? 'underline-offset-1 custom-active' : ''}`}>
          <Link href="/discover" className="w-18">
            <div className="text-[18px] text-[#195BA5]">Discover Professionals</div>
          </Link>
        </li>

        {user ? <li className={`${router.pathname === '/messages' ? 'underline-offset-1 custom-active' : ''}`}>
          <Link href="/messages" className="w-18">
            <div className="text-[18px] text-[#195BA5]">Messages</div>
          </Link>
        </li> : <div></div>}

        <li className={`${router.pathname === '/about' ? 'underline-offset-1 custom-active' : ''}`}>
          <Link href="/about" className="w-18">
            <div className="text-[18px] text-[#195BA5]">About Us</div>
          </Link>
        </li>

        {
          user ? <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
            <div tabIndex={0} className={`btn btn-circle bg-[${colors.okb_blue}]`}></div>
            <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52">
              <Link href="edit_profile">
                <li>Edit Profile</li>
              </Link>
              <button onClick={logout}>
                <li>Log Out</li>
              </button>
            </ul>
          </div> : <li>
            <div className="flex justify-center items-center">
              <button
                className="w-[104px] h-8 py-1.5 bg-sky-700 rounded-[10px] border-2 border-sky-700 justify-center items-center flex text-white"
                onClick={() => signInWithGoogle()}
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