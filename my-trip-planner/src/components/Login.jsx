import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:8000/api/auth';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        const data = await res.json();
        login(data);
        setMessage('Login successful.');
        navigate('/'); 
      } else {
        const errorData = await res.json();
        setMessage('Login failed: ' + JSON.stringify(errorData));
      }
    } catch (err) {
      console.error(err);
      setMessage('Error during login.');
    }
  };

  return (
    <div className="flex min-h-screen dark:bg-gray-900">
      <div className="w-1/2 hidden md:block">
        <img
          src="https://tinyurl.com/3avheych"
          alt="Login Visual"
          className="object-cover h-full w-full animate__animated animate__fadeIn"
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-800 animate__animated animate__slideInRight">
        <div className="max-w-md w-full p-8 rounded bg-white dark:bg-gray-800">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Login</h2>
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
            <button
              type="submit"
              className="w-full bg-blue-500 dark:bg-blue-700 hover:bg-blue-600 dark:hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-500 hover:underline">
                Register
              </Link>
            </p>
          </div>
          {message && (
            <div className="mt-4 p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
