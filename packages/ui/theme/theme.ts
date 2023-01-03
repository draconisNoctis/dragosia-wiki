import { createTheme } from '@mui/material/styles';

// Create a theme instance.
export const THEME = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#330500'
        },
        secondary: {
            main: '#00AA00'
        },
        error: {
            main: '#AA0000'
        }
    },
    typography: {
        h1: {
            fontSize: '4rem',
            letterSpacing: 0,
            fontWeight: 'normal',
            lineHeight: '1.6',
            marginBottom: '.8rem'
        },
        h2: {
            fontSize: '3.2rem',
            letterSpacing: 0,
            fontWeight: 'normal',
            lineHeight: '1.6',
            marginBottom: '.8rem'
        },
        h3: {
            fontSize: '2.4rem',
            letterSpacing: 0,
            fontWeight: 'bold',
            lineHeight: '1.6',
            marginBottom: '.8rem'
        },
        h4: {
            fontSize: '2rem',
            letterSpacing: 0,
            fontWeight: 'bold',
            lineHeight: '1.6',
            marginBottom: '.8rem'
        },
        h5: {
            fontSize: '1.6rem',
            letterSpacing: 0,
            fontWeight: 'bold',
            lineHeight: '1.6',
            marginBottom: '.8rem'
        },
        h6: {
            fontSize: '1.2rem',
            letterSpacing: 0,
            fontWeight: 'bold',
            lineHeight: '1.6',
            marginBottom: '.8rem'
        },
        subtitle1: {
            fontSize: '1.2rem'
        },
        subtitle2: {
            fontSize: '1.2rem',
            fontWeight: 'bold'
        },
        body1: {
            fontSize: '1.2rem'
        },
        body2: {
            fontSize: '1rem'
        },
        button: {
            fontSize: '1.4rem',
            fontWeight: 'bold'
        },
        caption: {
            fontSize: '0.8rem'
        },
        overline: {
            fontSize: '1.2rem'
        }
    }
});
