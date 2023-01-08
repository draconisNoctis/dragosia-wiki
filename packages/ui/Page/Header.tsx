import { AppBar, Box, Toolbar } from '@mui/material';
import React from 'react';

import Noise from '../assets/noise.svg';
import { Link } from '../wiki';
import { AuthMenu } from '../wiki/AuthMenu';

export const PageHeader: React.FunctionComponent<React.PropsWithChildren<{ title: React.ReactNode }>> = ({ children, title }) => {
    return (
        <Box
            sx={{
                zIndex: '10',
                position: 'relative',
                boxShadow: '0 0 15px 5px rgba(0, 0, 0, .6)',
                mt: { md: 4 },
                borderTopLeftRadius: { md: '16px' }
            }}>
            <AppBar position="static" sx={{ borderTopLeftRadius: { md: '16px' } }}>
                <Toolbar
                    sx={{
                        bgcolor: 'mainHeader.main',
                        gap: 4,
                        flexGrow: 1,
                        px: {
                            xs: 2,
                            sm: 4,
                            md: 'calc((100vw - 800px) / 2 + 16px)'
                        },
                        '> a': { color: 'mainHeader.contrastText', '&:hover': { color: 'text.primary' } }
                    }}>
                    <Link href="/" sx={{ typography: 'h1', mb: 0 }}>
                        {title}
                    </Link>
                    <Link href="/wiki">Wiki</Link>
                    <Link href="/regelwerk">Regelwerk</Link>
                    <AuthMenu sx={{ ml: 'auto' }} />
                </Toolbar>
                <Toolbar
                    variant="dense"
                    sx={{
                        bgcolor: 'subHeader.main',
                        gap: 4,
                        flexGrow: 1,
                        px: {
                            xs: 2,
                            sm: 4,
                            md: 'calc((100vw - 800px) / 2 + 16px)'
                        },
                        '> a': { color: 'subHeader.contrastText', '&:hover': { color: 'text.secondary' } }
                    }}>
                    {children}
                </Toolbar>
            </AppBar>
            <Box sx={{ width: '100%', display: 'flex', '& > *': { flexGrow: 1 } }}>
                <Box
                    sx={{
                        height: '15px',
                        width: '100%',
                        position: 'relative',
                        backgroundImage: `url(${Noise.src})`,
                        backgroundSize: '650px',
                        '&:after': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: `linear-gradient(
                                to bottom,
                                rgba(234, 218, 195, 0.9) 0%,
                                rgba(227, 187, 147, 0.9) 5%,
                                rgba(152, 102, 65, 0.9) 25%,
                                rgba(23, 8, 4, 0.9) 30%,
                                rgba(23, 8, 4, 0.9) 34%,
                                rgba(64, 31, 5, 0.9) 37%,
                                rgba(227, 187, 147, 0.9) 38%,
                                rgba(152, 102, 65, 0.9) 53%,
                                rgba(23, 8, 4, 0.9) 58%,
                                rgba(64, 31, 5, 0.9) 67%,
                                rgba(227, 187, 147, 0.9) 68%,
                                rgba(152, 102, 65, 0.9) 74%,
                                rgba(23, 8, 4, 0.9) 76%,
                                rgba(23, 8, 4, 0.9) 100%
                            )`,
                            mixBlendMode: 'hard-light'
                        },
                        filter: 'contrast(100%) brightness(60%) saturate(200%)'
                    }}></Box>
            </Box>
        </Box>
    );
};
