import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from "react-redux";
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
// import 'dotenv/config'
// axios.defaults.baseURL = 'http://localhost:3001/api';
// axios.defaults.baseURL = 'https://notflix-server-nine.vercel.app/api';
// "proxy": "https://notflix-server-nine.vercel.app/api"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      <ToastContainer />
    </PersistGate>
    </Provider>
  </React.StrictMode>
);

