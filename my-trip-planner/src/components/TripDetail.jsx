import React from 'react';

const TripDetail = ({ trip, onFetchRoute, onFetchLogs }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded p-4 sm:p-6 mb-6 sm:mb-8 text-gray-900 dark:text-gray-100">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">
        Trip Created (ID: {trip.id})
      </h2>
      <p className="mb-1"><strong>Driver:</strong> {trip.driver_name}</p>
      <p className="mb-1"><strong>Current Location:</strong> {trip.current_location}</p>
      <p className="mb-1"><strong>Pickup Location:</strong> {trip.pickup_location}</p>
      <p className="mb-1"><strong>Dropoff Location:</strong> {trip.dropoff_location}</p>
      <p className="mb-4"><strong>Current Cycle Hours:</strong> {trip.current_cycle_hours}</p>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
        <button
          onClick={onFetchRoute}
          className="bg-blue-500 dark:bg-blue-700 hover:bg-blue-600 dark:hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
        >
          Get Route Map Data
        </button>
        <button
          onClick={onFetchLogs}
          className="bg-blue-500 dark:bg-blue-700 hover:bg-blue-600 dark:hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
        >
          Generate Daily Logs
        </button>
      </div>
    </div>
  );
};

export default TripDetail;
