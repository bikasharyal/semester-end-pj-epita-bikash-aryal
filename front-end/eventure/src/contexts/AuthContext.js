// In AuthContext.js
import { createContext, useState, useContext, useEffect } from "react";
import { postLogin } from "../services/EndpointService"; // Adjust path as needed
import { useMessage } from "./MessageContext";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const { showMessage } = useMessage();

  useEffect(() => {
    // If the token is in localStorage, set it in the Axios auth header
    const token = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    if (token) {
      setAuthToken(token);
    }
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await postLogin({ email, password });
      const { token, userId } = response; // Assuming response structure
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId); // Store the userId in localStorage

      setAuthToken(token);
      setUserId(userId); // Update the userId state
    } catch (error) {
      console.error("Login Error:", error);
      showMessage('Login failed!','error');
      throw error; // Rethrow to handle it in the component
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId"); // Remove the userId from localStorage
    setAuthToken(null);
    setUserId(null); // Reset the userId state
    showMessage('Logout success!','success');
  };

  const isAuthenticated = !!authToken;

  return (
    <AuthContext.Provider
      value={{ userId, authToken, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
