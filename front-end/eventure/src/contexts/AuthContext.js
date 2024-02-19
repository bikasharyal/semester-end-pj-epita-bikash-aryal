// In AuthContext.js
import { createContext, useState, useContext, useEffect } from "react";
import { postLogin } from "../services/EndpointService"; // Adjust path as needed
import { useMessage } from "./MessageContext";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));
  const { showMessage } = useMessage();

  useEffect(() => {
    // If the token is in localStorage, set it in the Axios auth header
    const token = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    const storedUserRole = localStorage.getItem("userRole");
    if (token) {
      setAuthToken(token);
    }
    if (storedUserId) {
      setUserId(storedUserId);
    }
    if (storedUserRole) {
      setUserRole(storedUserRole);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await postLogin({ email, password });
      const { token, userId, userRole } = response.data; // Assuming response structure
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId); // Store the userId in localStorage
      localStorage.setItem("userRole", userRole); // Store the userRole in localStorage

      setAuthToken(token);
      setUserId(userId); // Update the userId state
      setUserRole(userRole); // Update the userRole state
    } catch (error) {
      console.error("Login Error:", error);
      showMessage('Login failed!','error');
      throw error; // Rethrow to handle it in the component
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId"); // Remove the userId from localStorage
    localStorage.removeItem("userRole"); // Remove the userRole from localStorage
    setAuthToken(null);
    setUserId(null); // Reset the userId state
    setUserRole(null); 
    showMessage('Logout success!','success');
  };

  const isAuthenticated = !!authToken;

  return (
    <AuthContext.Provider
      value={{ userId, authToken, userRole, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
