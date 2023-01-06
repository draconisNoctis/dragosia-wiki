import { useFirestoreDocumentData } from '@react-query-firebase/firestore';
import { doc, runTransaction } from 'firebase/firestore';
import React from 'react';

import { UserData, collections, firestore } from '../firestore';

export function createUserIfNotExists(uid: string, data: UserData) {
    return runTransaction(firestore, async transaction => {
        const userDocRef = doc(collections.users, uid);
        const userDoc = await transaction.get(userDocRef);

        if (userDoc.exists()) {
            return;
        }

        transaction.set(userDocRef, data);
    });
}

export function useQueryUserByUid(uid: string) {
    const ref = React.useMemo(() => doc(collections.users, uid), [uid]);

    const { data, isLoading, error } = useFirestoreDocumentData(['users', uid], ref);

    return [data, isLoading, error] as const;
}
