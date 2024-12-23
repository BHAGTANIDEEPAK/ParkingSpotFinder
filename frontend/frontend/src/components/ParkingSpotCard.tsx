import React from 'react';
import { FC } from 'react';

interface ParkingSpotCardProps {
  spot: {
    _id: string;
    name: string;
    latitude: string;
    longitude: string;
    is_available: boolean;
  };
}

const ParkingSpotCard: FC<ParkingSpotCardProps> = ({ spot }) => {
  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-bold">{spot.name}</h2>
      <p className="text-gray-600">Latitude: {spot.latitude}</p>
      <p className="text-gray-600">Longitude: {spot.longitude}</p>
      <span
        className={`inline-block mt-2 px-3 py-1 text-sm font-semibold rounded-full ${
          spot.is_available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}
      >
        {spot.is_available ? 'Available' : 'Unavailable'}
      </span>
    </div>
  );
};

export default ParkingSpotCard;
