import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import { Providers } from './app/providers'
import { registerAllApps } from './apps'
import './styles/globals.css'
import './styles/theme.css'
import './styles/windows11.css'

registerAllApps()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>,
)
