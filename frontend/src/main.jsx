import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
// import 'normalize.css';
import './index.css';
import configureStore from './store/store';
import csrfFetch, { restoreCSRF } from './store/csrf.js';
import * as sessionActions from './store/session';
import * as modalActions from './store/modals.js';
import * as productActions from './store/product.js';

const store = configureStore();

if (import.meta.env.NODE_ENV !== 'production') {
  restoreCSRF();
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
  window.modalActions = modalActions;
  window.productActions = productActions;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
