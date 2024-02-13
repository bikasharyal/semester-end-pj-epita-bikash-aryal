import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';

function Navbar({ isLoggedIn }) {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <FontAwesomeIcon icon={faCode} className="text-green-500 mr-2" /> {/* Icon color set to green */}
        <span>Eventure</span> {/* Example project name */}
      </div>
      <ul className="flex space-x-8 justify-center flex-1">
        <li>
          <Link to="/" className="hover:text-blue-400">Home</Link>
        </li>
        <li>
          <Link to="/create-event" className="hover:text-blue-400">Create Event</Link>
        </li>
        <li>
          <Link to="/event-details" className="hover:text-blue-400">Event Details</Link>
        </li>
        <li>
          <Link to="/create-task" className="hover:text-blue-400">Create Task</Link>
        </li>
      </ul>
      <div>
        {isLoggedIn ? (
          <Link to="/logout" className="hover:text-blue-400">Logout</Link>
        ) : (
          <Link to="/login" className="hover:text-blue-400">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
