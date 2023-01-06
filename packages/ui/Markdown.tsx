import { Box, Typography, TypographyTypeMap, useTheme } from '@mui/material';
import { DefaultComponentProps, OverrideProps } from '@mui/material/OverridableComponent';
import ReactMarkdown from 'react-markdown';
import { SpecialComponents } from 'react-markdown/lib/ast-to-react';
import { NormalComponents } from 'react-markdown/lib/complex-types';

interface MarkdownComponent {
    <C extends React.ElementType>(
        props: {
            /**
             * The component used for the root node.
             * Either a string to use a HTML element or a component.
             */
            component: C;
            children?: string;
        } & Omit<OverrideProps<TypographyTypeMap, C>, 'children'>
    ): JSX.Element | null;
    (props: Omit<DefaultComponentProps<TypographyTypeMap>, 'children'> & { children?: string }): JSX.Element | null;
}

const components: Partial<Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents> = {
    blockquote: ({ children }) => (
        <Box
            component="blockquote"
            sx={theme => ({
                ml: 0,
                pl: 1,
                color: theme.palette.text.secondary,
                borderLeft: `2px solid ${theme.palette.divider}`
            })}>
            {children}
        </Box>
    )
};

export const Markdown: MarkdownComponent = ({ children = '', ...props }) => {
    return (
        <Typography component="div" {...props}>
            <ReactMarkdown components={components} skipHtml={true}>
                {children}
            </ReactMarkdown>
        </Typography>
    );
};

export default Markdown;
