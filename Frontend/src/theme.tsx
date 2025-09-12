import { createTheme } from '@mui/material/styles';

export const verduraTheme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#4CAF50',        
      light: '#81C784',       
      dark: '#388E3C',        
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#66BB6A',        
      light: '#A5D6A7',       
      dark: '#2E7D32',        
      contrastText: '#ffffff',
    },
    success: {
      main: '#43A047',
      light: '#76C279',
      dark: '#2E7D32',
    },
    background: {
      default: '#fffff3',     
      paper: '#ffffff',
    },
    text: {
      primary: '#1B5E20',     
      secondary: '#2E7D32',   
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#4CAF50',
          boxShadow: '0 2px 4px rgba(76, 175, 80, 0.2)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
        contained: {
          backgroundColor: '#4CAF50',
          '&:hover': {
            backgroundColor: '#45A049',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

export const verduraDarkTheme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#66BB6A',
      light: '#81C784',
      dark: '#4CAF50',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#81C784',
      light: '#A5D6A7',
      dark: '#66BB6A',
      contrastText: '#000000',
    },
    background: {
      default: '#dcfce7',
      paper: '#2E7D32',
    },
    text: {
      primary: '#E8F5E8',
      secondary: '#C8E6C9',
    },
  },
});