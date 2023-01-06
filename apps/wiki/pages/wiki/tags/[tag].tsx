import { Box, Typography } from '@mui/material';
import { GetStaticPaths, GetStaticProps } from 'next';

import { Link, WikiPage } from '@dragosia/ui';
import { getPages } from '@dragosia/wiki';

export interface WikiTag {
    name: string;
    pages: WikiPage[];
}

export const getStaticProps: GetStaticProps<{ pages: WikiPage[]; tag: WikiTag }, { tag: string }> = async ({ params }) => {
    const pages = await getPages('wiki/**/*');
    const tag = {
        name: params!.tag!,
        pages: pages.filter(p => p.meta?.tags?.includes(params!.tag!))
    };

    return {
        props: {
            tag,
            pages
        }
    };
};

export const getStaticPaths: GetStaticPaths<{ tag: string }> = async () => {
    const pages = await getPages('wiki/**/*');
    const tags = Array.from(new Set(pages.flatMap(p => p.meta?.tags ?? [])));

    return {
        paths: tags.map(tag => ({
            params: { tag }
        })),
        fallback: 'blocking'
    };
};

export default function WikiTag({ pages, tag }: { pages: WikiPage[]; tag: WikiTag }) {
    return (
        <WikiPage pages={pages} navigation={<Link href="/wiki">Tags</Link>}>
            <Typography variant="h2" component="h2" sx={{ mt: 2 }}>
                Tag: {tag.name}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {tag.pages.map(page => (
                    <Link key={page.link} href={page.link}>
                        {page.meta?.title ?? page.link}
                    </Link>
                ))}
            </Box>
        </WikiPage>
    );
}
