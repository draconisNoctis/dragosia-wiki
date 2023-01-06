import { CollectionReference, collection, getFirestore } from 'firebase/firestore';

import { firebaseApp } from './app';

export const firestore = getFirestore(firebaseApp);

export interface ReactionData {
    domain: string;
    parent: string;
    author: string;
    reaction: string;
}

export interface CommentData {
    author: string;
    date: string;
    parent: string;
    comment: string;
}

export interface UserData {
    username: string;
}

export const collections = {
    comments: collection(firestore, 'comments') as CollectionReference<CommentData>,
    users: collection(firestore, 'users') as CollectionReference<UserData>,
    reactions: collection(firestore, 'reactions') as CollectionReference<ReactionData>
};

export { QueryClient, QueryClientProvider } from 'react-query';
