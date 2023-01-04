import { CacheProvider, EmotionCache, ThemeProvider } from '@emotion/react';
import '@fontsource/almendra';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { MDXProvider } from '@mdx-js/react';
import { CssBaseline, Typography } from '@mui/material';
import type { MDXComponents } from 'mdx/types';
import { AppProps } from 'next/app';
import Head from 'next/head';

import { Link, THEME, createEmotionCache } from '@dragosia/ui';

const clientSideEmotionCache = createEmotionCache();
const components: MDXComponents = {
    a: ({ href = '#', target, children, id }) => <Link {...{ href, target, children, id }} />,
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
                        <CssBaseline />
                        <Component {...pageProps} />
                    </ThemeProvider>
                </MDXProvider>
            </CacheProvider>
        </>
    );
}
