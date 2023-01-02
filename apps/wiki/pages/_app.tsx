import { MDXProvider } from '@mdx-js/react';
import { AppProps } from 'next/app';

const components = {};

export default function App({ Component, pageProps }: AppProps) {
    return (
        <MDXProvider components={components}>
            <Component {...pageProps} />
        </MDXProvider>
    );
}
