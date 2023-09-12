import React from 'react';
import ReactDOM from 'react-dom/client';
// external imports
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { HelmetProvider } from 'react-helmet-async';
// internal imports
import './index.css';
import App from './App';
import { appointmentStore } from './utils/store';

const googleClientID = `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={appointmentStore}>
        <GoogleOAuthProvider clientId={googleClientID}>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </GoogleOAuthProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
