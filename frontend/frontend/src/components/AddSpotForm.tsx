import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder'; // Import leaflet control geocoder
import '../../src/App.css'

const AddSpotForm: React.FC = () => {
  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [isAvailable, setIsAvailable] = useState(true);
  const [loadingLocation, setLoadingLocation] = useState(false); // New state for loader
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State to show success modal

  const containerStyle = {
    width: '100%',
    height: '400px',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (latitude === null || longitude === null) {
      alert('Please select a location on the map.');
      return;
    }

    const newSpot = { name, latitude, longitude, is_available: isAvailable };

    // Send POST request to the backend
    const response = await fetch('https://parking-jade.vercel.app/api/spots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSpot),
    });

    if (response.ok) {
      setShowSuccessModal(true); // Show the success modal
      setTimeout(() => {
        setShowSuccessModal(false); // Hide the modal after 3 seconds
      }, 3000);
    } else {
      alert('Error adding parking spot');
    }
  };

  // Hook for handling map events (e.g., when a user clicks on the map)
  const LocationSelector = () => {
    useMapEvents({
      click(e) {
        setLatitude(e.latlng.lat);
        setLongitude(e.latlng.lng);
      },
    });
    return null;
  };

  // Hook to add the geocoder control to the map
  const AddGeocoderControl = () => {
    const map = useMap(); // Access map instance

    useEffect(() => {
      if (map) {
        // Create and add geocoder control to the map
        const geocoderControl = L.Control.geocoder().addTo(map);
        return () => {
          // Cleanup geocoder control when the component is unmounted
          map.removeControl(geocoderControl);
        };
      }
    }, [map]);

    return null;
  };

  // Function to handle setting the user's live location
  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoadingLocation(true); // Start the loader
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setLoadingLocation(false); // Stop the loader
      }, () => {
        alert('Unable to retrieve your location');
        setLoadingLocation(false); // Stop the loader in case of an error
      });
    } else {
      alert('Geolocation is not supported by this browser.');
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
          <label className="block text-lg font-semibold text-blue-700">Search and Select Location on Map</label>
          
          {/* MapContainer now wraps the Leaflet map */}
          <MapContainer center={[51.505, -0.09]} zoom={13} style={containerStyle}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationSelector />
            {/* Add geocoder control */}
            {latitude && longitude && <Marker position={[latitude, longitude]} />}
          </MapContainer>
          
        </div>

        <div>
          <label className="block text-lg font-semibold text-blue-700">Latitude</label>
          <input
            type="number"
            value={latitude || ''}
            onChange={(e) => setLatitude(parseFloat(e.target.value))}
            className="w-full px-4 py-2 mt-2 border rounded-md"
            placeholder="Enter latitude"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold text-blue-700">Longitude</label>
          <input
            type="number"
            value={longitude || ''}
            onChange={(e) => setLongitude(parseFloat(e.target.value))}
            className="w-full px-4 py-2 mt-2 border rounded-md"
            placeholder="Enter longitude"
          />
        </div>

        <div>
          <button
            type="button"
            onClick={handleCurrentLocation}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg mt-2 hover:bg-green-700 transition"
          >
            Use My Current Location
          </button>
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

      {/* Loader Modal */}
      {loadingLocation && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <p className="text-lg">Fetching location...</p>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <p className="text-lg text-green-600 font-semibold">Details added successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddSpotForm;
