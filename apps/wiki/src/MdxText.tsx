import { MDXProvider } from '@mdx-js/react';
import React from 'react';

function AsText({ prefix = '', suffix = '' }: { prefix?: string; suffix?: string } = {}) {
    return function AsText({ children }: React.PropsWithChildren) {
        return (
            <>
                {prefix}
                {children}
                {suffix}
            </>
        );
    };
}

export const MdxText: React.FunctionComponent<React.PropsWithChildren> = ({ children }) => {
    return (
        <MDXProvider
            components={{
                h1: AsText(/* { prefix: '# ' } */),
                h2: AsText(/* { prefix: '## ' } */),
                h3: AsText(/* { prefix: '### ' } */),
                h4: AsText(/* { prefix: '#### ' } */),
                h5: AsText(/* { prefix: '##### ' } */),
                h6: AsText(/* { prefix: '###### ' } */),
                a: AsText(),
                p: AsText({ suffix: '\n\n' }),
                ul: AsText(),
                ol: AsText(),
                li: AsText(/* { prefix: '- ' } */),
                table: AsText({ suffix: '\n' }),
                thead: AsText(),
                tbody: AsText(),
                tr: AsText({ suffix: '\n' }),
                th: AsText({ suffix: ' ' }),
                td: AsText({ suffix: ' ' })
            }}>
            {children}
        </MDXProvider>
    );
};
