import React from 'react';

function EventCreate() {
  return (
    <div className="bg-gray-200 min-h-screen p-8">
      <div className="container mx-auto max-w-7xl bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-700 text-left">Create New Event</h1>
        </div>
        <form>
          <div className="mb-4 bg-gray-200 p-2 rounded">
            <label htmlFor="eventName" className="block text-gray-700 text-sm font-bold mb-2 text-left">Event Name</label>
            <input type="text" id="eventName" name="eventName" 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100" />
          </div>
          <div className="mb-4 bg-gray-200 p-2 rounded">
            <label htmlFor="eventDate" className="block text-gray-700 text-sm font-bold mb-2 text-left">Event Date</label>
            <input type="date" id="eventDate" name="eventDate" 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100" />
          </div>
          <div className="mb-4 bg-gray-200 p-2 rounded">
            <label htmlFor="eventLocation" className="block text-gray-700 text-sm font-bold mb-2 text-left">Location</label>
            <input type="text" id="eventLocation" name="eventLocation" 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100" />
          </div>
          <div className="mb-6 bg-gray-200 p-2 rounded">
            <label htmlFor="eventDescription" className="block text-gray-700 text-sm font-bold mb-2 text-left">Event Description</label>
            <textarea id="eventDescription" name="eventDescription"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100" ></textarea>
          </div>
          <div className="mb-4 bg-gray-200 p-2 rounded">
            <label htmlFor="eventResponsible" className="block text-gray-700 text-sm font-bold mb-2 text-left">Event Responsible</label>
            <select id="eventResponsible" name="eventResponsible"
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100">
              <option value="user1">User 1</option>
              <option value="user2">User 2</option>
              <option value="user3">User 3</option>
            </select>
          </div>
          <div className="mb-6 bg-gray-200 p-2 rounded">
            <label htmlFor="eventParticipants" className="block text-gray-700 text-sm font-bold mb-2 text-left">Participants</label>
            <select id="eventParticipants" name="eventParticipants" multiple
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100">
              <option value="participant1">Participant 1</option>
              <option value="participant2">Participant 2</option>
              <option value="participant3">Participant 3</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" 
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventCreate;
