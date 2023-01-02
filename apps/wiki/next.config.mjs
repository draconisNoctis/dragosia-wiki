import withMDX from '@next/mdx';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';

export default withMDX({
    extension: /\.mdx?$/,
    options: { providerImportSource: '@mdx-js/react', remarkPlugins: [remarkGfm, remarkFrontmatter] }
})({
    pageExtensions: ['tsx', 'mdx'],
    reactStrictMode: true,
    transpilePackages: ['@dragosia/ui']
});
