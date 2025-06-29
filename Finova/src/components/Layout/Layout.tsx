import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-950">
      <Sidebar />
      <TopBar />
      <main className="ml-70 mt-16 p-6">
        <Outlet />
      </main>
    </div>
  );
};