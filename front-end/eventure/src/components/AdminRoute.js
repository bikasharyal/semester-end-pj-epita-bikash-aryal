// components/AdminRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const AdminRoute = ({ children }) => {
  const { authToken, userRole } = useAuth();
  let location = useLocation();

  if (!authToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (userRole !== 'admin') {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return children;
};