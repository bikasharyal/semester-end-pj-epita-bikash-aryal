import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUser, postUser, updateUser } from '../services/EndpointService';
import { useMessage } from '../contexts/MessageContext';
import AdminPanel from '../components/AdminPanel';

function User() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'normal',
    contact: '',
    address: '',
    preferences: '',
    password: '', // Include password only for new users
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const { showMessage } = useMessage();
  const isNewUser = !id;

  useEffect(() => {
    if (!isNewUser) {
      const fetchUser = async () => {
        try {
          const userData = await getUser(id);
          setFormData({ ...userData.data, password: '' }); // Exclude password for edit
        } catch (error) {
          console.error('Error fetching user data:', error);
          showMessage('Error fetching user data.', 'error');
        }
      };
      fetchUser();
    }
  }, [id, isNewUser, showMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isNewUser) {
        await postUser(formData);
        showMessage('User created successfully!', 'success');
      } else {
        await updateUser(id, formData);
        showMessage('User updated successfully!', 'success');
      }
      navigate('/users');
    } catch (error) {
      console.error('Failed to save user:', error);
      showMessage('Failed to save user.', 'error');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-200">
      <AdminPanel/>
      <div className="flex-1 p-8">
        <div className="container mx-auto max-w-6xl bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-xl font-semibold mb-4">{isNewUser ? 'Add New User' : 'Edit User'}</h1>
          <form onSubmit={handleSubmit}>
            {/* Form fields for user details */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name<span className="text-red-700 text-sm font-bold">*</span>:</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            </div>
            
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email<span className="text-red-700 text-sm font-bold">*</span>:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>

            <div className="mb-4">
            <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">Role<span className="text-red-700 text-sm font-bold">*</span>:</label>
            <select id="role" name="role" value={formData.role} onChange={handleChange} className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <option value="normal">Normal</option>
                <option value="admin">Admin</option>
            </select>
            </div>

            <div className="mb-4">
            <label htmlFor="contact" className="block text-gray-700 text-sm font-bold mb-2">Contact:</label>
            <input type="text" id="contact" name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact Number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>

            <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Address:</label>
            <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>

            <div className="mb-4">
            <label htmlFor="preferences" className="block text-gray-700 text-sm font-bold mb-2">Preferences:</label>
            <textarea id="preferences" name="preferences" value={formData.preferences} onChange={handleChange} placeholder="Preferences" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
            </div>

            
            {isNewUser && (
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password<span className="text-red-700 text-sm font-bold">*</span>:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
              </div>
            )}

            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              {isNewUser ? 'Create User' : 'Update User'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default User;
