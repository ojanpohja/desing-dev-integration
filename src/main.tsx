import '@mantine/core/styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { mantineTheme } from './theme/mantine-theme';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider theme={mantineTheme} defaultColorScheme="auto">
      <App />
    </MantineProvider>
  </React.StrictMode>
);