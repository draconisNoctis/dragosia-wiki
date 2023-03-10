import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';

import { WikiPageComponent } from '@dragosia/ui';

export const meta = {
    title: 'Dragosia'
};

export default function Index() {
    return (
        <WikiPageComponent>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                }}>
                <Typography variant="h1" component="h1" sx={{ textAlign: 'center', lineHeight: 3, fontSize: '8rem !important' }}>
                    Dragosia
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <Link href="/regelwerk" passHref>
                        <Button variant="outlined">Regelwerk</Button>
                    </Link>
                    <Link href="/wiki" passHref>
                        <Button variant="outlined">Wiki</Button>
                    </Link>
                </Box>
            </Box>
        </WikiPageComponent>
    );
}
