import React from 'react';
import ReactDOM from 'react-dom';
import { RelayEnvironmentProvider } from 'react-relay';

import './index.css';
import App from './App';
import environment from './environment';


ReactDOM.render(
  <RelayEnvironmentProvider environment={environment}>
    <App />
  </RelayEnvironmentProvider>,
  document.getElementById('root')
);
