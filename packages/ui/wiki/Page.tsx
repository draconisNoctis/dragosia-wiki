import { Divider, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React from 'react';

import { PageContent } from '../Page/Content';
import { PageHeader } from '../Page/Header';
import { PageWrapper } from '../Page/Wrapper';

import { WikiBreadcrumbs } from './Breadcrumbs';
import { WikiPage, WikiPageMeta } from './contexts';
import { useNavigation, useWikiPage } from './hooks';

// @TODO: delete

const Comments = dynamic(() => import('../Comments/Comments'));

export function WikiPageWrapper(meta: WikiPageMeta): React.FunctionComponent<React.PropsWithChildren<{ pages?: WikiPage[] }>> {
    return ({ children }) => {
        return <WikiPageComponent>{children}</WikiPageComponent>;
    };
}

export const WikiPageComponent: React.FunctionComponent<React.PropsWithChildren> = ({ children }) => {
    const { title, page } = useWikiPage();
    const navigation = useNavigation();
    return (
        <>
            <Head>
                <title>{page?.meta?.title ?? title}</title>
            </Head>
            <PageWrapper>
                <PageHeader title={title}>{navigation}</PageHeader>
                <PageContent>
                    <WikiBreadcrumbs />
                    {children}
                    {page && (
                        <>
                            <Divider sx={{ mb: 2 }} />
                            <Typography variant="h3">Kommentare</Typography>
                            <Comments parent={page?.link.replace(/\//g, '~')} root={true} />
                        </>
                    )}
                </PageContent>
            </PageWrapper>
        </>
    );
};
