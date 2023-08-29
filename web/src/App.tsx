import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import Router from '~/router/Router';
import store from '~/redux/store';
import { fetchSession } from '~/redux/slicers/auth';

import '~/App.css';

function App() {
  useEffect(() => {
    store.dispatch(fetchSession());
  });

  return (
    <Provider store={store}>
      <Router />
      <ToastContainer position="bottom-right" />
    </Provider>
  );
}

export default App;
