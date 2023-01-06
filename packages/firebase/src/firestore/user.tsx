import { useFirestoreDocumentData } from '@react-query-firebase/firestore';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, runTransaction } from 'firebase/firestore';
import React, { useContext } from 'react';

import { firebaseAuth } from '../auth';
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

export function useQueryUserByUid(uid?: string) {
    const ref = React.useMemo(() => doc(collections.users, uid), [uid]);

    const { data, isLoading, error } = useFirestoreDocumentData(['users', uid], ref);

    return [data, isLoading, error] as const;
}

export const CurrentUserContext = React.createContext<{ auth: User | null; user: UserData | null }>({ auth: null, user: null });

export const CurrentUserProvider: React.FunctionComponent<React.PropsWithChildren> = ({ children }) => {
    const [currentUser, setCurrentUser] = React.useState<{ auth: User | null; user: UserData | null }>({ auth: null, user: null });

    React.useEffect(() => {
        const listener = onAuthStateChanged(firebaseAuth, async auth => {
            if (!auth) return setCurrentUser({ auth: null, user: null });

            const userDoc = await getDoc(doc(collections.users, auth.uid));

            setCurrentUser({ auth, user: userDoc.data() ?? null });
        });
        return listener;
    }, []);

    return <CurrentUserContext.Provider value={currentUser}>{children}</CurrentUserContext.Provider>;
};

export function useCurrentAuth() {
    return useContext(CurrentUserContext).auth;
}

export function useCurrentUser() {
    return useContext(CurrentUserContext).user;
}
