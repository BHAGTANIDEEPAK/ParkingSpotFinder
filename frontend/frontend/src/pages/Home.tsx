import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-blue-100 flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-5xl font-extrabold text-blue-900 mb-4">Parking Spot Finder</h1>
      <p className="text-xl mb-8 text-blue-600 max-w-3xl">
        Discover available parking spots around you, reserve your spot easily, and manage availability.
        With our intuitive platform, finding the perfect parking spot is just a few clicks away.
      </p>
      <div className="flex space-x-4">
        <Link to="/add" className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 transition">
          Add Parking Spot
        </Link>
        <Link to="/spots" className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 transition">
          View Available Parking Spots
        </Link>
      </div>
    </div>
  );
};

export default Home;
