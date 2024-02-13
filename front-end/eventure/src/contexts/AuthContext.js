import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext({});

export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    // Check token expiry here if possible
    // If expired, call logout
  }, [authToken]);

  const login = (token) => {
    localStorage.setItem('token', token);
    setAuthToken(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
  };

  const isAuthenticated = authToken !== null;

  return (
    <AuthContext.Provider value={{ authToken, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
