import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex">
      {/* Sol fotoğraf */}
      <div className="w-20 h-screen sticky top-0 hidden md:block">
        <img
          src="/solfoto.png"
          alt="Sol Taraf Fotografi"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Ana içerik */}
      <div className="flex-1 max-w-5xl mx-auto font-poppins min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>

      {/* Sağ fotoğraf */}
      <div className="w-20 h-screen sticky top-0 hidden md:block">
        <img
          src="/sagfoto.png" 
          alt="Sag Taraf Fotografi"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Layout;
