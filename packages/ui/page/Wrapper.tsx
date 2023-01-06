import { Box } from '@mui/material';
import React from 'react';

import LeftWood from '../assets/left-wood.png';

export const PageWrapper: React.FunctionComponent<React.PropsWithChildren> = ({ children }) => {
    return (
        <Box
            sx={{
                mt: 0,
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'pageBackground.main',
                minHeight: 'calc(100vh)',
                backgroundImage: { xs: `url(${LeftWood.src})` },
                backgroundRepeat: 'repeat-y',
                backgroundSize: '60px',
                backgroundPositionX: { sm: '0px', md: 'calc((100vw - 800px) / 2)' },
                boxShadow: '0 0 15px 5px rgba(0, 0, 0, .6)'
            }}>
            {children}
        </Box>
    );
};
