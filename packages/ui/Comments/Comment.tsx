import { Alert, Box, BoxProps, Button, Theme, Tooltip, Typography } from '@mui/material';
import React from 'react';

import { CommentData, useAuthState, useQueryCommentsByParent, useQueryUserByUid } from '@dragosia/firebase';

import { Markdown } from '../Markdown';
import { dayjs } from '../dayjs';

import { CommentForm } from './CommentForm';
import { Comments } from './Comments';
import { Reactions } from './Reactions';

export const Comment: React.FunctionComponent<{ id: string; comment: CommentData } & BoxProps> = ({ id, comment, ...props }) => {
    const [showComments, setShowComments] = React.useState(false);
    const [showReply, setShowReply] = React.useState(false);

    const [auth] = useAuthState();
    const [user] = useQueryUserByUid(comment.author);
    const [comments] = useQueryCommentsByParent(id);
    const commentsCount = comments?.size;

    return (
        <Box {...props}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', mb: 1 }}>
                <Typography variant="h6" component="span" sx={{ mb: 0 }}>
                    {user?.username}
                </Typography>
                <Tooltip title={dayjs(comment.date).format('LLL')}>
                    <Typography variant="caption" component="time" dateTime={comment.date}>
                        {dayjs(comment.date).from(new Date())}
                    </Typography>
                </Tooltip>
            </Box>
            <Markdown
                variant="body1"
                component="div"
                sx={(theme: Theme) => ({
                    borderRadius: 2,
                    p: 2,
                    boxShadow: `0 0 0 1px ${theme.palette.text.accent}, 0 0 0 2px ${theme.palette.background.button}`,
                    background: theme.palette.background.darken,
                    '& > *:first-of-type': { mt: 0 },
                    '& > *:last-of-type': { mb: 0 }
                })}>
                {comment.comment}
            </Markdown>
            <Reactions domain="comments" parent={id} sx={{ mt: -2 }} />
            <Box sx={{ mt: 1, mb: 2, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: 2 }}>
                {!!commentsCount && (
                    <Button variant="outlined" onClick={() => setShowComments(b => !b)}>
                        {showComments ? 'Kommentare verbergen' : `${commentsCount} Kommentare anzeigen`}
                    </Button>
                )}
                {!commentsCount && (
                    <Button variant="outlined" disabled>
                        Keine Kommentare
                    </Button>
                )}
                {auth && (
                    <Button variant="outlined" onClick={() => setShowReply(b => !b)}>
                        {showReply ? 'Abbrechen' : 'Antworten'}
                    </Button>
                )}
            </Box>
            {showReply && (
                <CommentForm
                    parent={id}
                    created={() => {
                        setShowReply(false);
                        setShowComments(true);
                    }}
                />
            )}
            {showComments && <Comments parent={id} sx={{ ml: 4 }} />}
        </Box>
    );
};
