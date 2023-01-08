import { Alert, Box, BoxProps, Button, Divider, Link, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

export interface Credentials {
    email: string;
    password: string;
}

export const LoginForm: React.FunctionComponent<
    { onSubmit?: (credentials: Credentials) => void; error?: string; onLogInWith?: (provider: 'GOOGLE') => void } & Omit<
        BoxProps,
        'onSubmit'
    >
> = ({ onSubmit, onLogInWith, error, sx, ...props }) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Credentials>();
    return (
        <Box
            {...props}
            sx={[{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: 1 }, ...(Array.isArray(sx) ? sx : [sx])]}
            component="form"
            onSubmit={onSubmit && handleSubmit(onSubmit)}>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
                label="E-Mail"
                {...register('email', { required: { value: true, message: 'E-Mail benötigt' } })}
                error={!!errors.email}
                helperText={errors.email?.message ?? undefined}
            />
            <TextField
                label="Passwort"
                type="password"
                {...register('password', { required: { value: true, message: 'Passwort benötigt' } })}
                error={!!errors.password}
                helperText={errors.password?.message ?? undefined}
            />
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Link color="secondary" href="/d/register">
                    Registrieren
                </Link>
                <Link color="secondary" href="/d/reset-password">
                    Passwort vergessen?
                </Link>
            </Box>
            <Button variant="outlined" type="submit">
                Einloggen
            </Button>
            <Divider sx={{ my: 2 }} />
            <Button variant="outlined" sx={{ backgroundColor: '#DB4437' }} onClick={() => onLogInWith?.('GOOGLE')}>
                Login mit Google
            </Button>
        </Box>
    );
};
