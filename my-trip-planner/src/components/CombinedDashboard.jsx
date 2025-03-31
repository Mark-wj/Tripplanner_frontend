import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../components/AuthContext';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';

const COLORS = ['#0088FE', '#FFBB28', '#00C49F', '#FF8042'];
const API_BASE_URL = 'https://tripplanner-backend-s3yx.onrender.com/api';

const CombinedDashboard = ({ tripId }) => {
  const { authData } = useContext(AuthContext);
  const [routeMetrics, setRouteMetrics] = useState(null);
  const [logMetrics, setLogMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const routeRes = await fetch(`${API_BASE_URL}/trips/${tripId}/route_map/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authData.access}`
          },
          credentials: "include"
        });
        const routeData = await routeRes.json();
        if (routeData.error) {
          throw new Error(routeData.error);
        }
        const logRes = await fetch(`${API_BASE_URL}/trips/${tripId}/generate_logs/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authData.access}`
          },
          credentials: "include"
        });
        const logData = await logRes.json();
        if (logData.error) {
          throw new Error(logData.error);
        }

        setRouteMetrics(routeData);
        setLogMetrics(logData);
      } catch (error) {
        console.error("Error fetching metrics:", error);
        if (error.message.includes("Expected a place name")) {
          alert("Trip data contains coordinates. Please update the trip locations to valid place names (e.g., 'Nairobi, Kenya').");
        } else {
          alert("Error fetching metrics data.");
        }
      } finally {
        setLoading(false);
      }
    }
    if (authData && authData.access && tripId) {
      fetchMetrics();
    }
  }, [tripId, authData]);

  if (loading) {
    return (
      <p className="text-center text-gray-900 dark:text-gray-100">
        Loading metrics...
      </p>
    );
  }

  if (!routeMetrics || !logMetrics) {
    return (
      <p className="text-center text-red-500">
        Failed to load metrics data.
      </p>
    );
  }

  
  const logsArray = Array.isArray(logMetrics) ? logMetrics : (logMetrics.logs || []);

  // Process logMetrics into chart data.
  const dailyData = logsArray.map(entry => ({
    day: `Cycle ${entry.cycle} Day ${entry.day}`,
    driving: entry.onDutyHours, // effective driving hours
    rest: Math.max(0, 24 - entry.onDutyHours) // rest hours based on a 24h day
  }));

  // Trend data for a bar chart: total distance per day
  const trendData = logsArray.map((entry, index) => ({
    day: `Day ${index + 1}`,
    totalDistance: entry.daily_distance || 0
  }));

  // Pie Chart: Time Allocation
  const drivingTime = routeMetrics.duration; // hours
  const fixedStops = 2; // pickup + dropoff (hours)
  const fuelingStopTime = Math.floor(routeMetrics.distance / 1000) * 0.5;
  const totalUsedTime = drivingTime + fixedStops + fuelingStopTime;
  const restTime = Math.max(0, 24 - totalUsedTime);

  const pieData = [
    { name: 'Driving', value: drivingTime },
    { name: 'Fixed Stops', value: fixedStops },
    { name: 'Fueling', value: fuelingStopTime },
    { name: 'Rest', value: restTime }
  ];

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Combined Dashboard Metrics
      </h1>

      {/* Route Metrics Section */}
      <div className="mb-8 bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Route Metrics
        </h2>
        <p className="mb-1 text-gray-900 dark:text-gray-100">
          Total Distance: {routeMetrics.distance != null ? routeMetrics.distance.toFixed(2) : 'N/A'} miles
        </p>
        <p className="mb-1 text-gray-900 dark:text-gray-100">
          Total Duration: {routeMetrics.duration != null ? routeMetrics.duration.toFixed(2) : 'N/A'} hours
        </p>
        <a 
          href={routeMetrics.map_url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-500 underline"
        >
          View Map
        </a>
      </div>

      {/* Bar Chart: Daily Driving vs Rest Hours */}
      <div className="mb-8 bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Daily Driving Hours vs Rest Hours
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dailyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="gray" />
            <XAxis dataKey="day" stroke="black" className="dark:stroke-gray-100" />
            <YAxis stroke="black" className="dark:stroke-gray-100" />
            <Tooltip />
            <Legend />
            <Bar dataKey="driving" fill="#8884d8" />
            <Bar dataKey="rest" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart: Time Allocation */}
      <div className="mb-8 bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Time Allocation
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart: Daily Total Distance */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Daily Total Distance
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="gray" />
            <XAxis dataKey="day" stroke="black" className="dark:stroke-gray-100" />
            <YAxis stroke="black" className="dark:stroke-gray-100" />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalDistance" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CombinedDashboard;
