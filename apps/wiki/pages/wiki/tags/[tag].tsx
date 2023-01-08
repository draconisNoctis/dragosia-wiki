import { Box, Typography } from '@mui/material';
import { GetStaticPaths } from 'next';
import { useRouter } from 'next/router';

import { Link, useWikiPage } from '@dragosia/ui';
import WikiPage from '@dragosia/wiki';
import { getPages } from '@dragosia/wiki/static-props';

export { getStaticProps } from '@dragosia/wiki/static-props';

export const getStaticPaths: GetStaticPaths<{ tag: string }> = async () => {
    const pages = await getPages();
    const tags = Array.from(new Set(pages.flatMap(p => p.meta?.tags ?? [])));

    return {
        paths: tags.map(tag => ({
            params: { tag }
        })),
        fallback: 'blocking'
    };
};

export default function WikiTag() {
    const tag = useRouter().query.tag as string;
    const { pages } = useWikiPage();
    return (
        <WikiPage>
            <Typography variant="h2" component="h2" sx={{ mt: 2 }}>
                Tag: {tag}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {pages
                    ?.filter(p => p.meta?.tags?.includes(tag))
                    .map(page => (
                        <Link key={page.link} href={page.link} autocolor>
                            {page.meta?.title ?? page.link}
                        </Link>
                    ))}
            </Box>
        </WikiPage>
    );
}
