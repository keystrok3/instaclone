import App from './App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './theme.js'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
);
