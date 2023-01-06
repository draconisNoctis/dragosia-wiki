import { ThemeProvider } from '@mui/material';
import Head from 'next/head';
import React from 'react';

import { Comments } from '../Comments';
import { PageContent } from '../page/Content';
import { PageHeader } from '../page/Header';
import { PageWrapper } from '../page/Wrapper';
import { THEME } from '../theme';

import { WikiBreadcrumbs } from './Breadcrumb';
import { Link } from './Link';

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

export function WikiPageWrapper(meta: WikiPageMeta): React.FunctionComponent<React.PropsWithChildren<{ pages?: WikiPage[] }>> {
    return ({ children, pages }) => {
        return (
            <WikiPage
                meta={meta}
                pages={pages}
                navigation={
                    <>
                        <Link href="/wiki">Tags</Link>
                        <Link href="/wiki/random">Zufälliger Artikel</Link>
                    </>
                }>
                {children}
            </WikiPage>
        );
    };
}

export const WikiPage: React.FunctionComponent<
    React.PropsWithChildren<{ pages?: WikiPage[]; meta?: WikiPageMeta; navigation?: React.ReactNode; title?: React.ReactNode }>
> = ({ children, navigation, pages, meta, title }) => {
    const page = pages?.find(p => p.meta?.title === meta?.title && p.meta?.tags?.join() === meta?.tags?.join());
    return (
        <WikiPageContext.Provider value={{ page, pages }}>
            <Head>
                <title>{meta?.title ?? title ?? 'Dragosia'}</title>
            </Head>
            <PageWrapper>
                <PageHeader title="Dragosia Wiki">{navigation}</PageHeader>
                <PageContent>
                    <WikiBreadcrumbs />
                    {children}
                    {page && <Comments parent={page.link.replace(/\//g, '~')} root={true} />}
                </PageContent>
            </PageWrapper>
        </WikiPageContext.Provider>
    );
};

export module WikiPageWrapper {
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
