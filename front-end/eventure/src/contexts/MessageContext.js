// contexts/MessageContext.js
import React, { createContext, useContext, useState } from 'react';

const MessageContext = createContext();

export const useMessage = () => {
  const context = useContext(MessageContext);
  console.log(context); // Check what's being returned here
  return context;
};


export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState({ text: null, type: null });

  const showMessage = (text, type = 'success') => { // Default type is 'success'
    setMessage({ text, type });
    // Automatically clear the message after 5 seconds
    setTimeout(() => setMessage({ text: null, type: null }), 5000);
  };

  return (
    <MessageContext.Provider value={{ message, showMessage }}>
      {children}
    </MessageContext.Provider>
  );
};
