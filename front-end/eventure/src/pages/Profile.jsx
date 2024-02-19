import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useMessage } from '../contexts/MessageContext';
import { getUser, updateUser, updateUserPassword, getEventByUserId } from "../services/EndpointService";

function Profile() {
  const { userId } = useAuth();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [changePasswordMode, setChangePasswordMode] = useState(false);
  const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '' });
  const { showMessage } = useMessage();
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUser(userId);
      const userEvents = await getEventByUserId(userId);
      setUser(userData?.data);
      setPastEvents(userEvents?.data?.pastEvents || []);
    };
    fetchData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      await updateUser(userId, user);
      showMessage('Profile updated successfully!', 'success');
      setEditMode(false);
    } catch (error) {
      showMessage('Failed to update profile', 'error');
    }
  };

  const handleChangePassword = async () => {
    try {
      await updateUserPassword(userId, passwords);
      showMessage('Password updated successfully!', 'success');
      setChangePasswordMode(false);
      setPasswords({ oldPassword: '', newPassword: '' });
    } catch (error) {
      showMessage('Failed to change password', 'error');
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setChangePasswordMode(false);
  };

  const toggleChangePasswordMode = () => {
    setChangePasswordMode(!changePasswordMode);
    setEditMode(false);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-200 min-h-screen p-8">
      <div className="container mx-auto max-w-6xl bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl font-bold text-gray-700 text-left mb-4">Profile Management</h1>

        {/* Display Email (non-editable) */}
        <DisplayField label="Email" value={user.email} />

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

        <div className="flex items-center justify-between">
          {!editMode && (<button onClick={toggleEditMode} className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700">
            Edit Profile
          </button>)}
          {editMode && (<button onClick={toggleEditMode} className="bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700">
            Cancel Profile Edit
          </button>)}
          {editMode && (
            <button onClick={handleSaveChanges} className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-red-700">
              Save Profile
            </button>
          )}
          {!changePasswordMode &&(
          <button onClick={toggleChangePasswordMode} className="bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-yellow-700">
            Change Password
          </button>
          )}
          {changePasswordMode &&(
            <button onClick={toggleChangePasswordMode} className="bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-red-700">
            Cancel Change Password
          </button>
          )}
        </div>

        {changePasswordMode && (
          <div className='mt-5 bg-gray-200 p-10'>
            <InputField label="Old Password" name="oldPassword" value={passwords.oldPassword} onChange={handlePasswordChange} type="password" />
            <InputField label="New Password" name="newPassword" value={passwords.newPassword} onChange={handlePasswordChange} type="password" />
            <button onClick={handleChangePassword} className="mt-4 bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-green-700">
              Update Password
            </button>
          </div>
        )}

        <h2 className="text-xl font-bold text-gray-700 text-left mt-8 mb-4">Past Events</h2>
        {/* Add Past Events Table */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pastEvents.map(event => (
              <tr key={event._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function InputField({ label, name, value, onChange, type="text" }) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-700 text-sm font-bold mb-2">{label}:</label>
      <input type={type} id={name} name={name} value={value} onChange={onChange}
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