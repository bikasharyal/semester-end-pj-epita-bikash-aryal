import React, { useState } from 'react';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform validation and send data to server
  };

  return (
    <div className="bg-gray-200 min-h-screen p-8">
      <div className="container mx-auto max-w-7xl bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl font-bold text-gray-700 text-left">{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form onSubmit={handleSubmit}>
          {/* Shared fields */}
          <div className="mb-4 bg-gray-200 p-2 rounded">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2 text-left">Email</label>
            <input type="email" id="email" name="email" required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100" />
          </div>
          {!isLogin && (
            <div className="mb-4 bg-gray-200 p-2 rounded">
              <label htmlFor="confirmEmail" className="block text-gray-700 text-sm font-bold mb-2 text-left">Confirm Email</label>
              <input type="email" id="confirmEmail" name="confirmEmail" required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100" />
            </div>
          )}
          <div className="mb-4 bg-gray-200 p-2 rounded">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2 text-left">Password</label>
            <input type="password" id="password" name="password" required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100" />
          </div>
          <div className="flex items-center justify-between">
            <button type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700">
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
            {isLogin && (
              <a href="#!" onClick={handleToggle} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                Forgot Password?
              </a>
            )}
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
