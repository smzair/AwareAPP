import React from 'react';
import { Bell, Search, LogIn, LogOut, User } from 'lucide-react';
import { userData } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';

type HeaderProps = {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Header({ setSidebarOpen }: HeaderProps) {
  const [location, setLocation] = useLocation();
  const { user, logout } = useAuth();
  const isLoggedIn = !!user;

  const handleAuth = () => {
    if (isLoggedIn) {
      logout();
    } else {
      setLocation('/auth');
    }
  };

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
          {/* Notification bell */}
          <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
            <Bell className="h-6 w-6" />
          </button>

          {/* Login/Logout button */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="ml-3 flex items-center"
            onClick={handleAuth}
          >
            {isLoggedIn ? (
              <>
                <LogOut className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Logout</span>
              </>
            ) : (
              <>
                <LogIn className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Login</span>
              </>
            )}
          </Button>

          {/* User profile */}
          <div className="ml-3 relative">
            {isLoggedIn && user ? (
              <div className="flex items-center">
                <div className="mr-2 text-sm font-medium text-gray-700">
                  {user.displayName || user.username}
                </div>
                <button type="button" className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none">
                  {user.avatar ? (
                    <img 
                      className="h-8 w-8 rounded-full object-cover" 
                      src={user.avatar} 
                      alt={`${user.username}'s profile`} 
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                  )}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
