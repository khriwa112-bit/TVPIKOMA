import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App.tsx';
import {WhatsAppProvider} from '../contexts/WhatsAppContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <WhatsAppProvider>
        <App />
      </WhatsAppProvider>
    </BrowserRouter>
  </StrictMode>,
);
