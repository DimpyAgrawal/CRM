import React from 'react';
import { BellIcon, UserCircle } from 'lucide-react';

const Header = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 fixed top-0 right-0 left-64 z-10">
      <div className="h-full px-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-full relative">
            <BellIcon className="w-6 h-6 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="flex items-center space-x-2 hover:bg-gray-100 rounded-lg p-2">
            <UserCircle className="w-6 h-6 text-gray-600" />
            <span className="text-sm text-gray-600">Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;