import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';

const API_BASE_URL = 'https://tripplanner-backend-s3yx.onrender.com/api/auth';

const Logout = () => {
  const { authData, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    if (!authData) return;
    try {
      await fetch(`${API_BASE_URL}/logout/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authData.access}`
        },
        body: JSON.stringify({ refresh: authData.refresh })
      });
    } catch (error) {
      console.error('Logout error', error);
    }
    logout();
  };

  return (
    <button onClick={handleLogout} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
      Logout
    </button>
  );
};

export default Logout;
