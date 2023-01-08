import glob from 'glob-promise';
import { PHASE_PRODUCTION_BUILD } from 'next/dist/shared/lib/constants';
import path from 'node:path';

import { WikiPage } from '@dragosia/ui';

let pagesCache: { deref(): Promise<WikiPage[]> | undefined } | undefined;

export function getPages(): Promise<WikiPage[]> {
    const resultFromCache = pagesCache?.deref();
    if (resultFromCache) {
        return resultFromCache;
    }

    const result = _getPages();
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    pagesCache = process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD ? { deref: () => result } : new WeakRef(result);
    return result;
}

export async function _getPages(): Promise<WikiPage[]> {
    const pageDir = path.resolve(process.cwd(), 'pages');
    const files = await glob(`${pageDir}/**/*`, { nodir: true, ignore: ['**/*[*', '**/*]*'] });

    return Promise.all(
        files.map(async filename => {
            const page = await require(/* webpackMode: "eager" */ '../pages/' + path.relative(pageDir, filename));
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
