import { logout, signInWithGoogle } from "../../../backend/firebase/firebase";
import Link from 'next/link';

export default function Navbar() {
  return (
    <header>
      <nav className="">
        <div className="navbar bg-base-300">
          <div className="flex-1">
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li><Link href="/About-Us" className="">About Us</Link></li>
              <li><button className="btn w-24 rounded-full bg-base-100">Login</button></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}
