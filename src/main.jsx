import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router';
import { AuthProvider } from './contexts/AuthContext';
import App from './App';
import './styles.css';


// Inside your existing render:
<HashRouter>
  <AuthProvider><App /></AuthProvider>
</HashRouter>

// Composition: providers wrap descendants that need routing or shared user state.
// StrictMode reruns effects in development to help reveal missing cleanup.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <AuthProvider><App /></AuthProvider>
    </HashRouter>
  </StrictMode>,
);
