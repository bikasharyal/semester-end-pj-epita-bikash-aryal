// In AuthContext.js
import { createContext, useState, useContext, useEffect } from 'react';
import { postLogin } from '../services/EndpointService'; // Adjust path as needed

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    // If the token is in localStorage, set it in the Axios auth header
    setAuthToken(localStorage.getItem('token'));
  }, []);

  const login = async (email, password) => {
    try {
      const response = await postLogin({ email, password });
      const { token } = response; // Assuming response structure
      localStorage.setItem('token', token);
      setAuthToken(token);
    } catch (error) {
      console.error("Login Error:", error);
      throw error; // Rethrow to handle it in the component
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
  };

  const isAuthenticated = !!authToken;

  return (
    <AuthContext.Provider value={{ authToken, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
