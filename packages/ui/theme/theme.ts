import { createTheme, responsiveFontSizes } from '@mui/material/styles';

declare module '@mui/material/styles/createPalette' {
    interface Palette {
        mainHeader: { main: string; contrastText: string };
        subHeader: { main: string; contrastText: string };
    }

    interface TypeBackground {
        page: string;
        button: string;
        paperGradient: string;
    }

    interface PaletteOptions {
        mainHeader: { main: string; contrastText: string };
        subHeader: { main: string; contrastText: string };
    }

    interface TypeText {
        accent: string;
    }
}

const palette = {
    mode: 'dark',
    primary: {
        main: '#330500'
    },
    secondary: {
        main: '#00AA00'
    },
    mainHeader: {
        main: '#383630',
        contrastText: '#ab9a8a'
    },
    subHeader: {
        main: '#eadac3',
        contrastText: '#625244'
    },
    background: {
        page: '#0d0c0d',
        paper: '#2b3033',
        paperGradient: 'linear-gradient(210deg, #3b3935 0%, #16232c 100%)',
        button: '#151719'
    },
    text: {
        primary: '#e1e0da',
        secondary: '#54534f',
        accent: '#f5e9b1'
    }
} as const;

export const THEME = responsiveFontSizes(
    createTheme({
        palette,
        typography: {
            allVariants: {
                color: palette.text.primary,
                lineHeight: '1.6'
            },
            h1: {
                fontFamily: 'Almendra',
                fontSize: '4rem',
                letterSpacing: 0,
                fontWeight: 'bold',
                lineHeight: '1.2',
                marginBottom: '.8rem',
                color: palette.text.accent
            },
            h2: {
                fontFamily: 'Almendra',
                fontSize: '3.2rem',
                letterSpacing: 0,
                fontWeight: 'bold',
                lineHeight: '1.2',
                marginBottom: '.8rem',
                color: palette.text.accent
            },
            h3: {
                fontFamily: 'Almendra',
                fontSize: '2.4rem',
                letterSpacing: 0,
                fontWeight: 'bold',
                lineHeight: '1.2',
                marginBottom: '.8rem',
                color: palette.text.accent
            },
            h4: {
                fontFamily: 'Almendra',
                fontSize: '2rem',
                letterSpacing: 0,
                fontWeight: 'bold',
                lineHeight: '1.2',
                marginBottom: '.8rem',
                color: palette.text.accent
            },
            h5: {
                fontFamily: 'Almendra',
                fontSize: '1.6rem',
                letterSpacing: 0,
                fontWeight: 'bold',
                lineHeight: '1.2',
                marginBottom: '.8rem',
                color: palette.text.accent
            },
            h6: {
                fontFamily: 'Almendra',
                fontSize: '1.2rem',
                letterSpacing: 0,
                fontWeight: 'bold',
                lineHeight: '1.2',
                marginBottom: '.8rem',
                color: palette.text.accent
            },
            subtitle1: {
                fontFamily: 'Almendra',
                fontSize: '1.2rem',
                marginBottom: '.8rem',
                color: palette.text.secondary
            },
            subtitle2: {
                fontFamily: 'Almendra',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                marginBottom: '.8rem',
                color: palette.text.secondary
            },
            body1: {
                fontSize: '1.2rem'
            },
            body2: {
                fontSize: '1rem'
            },
            button: {
                fontFamily: 'Almendra',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                textTransform: 'none'
            },
            caption: {
                fontSize: '0.8rem'
            },
            overline: {
                fontFamily: 'Almendra',
                fontSize: '1.2rem',
                color: palette.text.accent
            }
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: ({ ownerState }) => ({
                        minWidth: '120px',
                        textDecoration: 'none',
                        ...(ownerState.variant === 'outlined' && {
                            background: palette.background.button,
                            color: palette.text.primary,
                            border: 'none',
                            boxShadow: `0 0 0 2px ${palette.text.accent}, 0 0 0 3px ${palette.background.button}`,
                            borderRadius: '16px',
                            position: 'relative',
                            transformStyle: 'preserve-3d',
                            '&:before,&:after': {
                                content: '""',
                                position: 'absolute',
                                background: palette.text.accent,
                                height: '4px',
                                width: '4px',
                                transform: 'rotate(45deg) translateZ(-1px)',
                                boxShadow: `0 0 0 1px ${palette.background.button}`,
                                transition: 'all .2s ease-in-out'
                            },
                            '&:before': {
                                left: '-2px'
                            },
                            '&:after': {
                                right: '-2px'
                            },
                            '&:hover': {
                                background: palette.background.button,
                                opacity: 0.8,
                                border: 'none',
                                '&:before': {
                                    left: '-8px'
                                },
                                '&:after': {
                                    right: '-8px'
                                }
                            }
                        })
                    })
                }
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundImage: palette.background.paperGradient
                    }
                }
            },
            MuiLink: {
                styleOverrides: {
                    root: {
                        textDecoration: 'none'
                    }
                }
            }
        }
    })
);
