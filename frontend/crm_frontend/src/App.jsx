import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import { logoutUser, getCurrentUser } from './services/Auth';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = getCurrentUser();
    if (userData) {
      setUser(userData);
    }
    else{
      setUser(null);
    }
    setLoading(false);
  }, []);

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  const isAuthenticated = () => {
    return user && user.token;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {isAuthenticated() && <Navigation user={user} logout={logout} />}

        <Routes>
          <Route 
            path="/login" 
            element={!isAuthenticated() ? <Login setUser={setUser} /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/register" 
            element={!isAuthenticated() ? <Register setUser={setUser} /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/dashboard" 
            element={!isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/customers" 
            element={!isAuthenticated() ? <Customers /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/" 
            element={<Navigate to={user ? "/dashboard" : "/login"} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

// seperate Navigation Component
const Navigation = ({ user, logout }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/dashboard" className="font-bold text-xl">
              CRM App
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link 
                to="/dashboard" 
                className={`px-3 py-2 rounded-md transition-colors ${
                  isActive('/dashboard') 
                    ? 'bg-blue-700' 
                    : 'hover:bg-blue-700'
                }`}
              >
                Dashboard
              </Link>
              <Link 
                to="/customers" 
                className={`px-3 py-2 rounded-md transition-colors ${
                  isActive('/customers') 
                    ? 'bg-blue-700' 
                    : 'hover:bg-blue-700'
                }`}
              >
                Customers
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm">
              Welcome, <span className="font-medium">{user?.user?.name}</span>
              {user.role === 'admin' && (
                <span className="ml-2 bg-blue-800 px-2 py-1 rounded text-xs">Admin</span>
              )}
            </span>
            <button 
              onClick={logout}
              className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md transition-colors hover:cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default App;
