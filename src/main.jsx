import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactDOM from 'react-dom/client';
import Approuter from './Approuter.jsx';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import './index.css';
import { BrowserRouter } from 'react-router-dom'; 
import cartReducer, { gettotal } from './redux/cartSlice.js';


const store = configureStore({
  reducer: {
    cart:cartReducer
  }
});
store.dispatch(gettotal());
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <ToastContainer></ToastContainer>
      <Provider store={store}>
        <Approuter />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
