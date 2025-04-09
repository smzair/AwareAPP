import React from 'react';
import { Link, useLocation } from 'wouter';
import { 
  BarChart3, 
  Monitor, 
  PuzzleIcon, 
  ShieldCheck, 
  ClipboardCheck, 
  Settings,
  HelpCircle,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { userData } from '@/data/mockData';

const navItems = [
  { path: '/', label: 'Dashboard', icon: <BarChart3 className="h-6 w-6" /> },
  { path: '/digital-footprint', label: 'Digital Footprint', icon: <Monitor className="h-6 w-6" /> },
  { path: '/ad-predictions', label: 'Ad Predictions', icon: <PuzzleIcon className="h-6 w-6" /> },
  { path: '/privacy', label: 'Privacy', icon: <ShieldCheck className="h-6 w-6" /> },
  { path: '/goals', label: 'Goals', icon: <ClipboardCheck className="h-6 w-6" /> },
  { path: '/settings', label: 'Settings', icon: <Settings className="h-6 w-6" /> },
];

type SidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const [location] = useLocation();

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 z-40 bg-gray-600 bg-opacity-75" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 flex flex-col z-50 transition duration-300 transform bg-white md:relative md:translate-x-0 border-r border-gray-200 w-64 md:w-72",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="pt-5 pb-4 flex flex-col flex-shrink-0">
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center">
              <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary text-white">
                <Zap className="h-6 w-6" />
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">Aware</span>
            </div>
            <button 
              type="button" 
              className="md:hidden" 
              onClick={() => setSidebarOpen(false)}
            >
              <svg className="h-6 w-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="px-4 mt-6">
            <span className="flex items-center">
              <img 
                className="h-8 w-8 rounded-full object-cover" 
                src={userData.avatar} 
                alt="User profile"
              />
              <span className="ml-2 text-sm font-medium text-gray-700">
                {userData.displayName}
              </span>
            </span>
            <span className="block mt-1 text-xs text-gray-500">
              Last sync: {userData.lastSyncDate.toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
              })}
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-2 flex-1 px-2 bg-white space-y-1 overflow-y-auto scrollbar-hide">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <a
                className={cn(
                  "group flex items-center px-2 py-2 text-base font-medium rounded-md",
                  location === item.path 
                    ? "bg-primary bg-opacity-10 text-primary" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <span className={cn(
                  "mr-4",
                  location === item.path ? "text-primary" : "text-gray-400"
                )}>
                  {item.icon}
                </span>
                {item.label}
              </a>
            </Link>
          ))}
        </nav>

        <div className="border-t border-gray-200 p-4">
          <a href="#" className="flex items-center text-sm font-medium text-primary hover:text-primary-dark">
            <HelpCircle className="h-5 w-5 mr-2" />
            Help & Resources
          </a>
        </div>
      </div>
    </>
  );
}
