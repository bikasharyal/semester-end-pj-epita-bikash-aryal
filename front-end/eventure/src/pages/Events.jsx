import React, { useState, useEffect } from 'react';
import { getAllEvents, deleteEvent } from "../services/EndpointService";
import { useNavigate } from 'react-router-dom';
import { useMessage } from '../contexts/MessageContext';

function Events() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const { showMessage } = useMessage();

  useEffect(() => {
    getAllEvents().then(response => {
      setEvents(response.data); // Assuming response directly contains the data array
    });
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(id);
        setEvents(events.filter(event => event._id !== id));
        showMessage('Event Deleted!', 'success');
      } catch (error) {
        console.error('Failed to delete event:', error);
        showMessage('Failed to delete event!', 'error');

      }
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen p-8">
      <div className="container mx-auto max-w-7xl bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-700">Events Management</h1>
          <button 
          onClick={() => navigate(`/create-event`)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
            Create New Event</button>
        </div>  
        <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
            <tr>
                <th className="px-4 py-2 border">Title</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Location</th>
                <th className="px-4 py-2 border">Type</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">Actions</th>
            </tr>
            </thead>
            <tbody>
            {events.map((event, index) => (
                <tr key={index} className="bg-white">
                <td className="px-4 py-2 border">{event.title}</td>
                <td className="px-4 py-2 border">{new Date(event.date).toLocaleDateString()}</td>
                <td className="px-4 py-2 border">{event.location}</td>
                <td className="px-4 py-2 border">{event.type}</td>
                <td className="px-4 py-2 border">{event.description}</td>
                <td className="px-1 py-1 border text-center">
                    <button onClick={() => navigate(`/edit-event/${event._id}`)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mx-1">Edit</button>
                    <button onClick={() => handleDelete(event._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mx-1">Delete</button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
      </div>
    </div>
  );
}

export default Events;
