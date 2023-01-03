import { Typography } from '@mui/material';

import { TagList, WikiPage, WikiPageMeta, WikiPageWrapper } from '@dragosia/ui';
import { getPages } from '@dragosia/wiki';

export const meta: WikiPageMeta = {
    title: 'Dragosia Wiki'
};
export const getStaticProps = WikiPageWrapper.staticProps(() => getPages('wiki/**/*'));
export default function WikiIndex({ pages }: { pages?: WikiPage[] }) {
    return (
        <WikiPage meta={meta} pages={pages}>
            <Typography variant="h3" component="h3" sx={{ mt: 2 }}>
                Tags
            </Typography>
            {pages && <TagList pages={pages} />}
        </WikiPage>
    );
}
