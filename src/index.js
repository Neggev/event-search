import React from 'react';
import ReactDOM from 'react-dom/client';
import APIContext from './components/api/Axios'
import CountriesContext from './components/countriesInfo/Countries'
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CountriesContext>
      <APIContext>
        <App />
      </APIContext>
    </CountriesContext>
  </React.StrictMode>
);

