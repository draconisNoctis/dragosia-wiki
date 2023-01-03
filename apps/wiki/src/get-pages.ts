import glob from 'glob-promise';
import path from 'node:path';

import { WikiPageWrapper } from '@dragosia/ui';

export async function getPages(pattern?: string): Promise<WikiPage[]> {
    const pageDir = path.resolve(process.cwd(), 'pages');
    const files = await glob(`${pageDir}/${pattern ?? '**/*'}`, { nodir: true });

    return Promise.all(
        files.map(async filename => {
            const page = await require('../pages/' + path.relative(pageDir, filename));
            return {
                filename,
                link:
                    '/' +
                    path
                        .relative(pageDir, filename)
                        .replace(/\.(mdx|tsx)$/, '')
                        .replace(/\/index/, ''),
                meta: page.meta ?? null
            };
        })
    );
}
