import { Alert, Box, BoxProps, Link, Pagination, TextField, Typography } from '@mui/material';
import elasticlunr, { SerialisedIndexData } from 'elasticlunr';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';

import { WikiPage as IWikiPage } from '@dragosia/ui';
import WikiPage from '@dragosia/wiki';

import { getPages } from '../../src/getPages';

export const meta = {
    title: 'Dragosia Suche'
};

interface WikiPageDocument {
    id: number;
    title?: string;
    link: string;
    content?: string;
}

export const getStaticProps: GetStaticProps<{
    pages: IWikiPage[];
    index: SerialisedIndexData<WikiPageDocument>;
}> = async () => {
    const pages = await getPages();

    const index = elasticlunr<WikiPageDocument>(idx => {
        idx.addField('title');
        idx.addField('link');
        idx.addField('content');
        idx.setRef('id');
        idx.saveDocument(false);
    });

    for (const [i, page] of pages.entries()) {
        index.addDoc({
            id: i,
            title: page.meta?.title,
            link: page.link,
            content: page.content
        });
    }

    return {
        props: {
            pages,
            index: index.toJSON()
        }
    };
};

function useSearchQueryParams() {
    const router = useRouter();

    const { asPath } = router;

    const params = React.useMemo(() => {
        const searchParams = asPath.replace(/^.*\?(.*)$/, '$1');
        return new URLSearchParams(searchParams);
    }, [asPath]);

    const query = params.get('query');
    const page = params.get('page');

    return {
        query: query ?? '',
        page: +page! | 0 || 1
    };
}

export default function Search({ pages, index }: { pages: IWikiPage[]; index: SerialisedIndexData<WikiPageDocument> }) {
    const idx = React.useMemo(() => elasticlunr.Index.load(index), [index]);
    const router = useRouter();
    const { register, watch, setValue } = useForm<{ query: string; page: number }>({
        defaultValues: useSearchQueryParams()
    });

    React.useEffect(() => {
        const sub = watch(values => {
            router.replace(
                {
                    query: { ...router.query, ...values }
                },
                undefined,
                { shallow: true }
            );
        });

        return () => sub.unsubscribe();
    }, [watch, router]);

    const { query, page } = watch();
    const RESULTS_PER_PAGE = 20;

    const results = React.useMemo(() => {
        const searchResults = idx.search(query, {});
        return searchResults.map(s => pages[+s.ref]);
    }, [query, pages, idx]);

    const resultsOnPage = results.slice((page - 1) * RESULTS_PER_PAGE, page * RESULTS_PER_PAGE);
    const pagesCount = Math.ceil(results.length / RESULTS_PER_PAGE);

    return (
        <WikiPage>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                }}>
                <Typography variant="h3" component="h3">
                    Suche
                </Typography>
                <TextField label="Search..." type="search" InputProps={{ ...register('query') }} />

                {!!query && !results.length && (
                    <Alert severity="info">Deine Suche nach &quot;{query}&quot; hat kein Ergebnis gefunden</Alert>
                )}

                {results.length > 0 && (
                    <>
                        {resultsOnPage.map(page => (
                            <SearchResult key={page.link} page={page} />
                        ))}
                        {pagesCount > 1 && (
                            <Pagination sx={{ mx: 'auto' }} count={pagesCount} page={page} onChange={(_, page) => setValue('page', page)} />
                        )}
                    </>
                )}
            </Box>
        </WikiPage>
    );
}

const SearchResult: React.FunctionComponent<{ page: IWikiPage } & BoxProps> = ({ page, ...props }) => {
    return (
        <Box component={Link} href={page.link} {...props}>
            <Typography variant="subtitle2" component="span" sx={theme => ({ color: theme.palette.secondary.main })}>
                {page.meta?.title ?? page.link}
            </Typography>
            {page.content && <Typography variant="body2">{limitWords(page.content)}</Typography>}
            <Typography variant="caption" sx={theme => ({ color: theme.palette.text.secondary })}>
                {page.link}
            </Typography>
        </Box>
    );
};

function limitWords(text: string) {
    return text.replace(/^(\w+(?:\W+\w+){50})(?:\W.*$|$)/s, '$1…');
}
