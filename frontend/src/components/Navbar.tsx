import { logout, signInWithGoogle } from '../../firebase/firebase';
import { useAuth } from '../../contexts/AuthContext';
import Link from 'next/link';
import Logo from '../assets/logo.svg';
import colors from '@/colors';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header>
      <nav className="">
        <div className={`navbar flex bg-[${colors.white}] items-end`}>
          <Logo />
          <div className="flex-1"></div>
          <ul className="menu menu-horizontal px-1 flex space-x-5">
            <li>
              <Link href="/discover" className="w-18">
                <div className="text-[18px] font-[500]">Discover Professionals</div>
              </Link>
            </li>
            {user && (
              <li>
                <Link href="/messages" className="w-18">
                  <div className="text-[18px] font-[500]">Messages</div>
                </Link>
              </li>
            )}
            <li>
              <Link href="/about" className="w-18">
                <div className="text-[18px] font-[500]">About</div>
              </Link>
            </li>
            <li>
              {user ? (
                <button
                  className="btn bg-[#195BA5] btn-ghost w-18 rounded-full bg-base-100 text-white"
                  onClick={logout}
                >
                  Log Out
                </button>
              ) : (
                <button
                  className="btn bg-[#195BA5] btn-ghost w-18 rounded-full bg-base-100 text-white"
                  onClick={() => signInWithGoogle()}
                >
                  Log In
                </button>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
    
  );
}

export default Navbar;