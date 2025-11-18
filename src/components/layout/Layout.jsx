import React from 'react';
import Footer from '../footer/Footer';
import Header from '../header/Header';

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20 pb-20 md:pb-0">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;