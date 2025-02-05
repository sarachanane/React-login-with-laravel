import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Componenets/App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="put yoo google auth client id "> 
    <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
