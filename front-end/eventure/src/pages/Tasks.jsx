import React, { useState, useEffect } from 'react';
import { getAllTasks, deleteTask } from "../services/EndpointService";
import { useNavigate } from 'react-router-dom';
import { useMessage } from '../contexts/MessageContext';
import AdminPanel from '../components/AdminPanel';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const { showMessage } = useMessage();

  useEffect(() => {
    getAllTasks().then(response => {
      setTasks(response.data); // Adjust based on actual response structure
    });
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        setTasks(tasks.filter(task => task._id !== id));
        showMessage('Task Deleted!', 'success');

      } catch (error) {
        console.error('Failed to delete task:', error);
        showMessage('Failed to delete task!', 'error');

      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-200">
      <AdminPanel/>
      <div className="flex-1 p-8">
        <div className="container mx-auto max-w-7xl bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-700">Tasks Management</h1>
            <button 
              onClick={() => navigate(`/create-task`)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
              Create New Task
            </button>
          </div>  
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 border">Title</th>
                <th className="px-4 py-2 border">Deadline</th>
                <th className="px-4 py-2 border">Assigned To</th>
                <th className="px-4 py-2 border">Event Name</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index} className="bg-white">
                  <td className="px-4 py-2 border">{task.title}</td>
                  <td className="px-4 py-2 border">{new Date(task.deadline).toLocaleDateString()}</td>
                  <td className="px-4 py-2 border">{task.assignedToName}</td>
                  <td className="px-4 py-2 border">{task.eventName}</td>
                  <td className="px-4 py-2 border">{task.status}</td>
                  <td className="px-4 py-2 border text-center">
                    <button onClick={() => navigate(`/edit-task/${task._id}`)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mx-1">Edit</button>
                    <button onClick={() => handleDelete(task._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mx-1">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Tasks;
