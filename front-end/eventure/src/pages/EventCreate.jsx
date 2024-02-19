import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, postEvent } from "../services/EndpointService";
import { useMessage } from '../contexts/MessageContext';

function EventCreate() {
  const [users, setUsers] = useState([]);
  const { showMessage } = useMessage();

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    eventManagerId: '',
    participants: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users", error);
        showMessage('Failed to fetch users!','error');
        setUsers([]); 
      }
    };
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleMultiSelectChange = (e) => {
    const values = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prevState => ({
      ...prevState,
      participants: values
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.eventManagerId) {
      showMessage('Please fill in all required fields.','error')
      return;
    }
    try {
      await postEvent(formData);
      showMessage('Event Created Successfully.','success');
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to create event', error);
      showMessage('Failed to create event','error');

    }
  };

  return (
    <div className="bg-gray-200 min-h-screen p-8">
      <div className="container mx-auto max-w-6xl bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Create New Event</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 bg-gray-200 p-2 rounded">
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Event Name <span className="text-red-700 text-sm font-bold">*</span></label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4 bg-gray-200 p-2 rounded">
            <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">Event Date <span className="text-red-700 text-sm font-bold">*</span></label>
            <input type="date" id="date" name="date" value={formData.date} onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4 bg-gray-200 p-2 rounded">
            <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">Location</label>
            <input type="text" id="location" name="location" value={formData.location} onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4 bg-gray-200 p-2 rounded">
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Event Description</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
          </div>
          <div className="mb-4 bg-gray-200 p-2 rounded">
            <label htmlFor="eventManagerId" className="block text-gray-700 text-sm font-bold mb-2">Event Responsible <span className="text-red-700 text-sm font-bold">*</span></label>
            <select id="eventManagerId" name="eventManagerId" value={formData.eventManagerId} onChange={handleInputChange}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              {users.map(user => (
                <option key={user._id} value={user._id}>{user.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4 bg-gray-200 p-2 rounded">
            <label htmlFor="participants" className="block text-gray-700 text-sm font-bold mb-2">Participants</label>
            <select id="participants" name="participants" multiple value={formData.participants} onChange={handleMultiSelectChange}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              {users.map(user => (
                <option key={user._id} value={user._id}>{user.name}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default EventCreate;