import React from 'react';
import ReactDOM from 'react-dom/client'; // Use the new ReactDOM API
import App from './App';
import { createGlobalStyle } from 'styled-components'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);


const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);
