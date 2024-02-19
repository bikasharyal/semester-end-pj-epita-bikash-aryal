import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { postRegister } from '../services/EndpointService';
import { useMessage } from '../contexts/MessageContext';

function Auth() {
  const { showMessage } = useMessage();
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Simple front-end validation (e.g., check if fields are filled)
    if (!isLogin && (!email || !password || !name))  {
      showMessage('Invalid fields! Please check all the fields.','error');
      return;
    }
    if(!isLogin && password !== confirmPassword){
      showMessage('Password does not match! Please enter again.','error');
      return;
    }

    try {
      if (isLogin) {
        // Call login service
        const response = await login(email, password);
        console.log('Login Success:', response);
        showMessage('Login Success!','success');
        navigate('/dashboard');
        // Redirect or state update here, e.g., useNavigate() from react-router-dom
      } else {
        // Call register service
        const response = await postRegister({ name, email, password });
        console.log('Registration Success:', response.data);
        showMessage('Registration Success!','success');

        setIsLogin(!isLogin);
        setPassword('');
      }
    } catch (error) {
      console.error('Authentication Error:', error.response ? error.response.data : error.message);
      // Handle error, e.g., show error message to user
      if(!isLogin){
        showMessage('Registration Failed!','error');
      }
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen p-8">
      <div className="container mx-auto max-w-2xl bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl font-bold text-gray-700 text-left mb-4">{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4 bg-gray-200 p-2 rounded">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2 text-left">Full Name <span className="text-red-700 text-sm font-bold">*</span></label>
            <input type="text" id="name" name="name" required value={name} onChange={(e) => setFullName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100" />
          </div>)} 
          <div className="mb-4 bg-gray-200 p-2 rounded">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2 text-left">Email <span className="text-red-700 text-sm font-bold">*</span></label>
            <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100" />
          </div>                            
          <div className="mb-4 bg-gray-200 p-2 rounded">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2 text-left">Password<span className="text-red-700 text-sm font-bold">*</span></label>
            <input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100" />
          </div>
          {!isLogin && (            
            <div className="mb-4 bg-gray-200 p-2 rounded">
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2 text-left">Confirm Password<span className="text-red-700 text-sm font-bold">*</span></label>
            <input type="password" id="confirmPassword" name="confirmPassword" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100" />
          </div>
          )} 
          <div className="flex items-center justify-between">
            <button type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700">
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          {isLogin ? (
            <p>Don't have an account? <a href="#!" onClick={handleToggle} className="text-blue-500 hover:text-blue-800">Sign Up</a></p>
          ) : (
            <p>Already have an account? <a href="#!" onClick={handleToggle} className="text-blue-500 hover:text-blue-800">Login</a></p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Auth;
