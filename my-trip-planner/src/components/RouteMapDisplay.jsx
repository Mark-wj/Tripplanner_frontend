import React from 'react';
import RouteMap from './RouteMap';

const RouteMapDisplay = ({ routeData }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 text-gray-900 dark:text-gray-100">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Route Map</h2>
      <RouteMap routeData={routeData} />
      <h3 className="text-lg sm:text-xl font-medium mt-4">Navigation Instructions</h3>
      {routeData.instructions && routeData.instructions.length > 0 ? (
        <ol className="list-decimal pl-5 space-y-1">
          {routeData.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      ) : (
        <p>No instructions available.</p>
      )}
    </div>
  );
};

export default RouteMapDisplay;
