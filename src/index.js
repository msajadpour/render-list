import React from 'react';
import ReactDOM from 'react-dom';

// components
import App from './App';
import { store } from './app/store.tsx';
import { Provider } from 'react-redux';

// Styles
import '../node_modules/bootstrap/dist/css/bootstrap.rtl.min.css';
import './assets/scss/main.scss';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

