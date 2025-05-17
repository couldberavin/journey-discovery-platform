
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  
  // Check if we're on a dashboard path
  const isDashboardPath = location.pathname.startsWith('/dashboard');

  return (
    <nav className="bg-white shadow-md fixed w-full z-20 top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-lg font-bold text-primary">TourismApp</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            <Link to="/" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/') ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}>
              Home
            </Link>
            <Link to="/tours" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/tours') ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}>
              Tour Packages
            </Link>
            <Link to="/book" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/book') ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}>
              Book a Tour
            </Link>
            <Link to="/feedback" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/feedback') ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}>
              Feedback
            </Link>
            <Link to="/login" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/login') ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}>
              Login/Register
            </Link>
            
            {/* Dashboard dropdown with submenu */}
            <div className="relative group">
              <Link 
                to="/dashboard" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${isDashboardPath ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}
              >
                Dashboard
              </Link>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block z-50">
                <div className="py-1">
                  <Link 
                    to="/dashboard" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Overview
                  </Link>
                  <Link 
                    to="/dashboard/tours" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Manage Tours
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/') ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/tours" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/tours') ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Tour Packages
            </Link>
            <Link 
              to="/book" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/book') ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Book a Tour
            </Link>
            <Link 
              to="/feedback" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/feedback') ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Feedback
            </Link>
            <Link 
              to="/login" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/login') ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Login/Register
            </Link>
            
            {/* Mobile Dashboard links */}
            <Link 
              to="/dashboard" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/dashboard') ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/dashboard/tours" 
              className={`block px-3 py-2 rounded-md text-base font-medium ml-4 ${isActive('/dashboard/tours') ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Manage Tours
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
