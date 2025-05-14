
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import TourPackages from './pages/TourPackages';
import TourDetails from './pages/TourDetails';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './components/Footer';
import { Toaster } from './components/ui/sonner';
import './App.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen pt-16 pb-10 px-4 sm:px-6 md:px-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tours" element={<TourPackages />} />
          <Route path="/tours/:id" element={<TourDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </div>
      <Footer />
      <Toaster />
    </Router>
  );
};

export default App;
