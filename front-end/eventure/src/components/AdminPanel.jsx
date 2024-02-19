import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminPanel = () => {
  const { userRole } = useAuth();

  return userRole === 'admin' ? (
    <div className="w-40 bg-gray-800 p-4 text-white">
      <h3 className="text-sm font-semibold mb-2">Manage Resources</h3>
      <ul className="space-y-2">
        <li>
          <Link to="/users" className="hover:text-green-400 block">Users</Link>
        </li>
        <li>
          <Link to="/events" className="hover:text-green-400 block">Events</Link>
        </li>
        <li>
          <Link to="/tasks" className="hover:text-green-400 block">Tasks</Link>
        </li>
      </ul>
    </div>
  ) : null;
};

export default AdminPanel;
