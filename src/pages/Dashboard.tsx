
import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, Calendar, Edit, User, Settings, List } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import DashboardOverview from '../components/dashboard/DashboardOverview';
import MyBookings from '../components/dashboard/MyBookings';
import MyTours from '../components/dashboard/MyTours';
import Profile from '../components/dashboard/Profile';
import AccountSettings from '../components/dashboard/AccountSettings';

const Dashboard = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  
  // Check if the current user is a tourist or agency (in a real app, this would come from auth context)
  // For demo purposes, we'll just assume user is a tourist if path includes "bookings", otherwise agency
  const userType = location.pathname.includes('bookings') ? 'tourist' : 'agency';
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <div className="flex h-full">
      {/* Mobile sidebar toggle button */}
      {isMobile && (
        <button
          className="fixed bottom-4 right-4 z-30 p-3 rounded-full bg-primary text-white shadow-lg"
          onClick={toggleSidebar}
        >
          <List className="h-6 w-6" />
        </button>
      )}
      
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-20 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto w-64 bg-gray-100 px-4 pt-20 pb-6 border-r border-gray-200 overflow-y-auto`}>
        <div className="flex flex-col h-full">
          <div>
            <h2 className="text-lg font-bold mb-6">{userType === 'tourist' ? 'Tourist Dashboard' : 'Agency Dashboard'}</h2>
            <nav className="space-y-1">
              <Link 
                to="/dashboard" 
                className={`flex items-center px-3 py-2 rounded-md ${location.pathname === '/dashboard' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-200'}`}
              >
                <Home className="h-5 w-5 mr-2" />
                <span>Overview</span>
              </Link>
              
              {userType === 'tourist' ? (
                <Link 
                  to="/dashboard/bookings" 
                  className={`flex items-center px-3 py-2 rounded-md ${location.pathname.includes('/dashboard/bookings') ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-200'}`}
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>My Bookings</span>
                </Link>
              ) : (
                <Link 
                  to="/dashboard/tours" 
                  className={`flex items-center px-3 py-2 rounded-md ${location.pathname.includes('/dashboard/tours') ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-200'}`}
                >
                  <Edit className="h-5 w-5 mr-2" />
                  <span>My Tours</span>
                </Link>
              )}
              
              <Link 
                to="/dashboard/profile" 
                className={`flex items-center px-3 py-2 rounded-md ${location.pathname.includes('/dashboard/profile') ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-200'}`}
              >
                <User className="h-5 w-5 mr-2" />
                <span>Profile</span>
              </Link>
              
              <Link 
                to="/dashboard/settings" 
                className={`flex items-center px-3 py-2 rounded-md ${location.pathname.includes('/dashboard/settings') ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-200'}`}
              >
                <Settings className="h-5 w-5 mr-2" />
                <span>Settings</span>
              </Link>
            </nav>
          </div>
          <div className="mt-auto pt-4">
            <div className="bg-gray-200 rounded-md p-4">
              <h3 className="font-medium text-gray-700 mb-1">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-2">Contact our support team for assistance.</p>
              <button className="w-full bg-white text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-50 transition">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex-1 min-w-0">
        <Routes>
          <Route path="/" element={<DashboardOverview />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="/tours" element={<MyTours />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<AccountSettings />} />
        </Routes>
      </div>
      
      {/* Overlay to close sidebar on mobile */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 z-10 bg-black bg-opacity-30" 
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Dashboard;
