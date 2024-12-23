import React from 'react';
import { FC } from 'react';
import { Link } from 'react-router-dom';

const Navbar: FC = () => {
  return (
    <nav className="bg-primary text-white p-4 flex justify-between items-center shadow-md">
      <div className="text-lg font-bold">
        <Link to="/">ParkingSpot Finder</Link>
      </div>
      <div className="space-x-4">
        <Link to="/" className="hover:text-secondary">Home</Link>
        <Link to="/about" className="hover:text-secondary">About</Link>
      </div>
    </nav>
  );
};

export default Navbar;
