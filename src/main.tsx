/* eslint-disable no-restricted-globals */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { inject } from '@vercel/analytics';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { webVitals } from './vitals';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);

const analyticsId = import.meta.env.VERCEL_ANALYTICS_ID;

if (analyticsId) {
  webVitals({
    path: location.pathname,
    params: location.search,
    analyticsId,
    debug: import.meta.env.DEV,
  });
}

if (import.meta.env.PROD) {
  inject();
}
