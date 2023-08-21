import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import Router from '@/router/Router';
import store from '@/redux/store';

import '~/App.css';

function App() {
  return (
    <Provider store={store}>
      <Router />
      <ToastContainer position="bottom-right" />
    </Provider>
  );
}

export default App;
