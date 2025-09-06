import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { verduraDarkTheme } from './theme';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeProvider theme={verduraDarkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
