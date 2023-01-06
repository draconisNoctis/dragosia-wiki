import { Alert, Box, BoxProps, Button, Link, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

export const ResetPasswordForm: React.FunctionComponent<
    { onSubmit?: (email: string) => void; error?: string; message?: string } & Omit<BoxProps, 'onSubmit'>
> = ({ onSubmit, error, message, sx, ...props }) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<{ email: string }>();
    return (
        <Box
            {...props}
            sx={[{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: 1 }, ...(Array.isArray(sx) ? sx : [sx])]}
            component="form"
            onSubmit={handleSubmit(({ email }) => onSubmit?.(email))}>
            {error && <Alert severity="error">{error}</Alert>}
            {message && <Alert severity="success">{message}</Alert>}
            <TextField
                label="E-Mail"
                {...register('email', { required: { value: true, message: 'E-Mail benötigt' } })}
                error={!!errors.email}
                helperText={errors.email?.message ?? undefined}
            />
            <Button variant="outlined" type="submit">
                Passwort zurücksetzen
            </Button>
        </Box>
    );
};
