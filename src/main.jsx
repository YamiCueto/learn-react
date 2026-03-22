import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './i18n'
import './index.css'
import App from './App.jsx'

// Note: StrictMode removed — kaboom WebGL context is incompatible with
// StrictMode's double-invocation of effects in development mode.
createRoot(document.getElementById('root')).render(
  <HashRouter>
    <App />
  </HashRouter>,
)
