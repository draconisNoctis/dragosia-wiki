import { Alert, Box, BoxProps, Button, Link, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';

import { Credentials } from './LoginForm';

export const RegisterForm: React.FunctionComponent<
    { onSubmit?: (credentials: Credentials) => void; error?: string } & Omit<BoxProps, 'onSubmit'>
> = ({ onSubmit, error, sx, ...props }) => {
    const {
        register,
        handleSubmit,
        watch,
        trigger,
        getValues,
        formState: { errors, isValid }
    } = useForm<Credentials & { repeatPassword: string }>({ mode: 'all' });

    const password = watch('password');
    React.useEffect(() => {
        trigger('repeatPassword');
    }, [password, trigger]);

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
                {...register('password', {
                    required: { value: true, message: 'Passwort benötigt' },
                    minLength: { value: 8, message: 'Passwort muss mindestens 8 Zeichen lang sein' }
                })}
                error={!!errors.password}
                helperText={errors.password?.message ?? undefined}
            />
            <TextField
                label="Passwort wiederholen"
                type="password"
                {...register('repeatPassword', {
                    required: { value: true, message: 'Passwort-Wiederholung benötigt' },
                    validate: {
                        repeat: React.useCallback(
                            (value: string) => watch('password') === value || 'Passwörter müssen gleich sein',
                            [watch]
                        )
                    }
                })}
                error={!!errors.repeatPassword}
                helperText={errors.repeatPassword?.message ?? undefined}
            />
            <Button variant="outlined" type="submit">
                Registrieren
            </Button>
        </Box>
    );
};
