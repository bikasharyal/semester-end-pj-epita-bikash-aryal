import React from 'react';

function Home() {
  return (
    <div className="bg-gray-200 min-h-screen p-8">
      <div className="container mx-auto max-w-7xl bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 text-left">
        <h1 className="text-3xl font-bold text-gray-700 mb-6">Welcome to Eventure!</h1>
        <p className="mb-4">
          Eventure is your one-stop platform for organizing and managing events seamlessly.
          From creating new events to managing tasks and participants, Eventure offers a comprehensive
          suite of tools to streamline your event management process.
        </p>
        <p className="mb-4">
          Sign up today to start creating your own events, or log in to view and manage existing ones.
        </p>
        {/* Additional content and descriptions here */}
      </div>
    </div>
  );
}

export default Home;
