import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './components/AuthContext';
import Header from './components/Header';
import Registration from './components/Registration';
import Login from './components/Login';
import Profile from './components/Profile';
import Support from './pages/Support';
import Dashboard from './pages/Dashboard';

function App() {
  const { authData } = useContext(AuthContext);

  return (
    <Router>
      <div className="m">
        {authData && <Header />}
        <Routes>
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          {authData ? (
            <>
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/" replace />} />
              <Route path='/support' element={<Support />} />
              <Route path='/' element={<Dashboard />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
