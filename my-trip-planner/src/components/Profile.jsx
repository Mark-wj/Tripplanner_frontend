import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';

const Profile = () => {
  const { authData } = useContext(AuthContext);

  if (!authData || !authData.user) {
    return <div>Please log in to view your profile.</div>;
  }

  const { user } = authData;

  return (
    <div className="max-w-md mx-auto p-4 border rounded mb-4">
      <h2 className="text-xl font-bold mb-2">Profile</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Carrier:</strong> {user.carrier}</p>
      <p><strong>Truck/Tractor & Trailer #:</strong> {user.truck_number}</p>
      <p><strong>Home Terminal Address:</strong> {user.home_terminal_address}</p>
      <p><strong>Shipping Documents:</strong> {user.shipping_docs}</p>
      <div>
        <strong>Driver Signature:</strong>
        {user.driver_signature ? (
          <img src={user.driver_signature} alt="Driver Signature" style={{ maxWidth: '200px' }} />
        ) : (
          <p>No signature provided.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
