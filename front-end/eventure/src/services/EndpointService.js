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
   return response;
};

// Registration request
export const postRegister = async (data) => {
  const response = await api.post('auth/register', data);
  return response;
};


// post event request
export const postEvent = async (data) => {
  const response = await api.post('events', data);
   return response;
};

// get event request
export const getEvent = async (id) => {
  const response = await api.get('events/'+ id);
   return response;
};

// get events by userId request
export const getEventByUserId = async (id) => {
  const response = await api.get('events/byUserId/'+ id);
   return response;
};

export const getAllEvents = async (id) => {
  const response = await api.get('events');
   return response;
};

// update event request
// get event request
export const updateEvent = async (id, data) => {
  const response = await api.put('events/'+ id, data);
   return response;
};

// delete event request
export const deleteEvent = async (id) => {
  const response = await api.delete('events/'+ id);
   return response;
};

//Post task
export const postTask = async (data) => {
  const response = await api.post('tasks', data);
   return response;
};


// get Task request
export const getTask = async (id) => {
  const response = await api.get('tasks/'+ id);
   return response;
};

// get Task request
export const getAllTasks = async () => {
  const response = await api.get('tasks');
  return response;
};

// get Task request
export const getAllUserTasks = async (userId) => {
  const response = await api.get('tasks/allUserTasks/' + userId);
   return response;
};

// update Task request
// get event request
export const updateTask = async (id, data) => {
  const response = await api.put('tasks/'+ id, data);
   return response;
};

// delete Task request
export const deleteTask = async (id) => {
  const response = await api.delete('tasks/'+ id);
   return response;
};


//Post User
export const postUser = async (data) => {
  const response = await api.post('users', data);
   return response;
};


// get User request
export const getUser = async (id) => {
  const response = await api.get('users/'+ id);
   return response;
};

// get all User request
export const getAllUsers = async () => {
  const response = await api.get('users');
   return response;
};

// update User request
// get event request
export const updateUser = async (id, data) => {
  const response = await api.put('users/'+ id, data);
   return response;
};

export const updateUserPassword = async (id, data) => {
  const response = await api.put('users/updatePassword/'+ id, data);
   return response;
};

// delete User request
export const deleteUser = async (id) => {
  const response = await api.delete('users/' + id);
   return response;
};

