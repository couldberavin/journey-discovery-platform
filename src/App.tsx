
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import TourPackages from './pages/TourPackages';
import BookTour from './pages/BookTour';
import Feedback from './pages/Feedback';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Footer from './components/Footer';
import { Toaster } from './components/ui/sonner';
import TourManagement from './components/dashboard/TourManagement';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen pt-16 pb-10 px-4 sm:px-6 md:px-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tours" element={<TourPackages />} />
          <Route path="/book" element={<BookTour />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/tours" element={<TourManagement />} />
        </Routes>
      </div>
      <Footer />
      <Toaster />
    </Router>
  );
};

export default App;
