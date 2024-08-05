import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center">About Us</h1>
      <p className="mt-4">
        Welcome to M-rail, your one-stop solution for all your railway reservation needs. Our platform is designed to provide a seamless and efficient way to book and manage your train tickets with just a few clicks.
      </p>
      <p>
        At MMJ-Train, we strive to offer the best user experience by integrating advanced technology and user-friendly features. Our system allows you to:
      </p>
      <ul>
        <li>Search and book train tickets easily.</li>
        <li>View and manage your reservations.</li>
        <li>Access information about trains and stations.</li>
        <li>Cancel reservations if needed.</li>
      </ul>
      <p>
        Our team is dedicated to ensuring that your journey is as smooth and pleasant as possible. We continuously work on improving our services and features based on your feedback and suggestions.
      </p>
      <p>
        If you have any questions or need assistance, feel free to <Link to="/contact">contact us</Link>. We are here to help!
      </p>
    </div>
  );
};

export default AboutPage;
