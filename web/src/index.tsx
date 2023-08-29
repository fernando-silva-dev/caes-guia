import React from 'react';
import ReactDOM from 'react-dom/client';

import 'react-toggle/style.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import App from './App';

const root = document.getElementById('root');
if (root != null) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
