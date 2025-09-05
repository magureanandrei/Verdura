import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { verduraTheme } from './theme';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeProvider theme={verduraTheme}>
      <CssBaseline /> {/* Applies theme background and resets */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
