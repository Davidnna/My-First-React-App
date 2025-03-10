import React from 'react';
import ReactDOM from 'react-dom/client';
import './basic.css';
import './style.css';
import App from './App';

const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

// Mount the App component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // CHALLENGE: add your own name and emoji to the website
  <React.StrictMode>
    <App name="David" emoji="✈️" />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
reportWebVitals(console.log);