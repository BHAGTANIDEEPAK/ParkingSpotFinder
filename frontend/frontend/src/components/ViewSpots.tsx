import React, { useEffect, useState } from 'react';

const ViewSpots: React.FC = () => {
  const [spots, setSpots] = useState<any[]>([]);

  useEffect(() => {
    // Fetch parking spots from the backend
    const fetchSpots = async () => {
      const response = await fetch('http://localhost:5000/api/spots');
      const data = await response.json();
      setSpots(data);
    };

    fetchSpots();
  }, []);

  const handleUpdateAvailability = async (id: string, isAvailable: boolean) => {
    const updatedSpot = { is_available: !isAvailable };
    const response = await fetch(`http://localhost:5000/api/spots/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedSpot),
    });

    if (response.ok) {
      alert('Parking spot updated successfully!');
      setSpots(spots.map(spot => spot._id === id ? { ...spot, is_available: !isAvailable } : spot));
    } else {
      alert('Error updating parking spot');
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col justify-center items-center py-10">
      <h2 className="text-3xl font-bold text-blue-900 mb-6">Available Parking Spots</h2>
      <div className="space-y-4 w-full max-w-3xl">
        {spots.map(spot => (
          <div key={spot._id} className="bg-white p-4 rounded-lg shadow-lg flex justify-between items-center">
            <div className="text-lg text-blue-800 font-semibold">{spot.name}</div>
            <div className="text-sm text-gray-600">{`Lat: ${spot.latitude}, Long: ${spot.longitude}`}</div>
            <button
              onClick={() => handleUpdateAvailability(spot._id, spot.is_available)}
              className={`px-4 py-2 rounded-lg ${
                spot.is_available ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
              }`}
            >
              {spot.is_available ? 'Mark as Not Available' : 'Mark as Available'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewSpots;
