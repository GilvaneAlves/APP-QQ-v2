import React from 'react'
import ReactDOM from 'react-dom/client'
import Routes from './routes/Routes'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
)

// Register Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register(new URL('./service-worker.ts', import.meta.url), {
    type: 'module'
  })
    .then(() => {
      console.log('Service Worker registered successfully');
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}