import { Card, CardContent, Container } from '@mui/material';
import Head from 'next/head';
import React from 'react';

import { WikiBreadcrumbs } from './Breadcrumb';
import { WikiTitlebar } from './Titlebar';

export interface WikiPageMeta {
    title: string;
    tags?: string[];
}

export interface WikiPage {
    filename: string;
    link: string;
    meta?: WikiPageMeta | null;
}

export interface IWikiPageContext {
    page?: WikiPage;
    pages?: WikiPage[];
}

export const WikiPageContext = React.createContext<IWikiPageContext>({});

export function useWikiPage() {
    return React.useContext(WikiPageContext);
}

export function WikiPage(meta: WikiPageMeta): React.FunctionComponent<React.PropsWithChildren<{ pages?: WikiPage[] }>> {
    return ({ children, pages }) => {
        return (
            <WikiPageContext.Provider
                value={{ page: pages?.find(p => p.meta?.title === meta.title && p.meta.tags?.join() === meta.tags?.join()), pages }}>
                <Head>
                    <title>{meta.title}</title>
                </Head>
                <WikiTitlebar />
                <Container>
                    <Card sx={{ mt: 4 }}>
                        <CardContent>
                            <WikiBreadcrumbs sx={{ mb: -2 }} />
                            {children}
                        </CardContent>
                    </Card>
                </Container>
            </WikiPageContext.Provider>
        );
    };
}

export module WikiPage {
    export function staticProps(pages: () => Promise<WikiPage[]>) {
        return async function getStaticProps() {
            return {
                props: {
                    pages: await pages()
                }
            };
        };
    }
}
