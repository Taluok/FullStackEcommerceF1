import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ShopContextProvider from './Context/ShopContex';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root')); 
root.render(
  <React.StrictMode>
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
  </React.StrictMode>,
);

reportWebVitals();




