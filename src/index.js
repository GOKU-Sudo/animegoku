import { GlobalContextProvider } from './context/GlobalContext';
import GlobalCss from './GlobalCss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <GlobalCss/>
    <GlobalContextProvider>
      <App />
     </GlobalContextProvider>
  </React.StrictMode>
);

reportWebVitals();
