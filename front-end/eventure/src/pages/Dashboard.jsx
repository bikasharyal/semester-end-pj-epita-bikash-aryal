import React from 'react';
import { useAuth } from '../contexts/AuthContext'

function Dashboard() {
  const { userId } = useAuth();

  return (
    <div className="bg-gray-200 min-h-screen p-8">
      <div className="container mx-auto max-w-6xl bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4"> {/* Adjusted max-width here */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-700">Welcome, [User Name]</h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">Create New Event</button>
        </div>
        <div className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Upcoming Events</h2>
          <div className="bg-gray-100 rounded p-4 mb-2">Event 1: Conference on Web Development - Date: 2024-02-15</div>
          <div className="bg-gray-100 rounded p-4">Event 2: Tech Networking Meetup - Date: 2024-03-05</div>
        </div>
        <div className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Your Tasks</h2>
          <div className="bg-gray-100 rounded p-4 mb-2">Task 1: Prepare presentation for the conference</div>
          <div className="bg-gray-100 rounded p-4">Task 2: Coordinate with tech meetup speakers</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;