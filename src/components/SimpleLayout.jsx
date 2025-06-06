import React from 'react';
import { Outlet } from 'react-router-dom';

const SimpleLayout = () => {
  return (
    <div className="app-container min-h-screen flex flex-col">
      <header className="bg-primary-blue text-white p-4">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-xl font-bold">简化版导航栏</h1>
        </div>
      </header>
      <main className="flex-grow max-w-screen-xl mx-auto px-4 w-full py-6">
        <Outlet />
      </main>
      <footer className="bg-neutral-darkest text-white p-4">
        <div className="max-w-screen-xl mx-auto text-center">
          <p>简化版页脚</p>
        </div>
      </footer>
    </div>
  );
};

export default SimpleLayout; 