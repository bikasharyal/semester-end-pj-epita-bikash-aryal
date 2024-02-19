import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, getEventByUserId, getAllUserTasks } from "../services/EndpointService";
import { useMessage } from '../contexts/MessageContext';
import { useAuth } from '../contexts/AuthContext';

function Dashboard() {
  const { userId } = useAuth();
  const navigate = useNavigate();
  const { showMessage } = useMessage();
  const [userName, setUserName] = useState('');
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUser(userId);
        setUserName(user.data.name);
        const eventsData = await getEventByUserId(userId);
        setUpcomingEvents(eventsData.data.upcomingEvents);
        const tasksData = await getAllUserTasks(userId);
        setTasks(tasksData.data);
      } catch (error) {
        console.error('Dashboard data fetch error:', error);
        showMessage('Failed to fetch dashboard data!', 'error');
      }
    };
    fetchData();
  }, [userId, showMessage]);

  return (
    <div className="bg-gray-200 min-h-screen p-8">
      <div className="container mx-auto max-w-6xl bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-700">Welcome, {userName}</h1>
          <button 
            onClick={() => navigate(`/create-event`)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
              Create New Event
          </button>
        </div>  
        <div className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Upcoming Events</h2>
          {upcomingEvents.length ? (
            upcomingEvents.map((event) => (
              <div key={event._id} className="bg-gray-100 rounded p-4 mb-2">
                <div className="flex items-center font-bold justify-between">
                  <span className="font-bold">{event.title}</span>
                  <span className="ml-4">{`Date: ${new Date(event.date).toLocaleDateString()}`}</span>
                  <span className="ml-4">{`Venue: ${event.location}`}</span>
                </div>
                <p className="mt-2">{event.description}</p>
              </div>
            ))
          ) : (
            <p>No upcoming events found.</p>
          )}
        </div>

        <div className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Your Tasks</h2>
          {tasks.length ? (
            tasks.map((task) => (
              <div key={task._id} className="bg-gray-100 rounded p-4 mb-2">{task.title}: {task.description} [Event - {task.eventName}]</div>
            ))
          ) : (
            <p>No tasks assigned.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
