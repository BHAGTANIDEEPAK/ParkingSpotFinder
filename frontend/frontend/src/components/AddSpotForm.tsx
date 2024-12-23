import React, { useState } from 'react';

const AddSpotForm: React.FC = () => {
  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newSpot = { name, latitude, longitude, is_available: isAvailable };

    // Send POST request to the backend
    const response = await fetch('http://localhost:5000/api/spots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSpot),
    });

    if (response.ok) {
      alert('Parking spot added successfully!');
    } else {
      alert('Error adding parking spot');
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col justify-center items-center py-10 px-4">
      <h2 className="text-3xl font-bold text-blue-900 mb-6">Add a New Parking Spot</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
        <div>
          <label htmlFor="name" className="block text-lg font-semibold text-blue-700">Spot Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-md"
            placeholder="Enter spot name"
            required
          />
        </div>
        <div>
          <label htmlFor="latitude" className="block text-lg font-semibold text-blue-700">Latitude</label>
          <input
            type="text"
            id="latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-md"
            placeholder="Enter latitude"
            required
          />
        </div>
        <div>
          <label htmlFor="longitude" className="block text-lg font-semibold text-blue-700">Longitude</label>
          <input
            type="text"
            id="longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-md"
            placeholder="Enter longitude"
            required
          />
        </div>
        <div>
          <label htmlFor="availability" className="block text-lg font-semibold text-blue-700">Availability</label>
          <select
            id="availability"
            value={isAvailable ? 'Available' : 'Not Available'}
            onChange={(e) => setIsAvailable(e.target.value === 'Available')}
            className="w-full px-4 py-2 mt-2 border rounded-md"
          >
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-700 transition">
          Add Spot
        </button>
      </form>
    </div>
  );
};

export default AddSpotForm;
