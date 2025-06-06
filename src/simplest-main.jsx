import React from 'react';
import ReactDOM from 'react-dom/client';
import SimplestApp from './SimplestApp';
import './index.css'; // 全局CSS

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SimplestApp />
  </React.StrictMode>
); 