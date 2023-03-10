import { AccountCircle } from '@mui/icons-material';
import { Avatar, Box, BoxProps, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import React from 'react';

import { signOut, useCurrentUser } from '@dragosia/firebase';

import { Link } from './Link';

export const AuthMenu: React.FunctionComponent<BoxProps> = props => {
    const { auth } = useCurrentUser();
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box {...props}>
            {!auth && <Link href="/d/login">Login</Link>}
            {!auth && (
                <Link href="/d/register" sx={{ ml: 2 }}>
                    Registrieren
                </Link>
            )}
            {auth && (
                <>
                    <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
                        {auth.photoURL && <Avatar alt={auth.displayName ?? auth.email ?? undefined} src={auth.photoURL} />}
                        {!auth.photoURL && <AccountCircle />}
                    </IconButton>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}>
                        <MenuItem
                            onClick={() => {
                                signOut();
                                handleCloseUserMenu();
                            }}>
                            <Typography textAlign="center">Logout</Typography>
                        </MenuItem>
                    </Menu>
                </>
            )}
        </Box>
    );
};
