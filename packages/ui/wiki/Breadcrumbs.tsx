import { Breadcrumbs, Typography } from '@mui/material';
import React from 'react';

import { Link } from './Link';
import { useWikiPage } from './hooks';

export const WikiBreadcrumbs: React.FunctionComponent<Parameters<typeof Breadcrumbs>[0]> = args => {
    const { page, pages } = useWikiPage();

    const breadcrumbPages = pages
        ?.filter(p => page?.link !== p.link && page?.link.includes(p.link))
        .sort((a, b) => a.link.length - b.link.length);

    return (
        <>
            {breadcrumbPages && (
                <Breadcrumbs {...args}>
                    {breadcrumbPages.map((page, index) => (
                        <Link key={index} href={page.link} autocolor>
                            {page.meta?.title ?? page.link}
                        </Link>
                    ))}
                    <Typography color="text.secondary">{page?.meta?.title}</Typography>
                </Breadcrumbs>
            )}
        </>
    );
};
