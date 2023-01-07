import { Typography } from '@mui/material';

import { Link, TagList, WikiPage, WikiPageMeta, WikiPageWrapper } from '@dragosia/ui';
import { getPages } from '@dragosia/wiki';

export const meta: WikiPageMeta = {
    title: 'Dragosia Wiki'
};
export const getStaticProps = WikiPageWrapper.staticProps(() => getPages());
export default function WikiIndex({ pages }: { pages?: WikiPage[] }) {
    return (
        <WikiPage meta={meta} pages={pages} navigation={<Link href="/wiki">Tags</Link>}>
            <Typography variant="h3" component="h3" sx={{ mt: 2 }}>
                Tags
            </Typography>
            {pages && <TagList pages={pages} linkPrefix="/wiki/tags/" />}
        </WikiPage>
    );
}
