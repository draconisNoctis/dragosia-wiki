import { Container } from '@mui/material';
import Head from 'next/head';
import React from 'react';

import { WikiTitlebar } from './titlebar';

export interface WikiPageMeta {
    title: string;
    tags?: string[];
}

export function WikiPage(meta: WikiPageMeta): React.FunctionComponent<React.PropsWithChildren> {
    return ({ children }) => {
        return (
            <>
                <Head>
                    <title>{meta.title}</title>
                </Head>
                <WikiTitlebar />
                <Container>{children}</Container>
            </>
        );
    };
}
