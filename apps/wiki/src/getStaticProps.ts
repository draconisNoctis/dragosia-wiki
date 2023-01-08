import { GetStaticProps } from 'next';

import { WikiPage } from '@dragosia/ui';

import { getPages } from './getPages';

export const getStaticProps: GetStaticProps<{ pages: WikiPage[] }> = async () => {
    return {
        props: {
            pages: await getPages()
        }
    };
};
