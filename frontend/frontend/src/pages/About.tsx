import React from 'react';
import { FC } from 'react';

const About: FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">About ParkingSpot Finder</h1>
      <p className="text-gray-700 text-lg text-center">
        ParkingSpot Finder is your ultimate solution for locating and managing parking spots efficiently. 
        Designed with a modern interface, our platform ensures an intuitive experience while providing 
        real-time data on parking availability.
      </p>
      <div className="mt-8 flex justify-center">
        <img
          src="/assets/parking-illustration.png"
          alt="ParkingSpot Finder Illustration"
          className="max-w-md"
        />
      </div>
    </div>
  );
};

export default About;
