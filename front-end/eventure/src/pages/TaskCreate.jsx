import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, postTask, getAllEvents } from "../services/EndpointService";
import { useMessage } from '../contexts/MessageContext';

function TaskCreate() {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const { showMessage } = useMessage();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    deadline: '',
    eventId: '',
    assignedTo: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUsers = await getAllUsers();
      const fetchedEvents = await getAllEvents();
      setUsers(fetchedUsers.data);
      setEvents(fetchedEvents.data);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.title || !formData.eventId ) {
      showMessage('Please fill in all required fields.','error')
      return;
    }
    try {
      await postTask(formData);
      showMessage('Task created successfully!','success');
      navigate('/tasks'); 
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen p-8">
      <div className="container mx-auto max-w-6xl bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Create New Task</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 bg-gray-200 p-2 rounded">
            <label htmlFor="eventId" className="block text-gray-700 text-sm font-bold mb-2">Related Event <span className="text-red-700 text-sm font-bold">*</span></label>
            <select id="eventId" name="eventId" value={formData.eventId} onChange={handleChange} className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100">
              <option value="">Select Event</option>
              {events.map(event => (
                <option key={event._id} value={event._id}>{event.title}</option>
              ))}
            </select>
          </div>
          <div className="mb-4 bg-gray-200 p-2 rounded">
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Task Title <span className="text-red-700 text-sm font-bold">*</span></label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100" />
          </div>
          <div className=" mb-4 bg-gray-200 p-2 rounded">
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Task Description</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"></textarea>
          </div>
          <div className=" mb-4 bg-gray-200 p-2 rounded">
            <label htmlFor="deadline" className="block text-gray-700 text-sm font-bold mb-2">Deadline</label>
            <input type="date" id="deadline" name="deadline" value={formData.deadline} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100" />
          </div>
          <div className=" mb-4 bg-gray-200 p-2 rounded">
            <label htmlFor="assignedTo" className="block text-gray-700 text-sm font-bold mb-2">Assignee</label>
            <select id="assignedTo" name="assignedTo" value={formData.assignedTo} onChange={handleChange} className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100">
              <option value="">Select User</option>
              {users.map(user => (
                <option key={user._id} value={user._id}>{user.name}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline">Create Task</button>
        </form>
      </div>
    </div>
  );
}

export default TaskCreate;
