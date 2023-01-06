import {
    GoogleAuthProvider,
    signOut as _signOut,
    createUserWithEmailAndPassword,
    getAuth,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup
} from 'firebase/auth';

import { firebaseApp } from './app';

export const firebaseAuth = getAuth(firebaseApp);

export function createAccount(email: string, password: string) {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
}

export function signInAccount(email: string, password: string) {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
}

export function sendResetPasswordEmail(email: string) {
    return sendPasswordResetEmail(firebaseAuth, email);
}

export function signInWithGoogle() {
    return signInWithPopup(firebaseAuth, new GoogleAuthProvider());
}

export function signOut() {
    return _signOut(firebaseAuth);
}
