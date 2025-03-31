import React, { useState, useContext } from 'react';
import { AuthContext } from '../components/AuthContext';
import TripForm from '../components/TripForm';
import TripDetail from '../components/TripDetail';
import RouteMapDisplay from '../components/RouteMapDisplay';
import DailyLogsDisplay from '../components/DailyLogsDisplay';

const API_BASE_URL = 'https://tripplanner-backend-s3yx.onrender.com/api';

const TripPlanner = () => {
  const { authData } = useContext(AuthContext);
  const [trip, setTrip] = useState(null);
  const [routeData, setRouteData] = useState(null);
  const [dailyLogs, setDailyLogs] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRouteMap = async () => {
    if (!trip) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/trips/${trip.id}/route_map/`, {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authData.access}`
        }
      });
      if (!res.ok) throw new Error('Failed to fetch route map');
      const data = await res.json();
      setRouteData(data);
    } catch (error) {
      console.error(error);
      alert('Error fetching route map data');
    }
    setLoading(false);
  };

  const fetchDailyLogs = async () => {
    if (!trip) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/trips/${trip.id}/generate_logs/`, {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authData.access}`
        }
      });
      if (!res.ok) throw new Error('Failed to fetch daily logs');
      const data = await res.json();
      setDailyLogs(data);
    } catch (error) {
      console.error(error);
      alert('Error fetching daily logs');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {!trip ? (
        <TripForm onTripCreated={setTrip} />
      ) : (
        <TripDetail trip={trip} onFetchRoute={fetchRouteMap} onFetchLogs={fetchDailyLogs} />
      )}
      {routeData && <RouteMapDisplay routeData={routeData} />}
      {dailyLogs && <DailyLogsDisplay dailyLogs={dailyLogs} />}
    </div>
  );
};

export default TripPlanner;
