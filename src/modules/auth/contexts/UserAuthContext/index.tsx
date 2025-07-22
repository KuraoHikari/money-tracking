import type { Dispatch, FC, PropsWithChildren, SetStateAction } from "react";
import { createContext, useContext, useEffect, useState } from "react";

import type { User } from "firebase/auth";
import { auth } from "firebase-config";

type UserAuthCtx = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

export const UserAuthContext = createContext<UserAuthCtx>({
  user: null,
  setUser: () => {},
});

export const UserAuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const getValidatedUser = () => {
      return new Promise<User | null>((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged((_user) => {
          unsubscribe();
          resolve(_user);
        }, reject);
      });
    };

    const getUser = async () => {
      const _user = await getValidatedUser();
      setUser(_user);
      setIsReady(true);
    };

    getUser();
  }, []);

  return (
    <UserAuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {isReady ? children : null}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => useContext(UserAuthContext);
