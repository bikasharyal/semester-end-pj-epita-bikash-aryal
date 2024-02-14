import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PrivateRoute } from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import EventCreate from './pages/EventCreate';
import EventDetails from './pages/EventDetails';
import TaskCreate from './pages/TaskCreate';
import Home from './pages/Home';
import Footer from './pages/Footer';
import Profile from './pages/Profile';
import Auth from './components/Auth';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Adjust PrivateRoute usage for react-router-dom v6 */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/create-event" element={<PrivateRoute><EventCreate /></PrivateRoute>} />
          <Route path="/event-details" element={<PrivateRoute><EventDetails /></PrivateRoute>} />
          <Route path="/create-task" element={<PrivateRoute><TaskCreate /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer/>
      </Router>
    </AuthProvider>
  );
}

export default App;
