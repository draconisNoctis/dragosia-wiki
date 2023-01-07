import { CacheProvider, EmotionCache } from '@emotion/react';
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
import { Link, THEME, createEmotionCache, useWikiPage } from '@dragosia/ui';

import '../src/base.scss';

const MDXLink: React.FunctionComponent<React.PropsWithChildren<{ href?: string; target?: string; id?: string }>> = ({
    href = '#',
    target,
    children,
    id
}) => {
    const { pages } = useWikiPage();

    if (href.startsWith('wiki:')) {
        const suffix = href.substring(5);
        href = pages?.find(p => p.link.startsWith('/wiki') && p.link.endsWith(`/${suffix}`))?.link ?? `/wiki/${suffix}`;
    }

    return <Link autocolor {...{ href, target, children, id }} />;
};

const clientSideEmotionCache = createEmotionCache();
const queryClient = new QueryClient();
const components: MDXComponents = {
    a: MDXLink,
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

export default function App({ Component, pageProps, emotionCache = clientSideEmotionCache }: AppProps & { emotionCache?: EmotionCache }) {
    return (
        <>
            <CacheProvider value={emotionCache}>
                <Head>
                    <meta name="viewport" content="initial-scale=1, width=device-width" />
                </Head>
                <MDXProvider components={components}>
                    <ThemeProvider theme={THEME}>
                        <QueryClientProvider client={queryClient}>
                            <CurrentUserProvider>
                                <CssBaseline />
                                <Component {...pageProps} />
                            </CurrentUserProvider>
                        </QueryClientProvider>
                    </ThemeProvider>
                </MDXProvider>
            </CacheProvider>
        </>
    );
}
