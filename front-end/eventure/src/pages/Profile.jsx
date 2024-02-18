import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
// import { useMessage } from '../contexts/MessageContext';

// Simulated user data and events
const userData = {
  email: 'user@example.com',
  name: 'John Doe',
  contact: '123-456-7890',
  address: '123 Main St, Anytown, AT 12345',
  preferences: 'Email Notifications',
};

const userEvents = [
  { id: 1, name: 'Event 1: Tech Conference', date: '2024-02-15' },
  { id: 2, name: 'Event 2: Web Development Workshop', date: '2024-03-05' },
];

function Profile() {
  const { userId } = useAuth();
  const [user, setUser] = useState(userData);
  const [editMode, setEditMode] = useState(false);
  // const { showMessage } = useMessage();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div className="bg-gray-200 min-h-screen p-8">
      <div className="container mx-auto max-w-6xl bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl font-bold text-gray-700 text-left mb-4">Profile Management</h1>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <div className="px-3 py-2 bg-gray-200 rounded">{user.email}</div>
        </div>

        {/* Editable fields */}
        {editMode ? (
          <>
            <InputField label="Name" name="name" value={user.name} onChange={handleChange} />
            <InputField label="Contact" name="contact" value={user.contact} onChange={handleChange} />
            <InputField label="Address" name="address" value={user.address} onChange={handleChange} />
            <InputField label="Preferences" name="preferences" value={user.preferences} onChange={handleChange} />
          </>
        ) : (
          <>
            <DisplayField label="Name" value={user.name} />
            <DisplayField label="Contact" value={user.contact} />
            <DisplayField label="Address" value={user.address} />
            <DisplayField label="Preferences" value={user.preferences} />
          </>
        )}

        <button onClick={toggleEditMode} className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700">
          {editMode ? 'Save Changes' : 'Edit Profile'}
        </button>

        <h2 className="text-xl font-bold text-gray-700 text-left mt-8 mb-4">Past Events</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {userEvents.map((event) => (
              <tr key={event.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function InputField({ label, name, value, onChange }) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-700 text-sm font-bold mb-2">{label}:</label>
      <input type="text" id={name} name={name} value={value} onChange={onChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100" />
    </div>
  );
}

function DisplayField({ label, value }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">{label}:</label>
      <div className="px-3 py-2 bg-gray-200 rounded">{value}</div>
    </div>
  );
}

export default Profile;
