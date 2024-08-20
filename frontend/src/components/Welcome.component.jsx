import React from 'react';

const WelcomeComponent = ({ onStart }) => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Welcome to your notes app!</h1>
      <p>This app allows you to create, edit and save your personal notes.</p>
      <button onClick={onStart}>Get started</button>
    </div>
  );
};

export default WelcomeComponent;
