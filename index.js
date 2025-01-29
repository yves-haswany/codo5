// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // Optional: Add your global styles
import App from './App';  // Import the App component

ReactDOM.render(
  <React.StrictMode>
    <App />  {/* Render the App component */}
  </React.StrictMode>,
  document.getElementById('root')  // This will target the root element in your HTML
);
