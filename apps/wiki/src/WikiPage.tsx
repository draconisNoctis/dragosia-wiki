import { Divider, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React from 'react';

import { PageContent, PageHeader, PageWrapper, WikiBreadcrumbs, useNavigation, useWikiPage } from '@dragosia/ui';

const Comments = dynamic(() => import('@dragosia/ui/Comments'));

export const WikiPage: React.FunctionComponent<React.PropsWithChildren> = ({ children }) => {
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
export default WikiPage;
