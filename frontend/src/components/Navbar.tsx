import { logout, signInWithGoogle } from "../../firebase/firebase";
import { useAuth } from "../../contexts/AuthContext";
import Link from "next/link";
import Logo from '@/assets/logo.svg'
import colors from "@/colors";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header>
      <nav className="">
        <div className={` flex bg-[${colors.dark_gray}] items-end`}>
          {/* logo for website */}
          <Logo />
          <div className="flex-1"></div>
          <ul className="menu menu-horizontal px-1 gap-5">
            <li>
              <Link href="/discover" className="w-18">
                <div className="text-[18px] font-[500]">Discover Professionals</div>
              </Link>
            </li>
            <li>
              <Link href="/messages" className="w-18">
                <div className="text-[18px] font-[500]">Messages</div>
              </Link>
            </li>
            <li>
              <Link href="/about" className="w-18">
                <div className="text-[18px] font-[500]">About Us</div>
              </Link>
            </li>
            <li>
              {user ?
                <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
                  <div tabIndex={0} className="btn btn-circle"></div>
                  <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52">
                    <Link href="edit_profile">
                      <li>Edit Profile</li>
                    </Link>
                    <button onClick={logout}>
                      <li>Log Out</li>
                    </button>
                  </ul>
                </div> :
                <button
                  className="btn bg-[#195BA5] btn-ghost w-18 rounded-full bg-base-100 text-white"
                  onClick={() => signInWithGoogle()}
                >
                  Log In
                </button>}
            </li>
          </ul>
        </div>
      </nav>
    </header>

  )
}

export default Navbar;

