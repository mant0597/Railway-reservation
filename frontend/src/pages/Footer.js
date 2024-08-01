import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer bg-light text-center py-3">
      <h4>All Rights Reserved &copy; Railway Reservation</h4>
      <p>
        <Link to="/about">About</Link> | <Link to="/contact">Contact</Link> |{' '}
        <Link to="/policy">Privacy Policy</Link>
      </p>
    </div>
  );
};

export default Footer;
