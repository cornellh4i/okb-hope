import { logout, signInWithGoogle } from "../../../firebase/firebase";
import { useAuth } from "../../../contexts/AuthContext";
import Link from "next/link";

export default function Navbar() {
  const { user } = useAuth();
  return (
    <header>
      <nav className="">
        <div className="navbar flex bg-[#C1C1C1] items-end">
          <div className="flex-1"></div>
          <ul className="menu menu-horizontal px-1 gap-5">
            <li>
              <Link href="/about" className="w-18">
                <div className="">About Us</div>
              </Link>
            </li>
            <li>
              {user ? 
              <button
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
              </button>}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}