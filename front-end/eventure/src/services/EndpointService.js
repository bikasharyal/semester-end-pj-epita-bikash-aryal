import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8080/api/v1';

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
  const response = await api.post('auth/login', data);
    //const { token } = response.data;
   return response.data.data;
    // const token = 'tt-3s4d5f6ghujsjfhskjdhfkjhska7y8u3wirs4d5f6g7hijmnsbdhf';  
    // return {token:token};
};

// Registration request
export const postRegister = async (data) => {
  const response = await api.post('auth/register', data);
  return response.data;
};
