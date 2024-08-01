import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const HomePage = () => {
  return (
    <div>
      <Header />
      <div className="container mt-5">
        <h1 className="text-center">Welcome to Railway Reservation System</h1>
        <p className="text-center mt-3">
          Your one-stop solution for booking train tickets, checking schedules, and more.
        </p>
        <div className="d-flex justify-content-center mt-4">
          <Link to="/register" className="btn btn-primary mx-2">
            Sign Up
          </Link>
          <Link to="/login" className="btn btn-secondary mx-2">
            Sign In
          </Link>
          <Link to="/trains" className="btn btn-success mx-2">
            Check Trains
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
