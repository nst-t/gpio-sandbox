import * as React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { App } from './App';

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept();
}

ReactDOM.render(
  <>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <App />
  </>,
  document.getElementById('root'),
);
