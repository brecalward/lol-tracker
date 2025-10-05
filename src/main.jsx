import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AccountContext } from './contexts/accountContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <AccountContext value={}>

    <App />
    </AccountContext>
  </StrictMode>,
)
