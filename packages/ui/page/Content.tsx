import { Paper, alpha } from '@mui/material';
import React from 'react';

export const PageContent: React.FunctionComponent<React.PropsWithChildren> = ({ children }) => {
    return (
        <Paper
            sx={theme => ({
                ml: { xs: 2, sm: 4, md: 'calc((100vw - 800px) / 2 + 60px)' },
                mr: { md: 'calc((100vw - 800px) / 2)' },
                flexGrow: 1,
                p: { xs: 2, sm: 4, md: 8 },
                boxShadow: {
                    xs: `inset 0px 5px 15px 15px ${theme.palette.background.page}`,
                    md: `inset 0px 15px 25px 25px ${theme.palette.background.page}`
                }
            })}>
            {children}
        </Paper>
    );
};
