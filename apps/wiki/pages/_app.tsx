import '@fontsource/almendra';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { MDXProvider } from '@mdx-js/react';
import { CssBaseline, ThemeProvider, Typography } from '@mui/material';
import type { MDXComponents } from 'mdx/types';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

import { CurrentUserProvider, QueryClient, QueryClientProvider } from '@dragosia/firebase';
import { Link, NavigationContext, THEME, WikiPage, WikiPageContext, useWikiPage } from '@dragosia/ui';
import { WikiLink } from '@dragosia/wiki';

import '../src/base.scss';

const queryClient = new QueryClient();
const components: MDXComponents = {
    a: WikiLink,
    h1: ({ id, children }) => (
        <Typography variant="h2" component="h2" id={id} sx={{ mt: '1.6rem' }}>
            {children}
        </Typography>
    ),
    h2: ({ id, children }) => (
        <Typography variant="h3" component="h3" id={id}>
            {children}
        </Typography>
    ),
    h3: ({ id, children }) => (
        <Typography variant="h4" component="h4" id={id}>
            {children}
        </Typography>
    ),
    h4: ({ id, children }) => (
        <Typography variant="h5" component="h5" id={id}>
            {children}
        </Typography>
    ),
    h5: ({ id, children }) => (
        <Typography variant="h6" component="h6" id={id}>
            {children}
        </Typography>
    ),
    p: ({ children }) => (
        <Typography variant="body1" component="p" sx={{ mb: '0.8rem' }}>
            {children}
        </Typography>
    )
};

export default function App({ Component, router, pageProps }: AppProps<{ pages?: WikiPage[] }>) {
    const page = pageProps.pages?.find(p => p.link === router.route);
    const navigation = page?.link.startsWith('/wiki') ? (
        <>
            <Link href="/wiki">Tags</Link>
            <Link href="/d/random/wiki">Zufälliger Artikel</Link>
        </>
    ) : page?.link.startsWith('/regelwerk') ? (
        <>
            <Link href="/regelwerk">Tags</Link>
            <Link href="/d/random/regelwerk">Zufälliger Artikel</Link>
        </>
    ) : null;
    const title = page?.link.startsWith('/wiki')
        ? 'Dragosia Wiki'
        : page?.link.startsWith('/regelwerk')
        ? 'Dragosia Regelwerk'
        : 'Dragosia';
    return (
        <>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <MDXProvider components={components}>
                <ThemeProvider theme={THEME}>
                    <QueryClientProvider client={queryClient}>
                        <WikiPageContext.Provider value={{ title, page, pages: pageProps?.pages }}>
                            <NavigationContext.Provider value={navigation}>
                                <CurrentUserProvider>
                                    <CssBaseline />
                                    <Component {...pageProps} />
                                </CurrentUserProvider>
                            </NavigationContext.Provider>
                        </WikiPageContext.Provider>
                    </QueryClientProvider>
                </ThemeProvider>
            </MDXProvider>
        </>
    );
}
