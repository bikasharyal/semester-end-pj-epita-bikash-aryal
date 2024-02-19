import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { MessageProvider } from './contexts/MessageContext'; // Import the MessageProvider
import { PrivateRoute } from './components/PrivateRoute';
import { AdminRoute } from './components/AdminRoute';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import EventCreate from './pages/EventCreate';
import EventDetails from './pages/EventDetails';
import TaskCreate from './pages/TaskCreate';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import Events from './pages/Events';
import Tasks from './pages/Tasks';
import Users from './pages/Users';
import User from './pages/User';

function App() {
  return (
    <MessageProvider> {/* Wrap components with MessageProvider */}
      <AuthProvider>
        <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/create-event" element={<PrivateRoute><EventCreate /></PrivateRoute>} />
            <Route path="/event-details" element={<PrivateRoute><EventDetails /></PrivateRoute>} />
            <Route path="/create-task" element={<PrivateRoute><TaskCreate /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/events" element={<AdminRoute><Events /></AdminRoute>} />
            <Route path="/tasks" element={<AdminRoute><Tasks /></AdminRoute>} />
            <Route path="/users" element={<AdminRoute><Users /></AdminRoute>} />
            <Route path="/users/new" element={<AdminRoute><User /></AdminRoute>} />
            <Route path="/users/edit/:id" element={<AdminRoute><User /></AdminRoute>} />
            <Route path="/login" element={<Auth />} />
            <Route path="/signup" element={<Auth />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </MessageProvider>
  );
}

export default App;