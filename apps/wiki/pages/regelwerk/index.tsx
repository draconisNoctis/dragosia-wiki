import { Typography } from '@mui/material';

import { TagList, WikiPageMeta, useWikiPage } from '@dragosia/ui';
import WikiPage from '@dragosia/wiki';

export const meta: WikiPageMeta = {
    title: 'Dragosia Regelwerk'
};
export { getStaticProps } from '@dragosia/wiki/static-props';

export default function WikiIndex() {
    const { pages } = useWikiPage();
    return (
        <WikiPage>
            <Typography variant="h3" component="h3" sx={{ mt: 2 }}>
                Tags
            </Typography>
            {pages && <TagList pages={pages?.filter(p => p.link.startsWith('/regelwerk/'))} />}
        </WikiPage>
    );
}
