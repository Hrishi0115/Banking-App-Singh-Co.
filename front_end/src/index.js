import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; 
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter> 
  </React.StrictMode>
);

// Import BrowserRouter: This imports the BrowserRouter component from the react-router-dom package, which is needed to handle the dynamic routing in a web application.
// Wrap <App /> with BrowserRouter: By wrapping the <App /> component within <BrowserRouter>, you ensure that all routing functionalities are enabled throughout your application. This allows any component within <App /> to use routing hooks like useNavigate, useParams, or useLocation

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
