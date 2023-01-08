import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

import { sendResetPasswordEmail, useCurrentUser } from '@dragosia/firebase';
import { ResetPasswordForm } from '@dragosia/ui';
import WikiPage from '@dragosia/wiki';

export const meta = {
    title: 'Dragosia Registrierung'
};

export default function Register() {
    const [error, setError] = React.useState<string | undefined>();
    const [message, setMessage] = React.useState<string | undefined>();
    const router = useRouter();
    const { auth } = useCurrentUser();

    React.useEffect(() => {
        if (auth) {
            router.push('/');
        }
    }, [router, auth]);

    const onSubmit = React.useCallback(async (email: string) => {
        try {
            await sendResetPasswordEmail(email);
            setError(undefined);
            setMessage('E-Mail für das zurücksetzen des Passworts wurde versandt');
        } catch (err: any) {
            setMessage(undefined);
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
                <ResetPasswordForm onSubmit={onSubmit} error={error} message={message} sx={{ mx: '10vw', my: '10vh' }} />
            </Box>
        </WikiPage>
    );
}
