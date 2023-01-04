import { Box } from '@mui/material';
import React from 'react';

import LeftWood from '../assets/left-wood.png';

export const PageWrapper: React.FunctionComponent<React.PropsWithChildren> = ({ children }) => {
    return (
        <Box
            sx={{
                ml: { md: 8 },
                mt: 0,
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'pageBackground.main',
                minHeight: 'calc(100vh)',
                backgroundImage: { sm: `url(${LeftWood.src})` },
                backgroundRepeat: 'repeat-y',
                backgroundSize: '60px',
                boxShadow: '0 0 15px 5px rgba(0, 0, 0, .6)'
            }}>
            {children}
        </Box>
    );
};
