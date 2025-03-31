import React, { useState, useContext } from 'react';
import { AuthContext } from '../components/AuthContext';

const API_BASE_URL = 'https://tripplanner-backend-s3yx.onrender.com/api';

const TripForm = ({ onTripCreated }) => {
  const [tripDetails, setTripDetails] = useState({
    driver_name: '',
    current_location: 'Nairobi, Kenya',
    pickup_location: 'Mombasa, Kenya',
    dropoff_location: 'Kisumu, Kenya',
    current_cycle_hours: ''
  });
  const [loading, setLoading] = useState(false);
  const { authData } = useContext(AuthContext);
  const isCoordinate = (location) => {
    const pattern = /^\s*-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?\s*$/;
    return pattern.test(location);
  };

  const handleChange = (e) => {
    setTripDetails({ ...tripDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      isCoordinate(tripDetails.current_location) ||
      isCoordinate(tripDetails.pickup_location) ||
      isCoordinate(tripDetails.dropoff_location)
    ) {
      alert('Trip data contains coordinates. Please update the trip locations to valid place names (e.g., "Nairobi, Kenya").');
      return;
    }

    if (!authData || !authData.access) {
      alert("User not authenticated");
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/trips/`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authData.access}` 
        },
        body: JSON.stringify({
          driver_name: tripDetails.driver_name,
          current_location: tripDetails.current_location,
          pickup_location: tripDetails.pickup_location,
          dropoff_location: tripDetails.dropoff_location,
          current_cycle_hours: parseFloat(tripDetails.current_cycle_hours)
        })
      });
      if (!res.ok) throw new Error('Failed to create trip');
      const data = await res.json();
      onTripCreated(data);
    } catch (error) {
      console.error(error);
      alert('Error creating trip');
    }
    setLoading(false);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white dark:bg-gray-800 shadow-md rounded px-4 sm:px-8 pt-6 pb-8 mb-6 sm:mb-8"
    >
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm sm:text-base font-bold mb-2">
          Current Location (Place Name):
        </label>
        <input
          type="text"
          name="current_location"
          value={tripDetails.current_location}
          onChange={handleChange}
          placeholder="e.g., Nairobi, Kenya"
          className="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 focus:outline-none"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm sm:text-base font-bold mb-2">
          Pickup Location (Place Name):
        </label>
        <input
          type="text"
          name="pickup_location"
          value={tripDetails.pickup_location}
          onChange={handleChange}
          placeholder="e.g., Mombasa, Kenya"
          className="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 focus:outline-none"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm sm:text-base font-bold mb-2">
          Dropoff Location (Place Name):
        </label>
        <input
          type="text"
          name="dropoff_location"
          value={tripDetails.dropoff_location}
          onChange={handleChange}
          placeholder="e.g., Kisumu, Kenya"
          className="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 focus:outline-none"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 dark:text-gray-300 text-sm sm:text-base font-bold mb-2">
          Current Cycle Used (Hrs):
        </label>
        <input
          type="number"
          name="current_cycle_hours"
          value={tripDetails.current_cycle_hours}
          onChange={handleChange}
          className="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 focus:outline-none"
          required
        />
      </div>
      <button 
        type="submit" 
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {loading ? 'Processing...' : 'Create Trip'}
      </button>
    </form>
  );
};

export default TripForm;
