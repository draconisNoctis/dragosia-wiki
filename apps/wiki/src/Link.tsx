import { Link, useWikiPage } from '@dragosia/ui';

export const WikiLink: React.FunctionComponent<React.PropsWithChildren<{ href?: string; target?: string; id?: string }>> = ({
    href = '#',
    target,
    children,
    id
}) => {
    const { pages } = useWikiPage();

    if (href.startsWith('wiki:')) {
        const suffix = href.substring(5);
        href = pages?.find(p => p.link.startsWith('/wiki') && p.link.endsWith(`/${suffix}`))?.link ?? `/wiki/${suffix}`;
    }

    return <Link autocolor {...{ href, target, children, id }} />;
};
