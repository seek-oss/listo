import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#e60278',
    },
    secondary: {
      main: '#0d3880',
    },
    error: {
      main: '#9556b7',
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    {' '}
    <App />
  </ThemeProvider>,
  document.getElementById('root'),
);
