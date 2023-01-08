import React from 'react';

export interface WikiPageMeta {
    title: string;
    tags?: string[];
}

export interface WikiPage {
    filename: string;
    link: string;
    meta?: WikiPageMeta | null;
}

export interface IWikiPageContext {
    title: string;
    page?: WikiPage;
    pages?: WikiPage[];
}

export const WikiPageContext = React.createContext<IWikiPageContext>({ title: 'Dragosia' });
