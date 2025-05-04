import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="max-w-5xl mx-auto font-poppins min-h-screen flex flex-col">

      <Navbar />

      <main className="flex-grow">{children}</main>

      <Footer />
      
    </div>
  );
};

export default Layout;
