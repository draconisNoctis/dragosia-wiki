import { AddReactionOutlined } from '@mui/icons-material';
import { Badge, Box, BoxProps, Button, IconButton, Menu, MenuItem } from '@mui/material';
import React from 'react';

import { addReaction, removeReaction, useCurrentUser, useQueryReactionsByParent } from '@dragosia/firebase';

const REACTIONS = ['👍', '👎', '😂', '🙁', '😡', '❤️', '😲', '🤯'];

export const Reactions: React.FunctionComponent<{ domain: string; parent: string } & Omit<BoxProps, 'children'>> = ({
    domain,
    parent,
    sx,
    ...props
}) => {
    const { auth } = useCurrentUser();
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const addReactionHandler = React.useCallback(
        async (emoji: string) => {
            await addReaction(domain, parent, auth!.uid, emoji);
        },
        [domain, parent, auth]
    );

    const removeReactionHandler = React.useCallback(
        async (emoji: string) => {
            await removeReaction(domain, parent, auth!.uid, emoji);
        },
        [domain, parent, auth]
    );

    const [reactions] = useQueryReactionsByParent(domain, parent);

    return (
        <Box
            {...props}
            sx={[{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: 1 }, ...(Array.isArray(sx) ? sx : [sx])]}>
            {Object.entries(reactions).map(([emoji, authors]) => (
                <Badge key={emoji} badgeContent={authors.length} color="primary">
                    {/* Use Chips instead of Buttons */}
                    <Button
                        variant="outlined"
                        sx={theme => ({
                            aspectRatio: '1',
                            minWidth: 0,
                            height: '24px',
                            p: 0,
                            background: auth && authors.includes(auth.uid) ? theme.palette.text.accent : undefined
                        })}
                        disabled={!auth}
                        onClick={
                            (auth && (() => (authors.includes(auth.uid) ? removeReactionHandler(emoji) : addReactionHandler(emoji)))) ||
                            undefined
                        }>
                        {emoji}
                    </Button>
                </Badge>
            ))}
            {auth && (
                <>
                    <IconButton onClick={handleOpenUserMenu} sx={{ background: 'rgba(0, 0, 0, .6)' }}>
                        <AddReactionOutlined />
                    </IconButton>

                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center'
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center'
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}>
                        {REACTIONS.map(reaction => (
                            <MenuItem
                                key={reaction}
                                onClick={() => {
                                    addReactionHandler(reaction);
                                    handleCloseUserMenu();
                                }}>
                                {reaction}
                            </MenuItem>
                        ))}
                    </Menu>
                </>
            )}
        </Box>
    );
};
