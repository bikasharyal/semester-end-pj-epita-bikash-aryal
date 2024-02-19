import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <FontAwesomeIcon icon={faCode} className="text-green-500 mr-2" /> {/* Icon color set to green */}
        <Link to="/" className="hover:text-green-400"><span>Eventure</span></Link>
      </div>
      <ul className="flex space-x-8 justify-center flex-1">
        <li>
          <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
        </li>
        <li>
          <Link to="events" className="hover:text-blue-400">Events</Link>
        </li>
        <li>
          <Link to="/event-details" className="hover:text-blue-400">Event Details</Link>
        </li>
        <li>
          <Link to="/tasks" className="hover:text-blue-400">Tasks</Link>
        </li>
        <li>
          <Link to="/profile" className="hover:text-blue-400">Profile</Link>
        </li>
      </ul>
      <div>
        {isAuthenticated ? (
          <button onClick={logout} className="hover:text-blue-400">Logout</button>
        ) : (
          <Link to="/login" className="hover:text-blue-400">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
