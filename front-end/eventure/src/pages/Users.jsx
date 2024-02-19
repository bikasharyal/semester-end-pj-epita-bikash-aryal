import React, { useState, useEffect } from 'react';
import { getAllUsers, deleteUser } from "../services/EndpointService";
import { useNavigate } from 'react-router-dom';
import { useMessage } from '../contexts/MessageContext';
import AdminPanel from '../components/AdminPanel';

function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { showMessage } = useMessage();

  useEffect(() => {
    getAllUsers().then(response => {
      setUsers(response.data); // Adjust based on the actual response structure
    }).catch(error => {
      console.error('Failed to fetch users:', error);
      showMessage('Failed to fetch users!', 'error');
    });
  }, [showMessage]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
        setUsers(users.filter(user => user._id !== id));
        showMessage('User Deleted!', 'success');
      } catch (error) {
        console.error('Failed to delete user:', error);
        showMessage('Failed to delete user!', 'error');
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-200">
      <AdminPanel/>
      <div className="flex-1 p-8">
        <div className="container mx-auto max-w-7xl bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-700">User Management</h1>
            <button 
              onClick={() => navigate(`/users/new`)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                Add New User
            </button>
          </div>
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Role</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="bg-white">
                  <td className="px-4 py-2 border">{user.name}</td>
                  <td className="px-4 py-2 border">{user.email}</td>
                  <td className="px-4 py-2 border">{user.role}</td>
                  <td className="px-4 py-2 border text-center">
                    <button onClick={() => navigate(`/users/edit/${user._id}`)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mx-1">Edit</button>
                    <button onClick={() => handleDelete(user._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mx-1">Delete</button>
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

export default Users;
