import { AppBar, Box, Toolbar } from '@mui/material';
import React from 'react';

import TopWood from '../assets/top-wood.png';
import { Link } from '../wiki';
import { AuthMenu } from '../wiki/AuthMenu';

export const PageHeader: React.FunctionComponent<React.PropsWithChildren<{ title: React.ReactNode }>> = ({ children, title }) => {
    return (
        <Box
            sx={{
                zIndex: '10',
                position: 'relative',
                boxShadow: '0 0 15px 5px rgba(0, 0, 0, .6)',
                ml: { md: 2 },
                mt: { md: 4 },
                borderTopLeftRadius: { md: '16px' }
            }}>
            <AppBar position="static" sx={{ borderTopLeftRadius: { md: '16px' } }}>
                <Toolbar
                    sx={{
                        bgcolor: 'mainHeader.main',
                        gap: 4,
                        flexGrow: 1,
                        '> a': { color: 'mainHeader.contrastText', '&:hover': { color: 'text.primary' } },
                        borderTopLeftRadius: { md: '16px' }
                    }}>
                    <Link href="/" sx={{ typography: 'h1' }}>
                        {title}
                    </Link>
                    <Link href="/wiki">Wiki</Link>
                    <Link href="/regelwerk">Regelwerk</Link>
                    <AuthMenu sx={{ ml: 'auto' }} />
                </Toolbar>
                <Toolbar
                    sx={{
                        bgcolor: 'subHeader.main',
                        gap: 4,
                        flexGrow: 1,
                        '> a': { color: 'subHeader.contrastText', '&:hover': { color: 'text.secondary' } }
                    }}>
                    {children}
                </Toolbar>
            </AppBar>
            <Box
                sx={{
                    width: '100%',
                    height: '15px',
                    backgroundImage: `url(${TopWood.src})`,
                    backgroundRepeat: 'repeat-x',
                    backgroundSize: 'contain'
                }}></Box>
        </Box>
    );
};
