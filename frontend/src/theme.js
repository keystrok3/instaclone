import { createTheme } from '@mui/material/styles';

// Instagram's font is 'Instagram Sans', but 'Roboto' is a safe, standard fallback.
// You would need to host 'Instagram Sans' yourself for full accuracy.
const FONT_FAMILY = '"Roboto", "Helvetica", "Arial", sans-serif';

// The core theme colors of Instagram
const palette = {
  primary: {
    main: '#0095F6', // Instagram Blue
  },
  secondary: {
    main: '#DBDBDB', // Light Grey for borders/dividers
  },
  text: {
    primary: '#262626', // Primary Text (Black)
    secondary: '#8e8e8e', // Secondary Text (Grey)
  },
  background: {
    default: '#FAFAFA', // Main background
    paper: '#FFFFFF', // Component background (e.g., Posts)
  },
  error: {
    main: '#ED4956', // Red for errors/likes
  },
};

/**
 * Material-UI theme inspired by Instagram's design language.
 */
export const theme = createTheme({
  palette: palette,
  typography: {
    fontFamily: FONT_FAMILY,
    h1: {
      fontWeight: 600,
      fontSize: '2.2rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '1.8rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.4rem',
    },
    // Used for usernames in posts, profile headers
    subtitle1: {
      fontWeight: 600,
      fontSize: '1rem',
    },
    // Used for general post text, descriptions
    body1: {
      fontSize: '1rem',
    },
    // Used for secondary info, timestamps, "View all comments"
    caption: {
      fontSize: '0.8rem',
      color: palette.text.secondary,
    },
    button: {
      textTransform: 'none', // Buttons in IG are not typically all-caps
      fontWeight: 600,
    },
  },
  // Overriding default component styles
  components: {
    // --- App Bar / Header
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: palette.background.paper,
          borderBottom: `1px solid ${palette.secondary.main}`,
          boxShadow: 'none',
          color: palette.text.primary,
        },
      },
    },
    // --- Buttons
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '6px 16px',
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#007bcf', // A slightly darker blue on hover
          },
        },
      },
    },
    // --- Text Fields
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          backgroundColor: '#FAFAFA',
          fontSize: '0.9rem',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: palette.secondary.main,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#C7C7C7', // Slightly darker border on hover
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#A8A8A8', // Even darker for focus
            borderWidth: '1px',
          },
        },
      },
    },
    // --- Paper / Cards
    MuiPaper: {
      styleOverrides: {
        root: {
          // Default styling for Paper components, like Post cards
          border: `1px solid ${palette.secondary.main}`,
          borderRadius: 8,
        },
      },
    },
  },
});
