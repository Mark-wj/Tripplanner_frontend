import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:8000/api/auth';

const Registration = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    carrier: '',
    truck_number: '',
    home_terminal_address: '',
    shipping_docs: '',
    driver_signature: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setMessage('Registration successful! You can now log in.');
      } else {
        const errorData = await res.json();
        setMessage('Registration failed: ' + JSON.stringify(errorData));
      }
    } catch (err) {
      console.error(err);
      setMessage('Error during registration.');
    }
  };

  return (
    <div className="flex min-h-screen dark:bg-gray-900">
      <div className="w-1/2 hidden md:block">
        <img
          src="https://tinyurl.com/4yf8h63j"
          alt="Registration Visual"
          className="object-cover h-full w-full animate__animated animate__fadeIn"
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white dark:bg-gray-800 animate__animated animate__slideInRight">
        <div className="max-w-md w-full p-8 bg-white dark:bg-gray-800 rounded">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="carrier" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Carrier
              </label>
              <input
                id="carrier"
                type="text"
                name="carrier"
                placeholder="Carrier or Carriers"
                value={formData.carrier}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="truck_number" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Truck/Tractor &amp; Trailer #
              </label>
              <input
                id="truck_number"
                type="text"
                name="truck_number"
                placeholder="Truck/Tractor & Trailer #"
                value={formData.truck_number}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="home_terminal_address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Home Terminal Address
              </label>
              <input
                id="home_terminal_address"
                type="text"
                name="home_terminal_address"
                placeholder="Home Terminal Address"
                value={formData.home_terminal_address}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="shipping_docs" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Shipping Documents
              </label>
              <input
                id="shipping_docs"
                type="text"
                name="shipping_docs"
                placeholder="Shipping Documents (BOL, Shipper, Commodity)"
                value={formData.shipping_docs}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="driver_signature" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Driver Signature (base64)
              </label>
              <input
                id="driver_signature"
                type="text"
                name="driver_signature"
                placeholder="Driver Signature (base64)"
                value={formData.driver_signature}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition-colors duration-200"
            >
              Register
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
      {message && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setMessage('')}
          ></div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg z-10 animate__animated animate__zoomIn">
            <p className="mb-4 text-gray-900 dark:text-gray-100">{message}</p>
            <button
              onClick={() => setMessage('')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Registration;
