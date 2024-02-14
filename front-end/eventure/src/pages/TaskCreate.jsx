import React from 'react';

function TaskCreate() {
  return (
    <div className="bg-gray-200 min-h-screen p-8">
      <div className="container mx-auto max-w-6xl bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-700 text-left">Create New Task</h1>
        </div>
        <form>
          <div className="mb-4 bg-gray-200 p-2 rounded">
            <label htmlFor="relatedEvent" className="block text-gray-700 text-sm font-bold mb-2 text-left">Related Event</label>
            <select id="relatedEvent" name="relatedEvent"
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100">
              <option value="event1">Event 1: Tech Conference</option>
              <option value="event2">Event 2: Annual Meetup</option>
              {/* Additional event options can be added here */}
            </select>
          </div>
          <div className="mb-4 bg-gray-200 p-2 rounded">
            <label htmlFor="taskTitle" className="block text-gray-700 text-sm font-bold mb-2 text-left">Task Title</label>
            <input type="text" id="taskTitle" name="taskTitle" 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100" />
          </div>
          <div className="mb-4 bg-gray-200 p-2 rounded">
            <label htmlFor="taskDescription" className="block text-gray-700 text-sm font-bold mb-2 text-left">Task Description</label>
            <textarea id="taskDescription" name="taskDescription"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100" ></textarea>
          </div>
          <div className="mb-4 bg-gray-200 p-2 rounded">
            <label htmlFor="taskDeadline" className="block text-gray-700 text-sm font-bold mb-2 text-left">Deadline</label>
            <input type="date" id="taskDeadline" name="taskDeadline" 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100" />
          </div>
          <div className="mb-4 bg-gray-200 p-2 rounded">
            <label htmlFor="taskAssignee" className="block text-gray-700 text-sm font-bold mb-2 text-left">Assignee</label>
            <select id="taskAssignee" name="taskAssignee"
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100">
              <option value="user1">User 1</option>
              <option value="user2">User 2</option>
              <option value="user3">User 3</option>
              {/* Additional user options can be added here */}
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" 
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700">
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskCreate;
