import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { pdfjs } from 'react-pdf';

import Router from '~/router/Router';
import store from '~/redux/store';
import { fetchSession } from '~/redux/slicers/auth';

import '~/App.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

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
