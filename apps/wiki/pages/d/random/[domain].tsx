import { GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import { WikiPage, WikiPageMeta } from '@dragosia/ui';

export const meta: WikiPageMeta = {
    title: 'Zufälliger Artikel'
};
export { getStaticProps } from '@dragosia/wiki/static-props';

export const getStaticPaths: GetStaticPaths<{ domain: string }> = async () => {
    return {
        paths: [
            {
                params: { domain: 'wiki' }
            },
            {
                params: { domain: 'regelwerk' }
            }
        ],
        fallback: 'blocking'
    };
};

export default function WikiRandom({ pages }: { pages?: WikiPage[] }) {
    const router = useRouter();
    const domain = router.query.domain as 'wiki' | 'regelwerk';

    React.useEffect(() => {
        const availablePages = pages?.filter(p => !p.link.includes('/random') && p.link.startsWith(`/${domain}/`));
        const link = availablePages?.[(Math.random() * availablePages?.length) | 0].link ?? '/';
        router.replace(link);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
}
