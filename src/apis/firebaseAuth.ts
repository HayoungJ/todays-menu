import { auth } from '../utils/firebase';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

export const googleLogin = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export const googleLogout = () => {
  return signOut(auth);
};
