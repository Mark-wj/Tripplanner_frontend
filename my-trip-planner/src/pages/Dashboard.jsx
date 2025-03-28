import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';
import TripPlanner from './TrpiPlanner'; 
import CombinedDashboard from '../components/CombinedDashboard'; 

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const Dashboard = () => {
  const { authData } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("trips");
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (activeTab === "trips") {
      setLoading(true);
      fetch(`${API_BASE_URL}/trips/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authData.access}`,
        },
        credentials: "include",
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to fetch trips: ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => {
          setTrips(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [activeTab, authData]);
  const tripsCompleted = trips.length;
  const totalHours = trips.reduce(
    (acc, trip) => acc + (trip.total_hours || 0),
    0
  );
  const complianceRate =
    tripsCompleted > 0
      ? trips.reduce((acc, trip) => acc + (trip.compliance_rate || 100), 0) /
        tripsCompleted
      : 0;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <main className="p-6 text-gray-900 dark:text-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 p-6 shadow rounded">
            <h3 className="text-xl font-semibold mb-2">Total Hours</h3>
            <p className="text-3xl font-bold">
              {totalHours.toFixed(1)}h
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 shadow rounded">
            <h3 className="text-xl font-semibold mb-2">Trips Completed</h3>
            <p className="text-3xl font-bold">
              {tripsCompleted}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 shadow rounded">
            <h3 className="text-xl font-semibold mb-2">Compliance Rate</h3>
            <p className="text-3xl font-bold">
              {complianceRate.toFixed(0)}%
            </p>
          </div>
        </div>
        <div className="mb-4 border-b border-gray-300 dark:border-gray-600">
          <nav className="flex space-x-4">
            <button
              className={`px-4 py-2 focus:outline-none ${
                activeTab === "logs"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-600 dark:text-gray-400 hover:text-blue-500"
              }`}
              onClick={() => setActiveTab("logs")}
            >
              New Trip
            </button>
            <button
              className={`px-4 py-2 focus:outline-none ${
                activeTab === "trips"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-600 dark:text-gray-400 hover:text-blue-500"
              }`}
              onClick={() => setActiveTab("trips")}
            >
              Previous Trips
            </button>
            <button
              className={`px-4 py-2 focus:outline-none ${
                activeTab === "metrics"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-600 dark:text-gray-400 hover:text-blue-500"
              }`}
              onClick={() => setActiveTab("metrics")}
            >
              Metrics
            </button>
          </nav>
        </div>
        <div>
          {activeTab === "trips" && (
            <div className="bg-white dark:bg-gray-800 p-6 shadow rounded">
              <h3 className="text-xl font-semibold mb-4">Trips</h3>
              {loading ? (
                <p>Loading trips...</p>
              ) : error ? (
                <p className="text-red-500">Error: {error}</p>
              ) : trips && trips.length > 0 ? (
                <ul>
                  {trips.map(trip => (
                    <li
                      key={trip.id}
                      className="border p-4 mb-2 rounded border-gray-300 dark:border-gray-600"
                    >
                      <p className="font-bold">Driver: {trip.driver}</p>
                      <p>
                        From: {trip.pickup_location} to {trip.dropoff_location}
                      </p>
                      <p>
                        Date: {new Date(trip.created_at).toLocaleDateString()}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No trips found.</p>
              )}
            </div>
          )}

          {activeTab === "logs" && (
            <div className="bg-white dark:bg-gray-800 p-6 shadow rounded">
              <TripPlanner />
            </div>
          )}

          {activeTab === "map" && (
            <div className="bg-white dark:bg-gray-800 p-6 shadow rounded">
              <h3 className="text-xl font-semibold mb-4">Map</h3>
              <div className="h-96 flex items-center justify-center text-gray-500 dark:text-gray-400 border-dashed border-2 border-gray-300 dark:border-gray-600">
                Map Placeholder
              </div>
            </div>
          )}

          {activeTab === "metrics" && (
            <div className="bg-white dark:bg-gray-800 p-6 shadow rounded">
              <h3 className="text-xl font-semibold mb-4">Dashboard Metrics</h3>
              <CombinedDashboard tripId={trips && trips.length > 0 ? trips[0].id : 1} />
            </div>
          )}
        </div>
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        © 2025. All rights reserved.
      </footer>
    </div>
  );
};

export default Dashboard;
