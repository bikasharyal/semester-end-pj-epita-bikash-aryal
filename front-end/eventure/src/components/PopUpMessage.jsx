import React from 'react';
import { useMessage } from '../contexts/MessageContext';

function PopUpMessage() {
  const { message, showMessage } = useMessage();

  if (!message.text) return null;

  const title = message.type === 'error' ? 'Error' : 'Success';
  const backgroundColor = message.type === 'error' ? 'pink' : 'lightgreen';

  const handleCloseClick = () => {
    showMessage(null); // Clear the message
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '300px',
      minHeight: '100px',
      backgroundColor,
      padding: '10px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      color: message.type === 'error' ? 'darkred' : 'darkgreen',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start', // Align items to the start of the cross axis
    }}>
      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between', // Space out title and close button
        alignItems: 'center',
        marginBottom: '10px', // Add some space below the header
      }}>
        <strong>{title}</strong>
        <button onClick={handleCloseClick} style={{
          background: 'none',
          border: 'none',
          color: 'inherit',
          cursor: 'pointer',
          padding: 0,
        }}>×</button>
      </div>
      <div>
        {message.text}
      </div>
    </div>
  );
}

export default PopUpMessage;
