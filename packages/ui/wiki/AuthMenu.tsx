import { AccountCircle } from '@mui/icons-material';
import { AppBar, Avatar, Box, BoxProps, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import React from 'react';

import { signInWithGoogle, signOut, useAuthState } from '@dragosia/firebase';

export const AuthMenu: React.FunctionComponent<BoxProps> = props => {
    const [user] = useAuthState();
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box {...props}>
            {!user && (
                <Button onClick={signInWithGoogle} color="inherit">
                    Login
                </Button>
            )}
            {user && (
                <>
                    <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
                        {user.photoURL && <Avatar alt={user.displayName ?? user.email ?? undefined} src={user.photoURL} />}
                        {!user.photoURL && <AccountCircle />}
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
