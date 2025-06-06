import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="app-container min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow max-w-screen-xl mx-auto px-4 w-full py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 