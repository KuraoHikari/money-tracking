import type { Dispatch, FC, PropsWithChildren, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";

type AuthMode = "sign-in" | "sign-up";

type AuthScreenCtx = {
  mode: AuthMode;
  setMode: Dispatch<SetStateAction<AuthMode>>;
};

export const AuthScreenContext = createContext<AuthScreenCtx>({
  mode: "sign-in",
  setMode: () => {},
});

export const AuthScreenProvider: FC<PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = useState<AuthMode>("sign-in");

  return (
    <AuthScreenContext.Provider value={{ mode, setMode }}>
      {children}
    </AuthScreenContext.Provider>
  );
};

export const useAuthScreen = () => useContext(AuthScreenContext);
