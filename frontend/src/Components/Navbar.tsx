import { logout, signInWithGoogle } from "../../../backend/firebase/firebase";
import { useAuth } from "../../contexts/AuthContext";
import Link from "next/link";

export default function NavBar() {
  const { isAuthenticated } = useAuth();
  return (
    <header>
      <nav className="">
        <div className="navbar bg-[#C1C1C1]">
          <div className="flex-1"></div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link href="/About-Us" className="">
                  <div className="">About Us</div>
                </Link>
              </li>
              <li>
                <button
                  className="btn bg-[#E6E6E6] btn-ghost glass w-24 rounded-full bg-base-100"
                  onClick={signInWithGoogle}
                >
                  Login
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
