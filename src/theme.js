import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#002A54', // Navy Blue from logo
      light: '#1e4b7a',
      dark: '#001a35',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#C5A059', // Gold from logo
      light: '#dfc086',
      dark: '#9d7c35',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F8F9FA', // Subtle off-white background
      paper: '#FFFFFF',   // Card / Paper white background
    },
    text: {
      primary: '#1A2E40',   // Deep slate / dark navy text
      secondary: '#627D98', // Cool gray-blue secondary text
    },
    divider: '#E4E7EB',
  },
  typography: {
    fontFamily: '"Outfit", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      color: '#002A54',
    },
    h2: {
      fontWeight: 700,
      color: '#002A54',
    },
    h3: {
      fontWeight: 700,
      color: '#002A54',
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
    },
    button: {
      textTransform: 'none', // Disable capital letters for modern feel
      fontWeight: 600,
      borderRadius: '8px',
    },
  },
  shape: {
    borderRadius: 8, // 8px default rounded corners
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '8px 16px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 12px rgba(0, 42, 84, 0.15)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #002A54 0%, #001f3e 100%)',
        },
        containedSecondary: {
          background: 'linear-gradient(135deg, #C5A059 0%, #b28c46 100%)',
          color: '#ffffff',
          '&:hover': {
            boxShadow: '0px 4px 12px rgba(197, 160, 89, 0.25)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.04)',
          border: '1px solid #E4E7EB',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0px 12px 30px rgba(0, 42, 84, 0.08)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            '&:hover fieldset': {
              borderColor: '#C5A059',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#002A54',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#002A54',
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.03)',
          borderBottom: '1px solid #E4E7EB',
        },
      },
    },
  },
});

export default theme;
