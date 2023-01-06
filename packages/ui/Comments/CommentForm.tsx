import { Box, BoxProps, Button, TextField } from '@mui/material';
import React from 'react';

import { createComment, useCurrentAuth } from '@dragosia/firebase';

export const CommentForm: React.FunctionComponent<{ parent: string; created?: () => void } & BoxProps> = ({
    parent,
    created,
    sx,
    ...props
}) => {
    const [comment, setComment] = React.useState('');
    const [error, setError] = React.useState<undefined | string>();
    const auth = useCurrentAuth();

    if (!auth) return null;

    const onChangeHandler = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setComment(event.target.value);
            if (!event.target.value) return setError('Kommentar wird benötigt');
            if (event.target.value.length > 400) return setError('Kommentar ist zu lang (400)');
            setError(undefined);
        },
        [setError, setComment]
    );
    const onSubmitHandler = React.useCallback(
        async (event: React.FormEvent<unknown>) => {
            event.preventDefault();
            if (!comment) return setError('Kommentar wird benötigt');

            await createComment(
                {
                    author: auth!.uid,
                    date: new Date().toISOString(),
                    parent,
                    comment
                },
                { uid: auth!.uid, username: auth!.displayName ?? auth!.uid }
            );

            setComment('');
            created?.();
        },
        [created, parent, comment, auth]
    );

    return (
        <Box
            {...props}
            sx={[
                {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                    width: '100%',
                    mb: 2
                },
                ...(Array.isArray(sx) ? sx : [sx])
            ]}
            component="form"
            onSubmit={onSubmitHandler}>
            <TextField
                sx={{ alignSelf: 'stretch' }}
                value={comment}
                onChange={onChangeHandler}
                multiline
                rows={4}
                error={!!error}
                helperText={error}
            />
            <Button variant="outlined" disabled={!comment} type="submit">
                Kommentar erstellen
            </Button>
        </Box>
    );
};
