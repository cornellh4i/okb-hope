import { logout, signInWithGoogle } from "../../../firebase/firebase";
import { useAuth } from "../../../contexts/AuthContext";
import Link from "next/link";
import wohohiame_logo from '../../assets/wohohiame_logo.svg';

export default function Navbar() {
  const { user } = useAuth();
  return (
    <header>
      <nav className="">
        <div className="navbar flex bg-[#C1C1C1] items-end">
          <div className="flex-1">
            <a className="btn btn-ghost normal-case text-xl">
              <img src={wohohiame_logo} />
            </a>
          </div>
          <div className="flex-1"></div>
          <ul className="menu menu-horizontal px-1 gap-5">
            <li>
              <Link href="/bookings" className="w-18">
                <div className="">Discover Professionals</div>
              </Link>
            </li>
            <li>
              <Link href="/bookings" className="w-18">
                <div className="">Messages</div>
              </Link>
            </li>
            <li>
              <Link href="/bookings" className="w-18">
                <div className="">About Us</div>
              </Link>
            </li>
            <li>
              {user ?
                <div className="dropdown dropdown-hover">
                  <label tabIndex={0} className="btn btn-circle">Profile</label>
                  <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a>Edit Profile</a></li>
                    <li><a onClick={logout}>Log out</a></li>
                  </ul>
                </div> :
                <div className="dropdown dropdown-hover">
                  <label tabIndex={0} className="btn btn-circle">Profile</label>
                  <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    {/* <li><a>Edit Profile</a></li> */}
                    <li><a onClick={signInWithGoogle}>Log in</a></li>
                  </ul>
                </div>
              }


              {/* <button
                  className="btn bg-[#E6E6E6] btn-ghost glass w-18 rounded-full bg-base-100"
                  onClick={logout}
                >
                  Logout
                </button> :
                <button
                  className="btn bg-[#E6E6E6] btn-ghost glass w-18 rounded-full bg-base-100"
                  onClick={signInWithGoogle}
                >
                  Login
                </button>} */}
            </li>
          </ul>
        </div>
      </nav >
    </header >
  );
}