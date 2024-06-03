import { ReactNode } from 'react';
import Navbar from '@/components/navbar/Navbar';
import Footer from './Footer';

type LayoutProps = {
  children: ReactNode;
  showNavbar?: boolean;
};

const Layout = ({ children, showNavbar = true }: LayoutProps) => {
  return (
    <>
      <div className='h-screen flex flex-col'>
        {showNavbar && <Navbar />}
        <div className='flex-grow'>
          <div className='z-0 items-start'>{children}</div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
