import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

import { createAccount, useCurrentUser } from '@dragosia/firebase';
import { Credentials, RegisterForm } from '@dragosia/ui';
import WikiPage from '@dragosia/wiki';

export const meta = {
    title: 'Dragosia Registrierung'
};

export default function Register() {
    const [error, setError] = React.useState<string | undefined>();
    const router = useRouter();
    const { auth } = useCurrentUser();

    React.useEffect(() => {
        if (auth) {
            router.push('/');
        }
    }, [router, auth]);

    const onSubmit = React.useCallback(async (credentials: Credentials) => {
        try {
            await createAccount(credentials.email, credentials.password);
        } catch (err: any) {
            setError(String(err.message));
        }
    }, []);

    return (
        <WikiPage>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                }}>
                <RegisterForm onSubmit={onSubmit} error={error} sx={{ mx: '10vw', my: '10vh' }} />
            </Box>
        </WikiPage>
    );
}
