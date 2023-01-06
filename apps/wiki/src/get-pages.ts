import glob from 'glob-promise';
import { PHASE_PRODUCTION_BUILD } from 'next/dist/shared/lib/constants';
import path from 'node:path';

import { WikiPage } from '@dragosia/ui';

const pagesCache: Map<string | undefined, { deref(): Promise<WikiPage[]> | undefined }> = new Map();

export function getPages(pattern?: string): Promise<WikiPage[]> {
    const resultFromCache = pagesCache.get(pattern)?.deref();
    if (resultFromCache) {
        return resultFromCache;
    }

    const result = _getPages(pattern);
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    const cacheItem = process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD ? { deref: () => result } : new WeakRef(result);
    pagesCache.set(pattern, cacheItem);
    return result;
}

export async function _getPages(pattern?: string): Promise<WikiPage[]> {
    const pageDir = path.resolve(process.cwd(), 'pages');
    const files = await glob(`${pageDir}/${pattern ?? '**/*'}`, { nodir: true, ignore: ['**/*[*', '**/*]*'] });

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
