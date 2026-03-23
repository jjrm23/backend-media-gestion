import React from 'react';
import ReactDOM from 'react-dom/client'; // Fíjate en el '/client'
import { App } from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

// La nueva forma de crear la raíz en React 18
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);