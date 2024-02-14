import axios from 'axios';

const API_BASE_URL = 'http://your-backend-api.com/api';

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to set the Authorization header
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Initially set the token if it exists in localStorage
const storedToken = localStorage.getItem('token');
if (storedToken) {
  setAuthToken(storedToken);
}

// Login request
export const postLogin = async (data) => {
//   const response = await api.post('/login', data);
//   const { token } = response.data;
//   localStorage.setItem('token', token);
// setAuthToken(token);
//   return response.data;

    const token = 'tt-3s4d5f6ghujsjfhskjdhfkjhska7y8u3wirs4d5f6g7hijmnsbdhf';  
    return {token:token};
};

// Registration request
export const postRegister = async (data) => {
//   const response = await api.post('/register', data);
//   const { token } = response.data;
//   localStorage.setItem('token', token);
//   setAuthToken(token);
//   return response.data;
    return 'register test success';
};
