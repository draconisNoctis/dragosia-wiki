import { useRouter } from 'next/router';
import React from 'react';

import { WikiPage, WikiPageMeta, WikiPageWrapper } from '@dragosia/ui';
import { getPages } from '@dragosia/wiki';

export const meta: WikiPageMeta = {
    title: 'Zufälliger Artikel'
};
export const getStaticProps = WikiPageWrapper.staticProps(() => getPages('wiki/**/*'));

export default function WikiRandom({ pages }: { pages?: WikiPage[] }) {
    const router = useRouter();

    React.useEffect(() => {
        const link = pages
            ? pages.filter(p => !p.link.includes('/random') && p.link.startsWith('/wiki/'))[(Math.random() * pages.length) | 0].link
            : '/';
        router.replace(link);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
}
