import { ReactNode } from 'react';
import Navbar from '@/components/navbar/Navbar';

type LayoutProps = {
  children: ReactNode;
  showNavbar?: boolean;
};

const Layout = ({ children, showNavbar = true }: LayoutProps) => {
  return (
    <>
      {showNavbar && <Navbar />}
      <div>{children}</div>
    </>
  );
};

export default Layout;
