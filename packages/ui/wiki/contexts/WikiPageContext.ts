import React from 'react';

export type ProfileValue = string | [content: string, href: string];
export interface PersonProfile {
    '@': 'person';
    '@Image'?: string;
    Name: string;
    Beruf: ProfileValue;
}

export type Profile = PersonProfile;
export interface WikiPageMeta {
    title: string;
    tags?: string[];
    profile?: Profile;
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
