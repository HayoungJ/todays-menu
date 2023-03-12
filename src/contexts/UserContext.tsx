import { createContext, useContext, useState, useEffect } from 'react';

import { auth } from '../lib/firebase';
import { onAuthStateChanged, User as IFirebaseUser } from 'firebase/auth';

import { deleteCookie, setCookie } from '../utils/cookie';

const UserContext = createContext<IFirebaseUser | null>(null);

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<IFirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user: IFirebaseUser | null) => {
        if (!user) {
          setUser(null);
          deleteCookie('token');
          return;
        }

        setUser(user);
        const accessToken = await user.getIdToken();
        setCookie('token', accessToken);
      },
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
