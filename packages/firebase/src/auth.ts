import { GoogleAuthProvider, signOut as _signOut, getAuth, signInWithPopup } from 'firebase/auth';
import { useAuthState as _useAuthState } from 'react-firebase-hooks/auth';

import { firebaseApp } from './app';

export const firebaseAuth = getAuth(firebaseApp);

export async function signInWithGoogle() {
    return signInWithPopup(firebaseAuth, new GoogleAuthProvider());
}

export function signOut() {
    return _signOut(firebaseAuth);
}
