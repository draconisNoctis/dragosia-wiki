import withBundleAnalyzer from '@next/bundle-analyzer';
import withMDX from '@next/mdx';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';

export default withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })(
    withMDX({
        extension: /\.mdx?$/,
        options: {
            providerImportSource: '@mdx-js/react',
            remarkPlugins: [remarkGfm, remarkFrontmatter]
        }
    })({
        pageExtensions: ['ts', 'tsx', 'md', 'mdx', 'js', 'jsx'],
        reactStrictMode: true,
        transpilePackages: ['@dragosia/ui', '@dragosia/firebase']
    })
);
