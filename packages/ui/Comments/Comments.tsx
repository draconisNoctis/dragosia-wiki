import { Alert, Box, BoxProps, CircularProgress } from '@mui/material';
import Link from 'next/link';
import React from 'react';

import { useCurrentUser, useQueryCommentsByParent } from '@dragosia/firebase';

import { Comment } from './Comment';
import { CommentForm } from './CommentForm';

export const Comments: React.FunctionComponent<{ parent: string; root?: boolean } & BoxProps> = ({ parent, root, sx, ...props }) => {
    const [data, isLoading] = useQueryCommentsByParent(parent);

    const { auth } = useCurrentUser();

    if (isLoading) {
        return <CircularProgress />;
    }

    return (
        <Box sx={[{ mb: 2, width: { xs: '100%', sm: '60%', md: '400px' } }, ...(Array.isArray(sx) ? sx : [sx])]} {...props}>
            {root && !auth && (
                <Alert severity="info">
                    <Link href="/d/login">Log dich ein, um einen Kommentar zu schreiben</Link>
                </Alert>
            )}
            {root && auth && data && data.docs.length === 0 && <Alert severity="info">Sei der erste, der einen Kommentar schreibt</Alert>}
            {root && auth && <CommentForm parent={parent} />}
            {data?.docs.map(doc => (
                <Comment key={doc.id} id={doc.id} comment={doc.data()} />
            ))}
        </Box>
    );
};
export default Comments;
