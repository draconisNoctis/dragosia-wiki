import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

import { signInAccount, signInWithGoogle, useCurrentAuth } from '@dragosia/firebase';
import { Credentials, LoginForm, WikiPage } from '@dragosia/ui';

export const meta = {
    title: 'Dragosia Login'
};

export default function Login() {
    const [error, setError] = React.useState<string | undefined>();
    const router = useRouter();
    const auth = useCurrentAuth();

    React.useEffect(() => {
        if (auth) {
            router.push('/');
        }
    }, [router, auth]);

    const onSubmit = React.useCallback(async (credentials: Credentials) => {
        try {
            await signInAccount(credentials.email, credentials.password);
        } catch (err: any) {
            setError(String(err.message));
        }
    }, []);

    const onLogInWith = React.useCallback(async (provider: 'GOOGLE') => {
        if (provider === 'GOOGLE') {
            await signInWithGoogle();
        }
    }, []);

    return (
        <WikiPage meta={meta}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                }}>
                <LoginForm onSubmit={onSubmit} error={error} onLogInWith={onLogInWith} sx={{ mx: '10vw', my: '10vh' }} />
            </Box>
        </WikiPage>
    );
}
