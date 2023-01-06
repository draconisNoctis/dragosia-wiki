import { useFirestoreQueryData } from '@react-query-firebase/firestore';
import { deleteDoc, doc, query, setDoc, where } from 'firebase/firestore';
import React from 'react';

import { collections } from '../firestore';

export async function addReaction(domain: string, parent: string, author: string, reaction: string) {
    const ref = doc(collections.reactions, domain + '~' + parent + '~' + author + '~' + reaction);

    await setDoc(ref, {
        domain,
        parent,
        author,
        reaction
    });
}

export async function removeReaction(domain: string, parent: string, author: string, reaction: string) {
    const ref = doc(collections.reactions, domain + '~' + parent + '~' + author + '~' + reaction);

    await deleteDoc(ref);
}

export function useQueryReactionsByParent(domain: string, parent: string) {
    const ref = React.useMemo(
        () => query(collections.reactions, where('domain', '==', domain), where('parent', '==', parent)),
        [domain, parent]
    );

    const { data, isLoading, error } = useFirestoreQueryData(
        ['reactions', domain, parent],
        ref,
        { subscribe: true },
        {
            select(data) {
                const result: Record<string, string[]> = {};

                if (data) {
                    for (const doc of data) {
                        if (!(doc.reaction in result)) {
                            result[doc.reaction] = [];
                        }
                        result[doc.reaction].push(doc.author);
                    }
                }
                return result;
            }
        }
    );

    return [data ?? {}, isLoading, error] as const;
}
