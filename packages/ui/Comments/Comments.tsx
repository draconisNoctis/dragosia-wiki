import { Alert, Box, BoxProps, CircularProgress, useTheme } from '@mui/material';
import Link from 'next/link';
import React from 'react';

import { useAuthState, useQueryCommentsByParent } from '@dragosia/firebase';

import { Comment } from './Comment';
import { CommentForm } from './CommentForm';

export const Comments: React.FunctionComponent<{ parent: string; root?: boolean } & BoxProps> = ({ parent, root, sx, ...props }) => {
    const [data, isLoading] = useQueryCommentsByParent(parent);

    const [user] = useAuthState();

    if (isLoading) {
        return <CircularProgress />;
    }

    return (
        <Box sx={[{ mb: 2, width: { xs: '100%', sm: '60%', md: '400px' } }, ...(Array.isArray(sx) ? sx : [sx])]} {...props}>
            {root && !user && (
                <Alert severity="info">
                    <Link href="/login">Log dich ein, um einen Kommentar zu schreiben</Link>
                </Alert>
            )}
            {root && user && data && data.docs.length === 0 && <Alert severity="info">Sei der erste, der einen Kommentar schreibt</Alert>}
            {root && user && <CommentForm parent={parent} />}
            {data?.docs.map(doc => (
                <Comment key={doc.id} id={doc.id} comment={doc.data()} />
            ))}
        </Box>
    );
};
