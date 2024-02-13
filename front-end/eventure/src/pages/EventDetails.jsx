import React from 'react';

function EventDetails() {
  return (
    <div className="bg-gray-200 min-h-screen p-8">
      <div className="container mx-auto max-w-7xl bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-700 text-left">Event Details</h1>
        </div>
        <div className="event-section">
          <div className="event-info mb-4 bg-gray-200 p-2 rounded">
            <label className="block text-gray-700 text-sm font-bold mb-2 text-left">Event Name:</label>
            <div className="bg-gray-100 p-2 rounded text-left">Conference on Web Development</div>
          </div>
          <div className="event-info mb-4 bg-gray-200 p-2 rounded">
            <label className="block text-gray-700 text-sm font-bold mb-2 text-left">Event Date:</label>
            <div className="bg-gray-100 p-2 rounded text-left">2024-02-15</div>
          </div>
          <div className="event-info mb-4 bg-gray-200 p-2 rounded">
            <label className="block text-gray-700 text-sm font-bold mb-2 text-left">Location:</label>
            <div className="bg-gray-100 p-2 rounded text-left">Techville Convention Center</div>
          </div>
          <div className="event-info mb-6 bg-gray-200 p-2 rounded">
            <label className="block text-gray-700 text-sm font-bold mb-2 text-left">Description:</label>
            <div className="bg-gray-100 p-2 rounded text-left">This conference will cover various aspects of web development...</div>
          </div>
          <div className="event-info mb-4 bg-gray-200 p-2 rounded">
            <label className="block text-gray-700 text-sm font-bold mb-2 text-left">Event Responsible:</label>
            <div className="bg-gray-100 p-2 rounded text-left">User 2</div>
          </div>
          <div className="event-info mb-6 bg-gray-200 p-2 rounded">
            <label className="block text-gray-700 text-sm font-bold mb-2 text-left">Participants:</label>
            <div className="bg-gray-100 p-2 rounded text-left">John Doe, Jane Smith, Alex Johnson</div>
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700 mr-2">
              Edit Event
            </button>
            <button className="bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-red-700">
              Delete Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
