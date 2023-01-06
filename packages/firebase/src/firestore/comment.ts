import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { addDoc, orderBy, query, where } from 'firebase/firestore';
import React from 'react';

import { CommentData, UserData, collections } from '../firestore';

import { createUserIfNotExists } from './user';

export async function createComment(comment: CommentData, user?: { uid: string } & UserData) {
    if (user) {
        const { uid, ...userData } = user;
        await createUserIfNotExists(uid, userData);
    }
    return addDoc(collections.comments, comment);
}

export function useQueryCommentsByParent(id: string) {
    const ref = React.useMemo(() => query(collections.comments, where('parent', '==', id), orderBy('date', 'desc')), [id]);
    const { data, isLoading, error } = useFirestoreQuery(['commentsByParent', id], ref, { subscribe: true });

    return [data, isLoading, error] as const;
}
