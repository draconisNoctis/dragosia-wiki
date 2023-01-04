import { Paper, useTheme } from '@mui/material';
import React from 'react';

export const PageContent: React.FunctionComponent<React.PropsWithChildren> = ({ children }) => {
    return (
        <Paper
            sx={{
                ml: { sm: 6 },
                flexGrow: 1,
                p: { xs: 2, sm: 4, md: 8 },
                boxShadow: { xs: 'inset 0px 5px 15px 5px rgba(0, 0, 0, .6)', md: 'inset 5px 15px 45px 15px rgba(0, 0, 0, .9)' }
            }}>
            {children}
        </Paper>
    );
};