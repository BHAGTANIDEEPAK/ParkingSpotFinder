import React, { useEffect, useState } from 'react';

const ViewSpots: React.FC = () => {
  const [spots, setSpots] = useState<any[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State to show success modal
  const [modalMessage, setModalMessage] = useState(''); // Modal message

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
      setModalMessage('Parking spot updated successfully!');
      setShowSuccessModal(true); // Show success modal
      setTimeout(() => {
        setShowSuccessModal(false); // Hide the modal after 3 seconds
      }, 3000);
      setSpots(spots.map(spot => spot._id === id ? { ...spot, is_available: !isAvailable } : spot));
    } else {
      setModalMessage('Error updating parking spot');
      setShowSuccessModal(true); // Show error modal
      setTimeout(() => {
        setShowSuccessModal(false); // Hide the modal after 3 seconds
      }, 3000);
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
              className={`px-4 py-2 rounded-lg ${spot.is_available ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
            >
              {spot.is_available ? 'Mark as Not Available' : 'Mark as Available'}
            </button>
          </div>
        ))}
      </div>

      {/* Success/Failure Modal */}
      {showSuccessModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <p className="text-lg font-semibold">{modalMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewSpots;
