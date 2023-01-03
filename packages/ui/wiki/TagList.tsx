import { Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText, useTheme } from '@mui/material';
import React from 'react';

import { Link } from './Link';
import { WikiPage } from './Page';

export const TagList: React.FunctionComponent<{ pages: WikiPage[] }> = ({ pages }) => {
    const theme = useTheme();

    const sortedPages = React.useMemo(() => pages.slice().sort((a, b) => a.meta?.title.localeCompare(b.meta?.title ?? '') ?? 0), [pages]);
    const tags = React.useMemo(
        () => [...new Set(pages.reduce((t, c) => [...t, ...(c.meta?.tags ?? [])], [] as string[]))].sort((a, b) => a.localeCompare(b)),
        [sortedPages]
    );

    let latestChar: string | undefined;

    return (
        <List>
            {tags.map(tag => {
                let char: string | undefined = tag.charAt(0).toUpperCase();
                if (char !== latestChar) {
                    latestChar = char;
                } else {
                    char = undefined;
                }
                return (
                    <ListItem key={tag}>
                        <ListItemAvatar>
                            {char && <Avatar sx={{ bgcolor: 'primary.main', color: 'text.primary' }}>{char}</Avatar>}
                        </ListItemAvatar>
                        <ListItemText
                            primary={tag}
                            secondaryTypographyProps={{ component: 'div' }}
                            secondary={
                                <Grid container spacing={1}>
                                    {sortedPages
                                        .filter(p => p.meta?.tags?.includes(tag))
                                        .map(page => (
                                            <Grid key={page.link} item xs={3} md={2}>
                                                <Link href={page.link}>{page.meta?.title ?? page.link}</Link>
                                            </Grid>
                                        ))}
                                </Grid>
                            }
                        />
                    </ListItem>
                );
            })}
        </List>
    );
};