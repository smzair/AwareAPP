import React from 'react';
import { Bell, Search } from 'lucide-react';
import { userData } from '@/data/mockData';

type HeaderProps = {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Header({ setSidebarOpen }: HeaderProps) {
  return (
    <div className="relative flex-shrink-0 flex h-16 bg-white border-b border-gray-200">
      <button 
        type="button" 
        className="px-4 border-r border-gray-200 text-gray-500 md:hidden" 
        onClick={() => setSidebarOpen(true)}
      >
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      
      <div className="flex-1 px-4 flex justify-between">
        <div className="flex-1 flex items-center">
          <div className="w-full max-w-2xl">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                type="search" 
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm" 
                placeholder="Search your digital activity..." 
              />
            </div>
          </div>
        </div>
        
        <div className="ml-4 flex items-center md:ml-6">
          <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
            <Bell className="h-6 w-6" />
          </button>

          <div className="ml-3 relative">
            <button type="button" className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none">
              <img 
                className="h-8 w-8 rounded-full object-cover" 
                src={userData.avatar} 
                alt="User profile" 
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
