import React, { useEffect } from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import { useRouter } from "expo-router";

import { SignIn, SignUp } from "@/modules/auth/components";
import { useUserAuth } from "@/modules/auth/contexts";
import {
  AuthScreenContext,
  AuthScreenProvider,
} from "@/modules/auth/contexts/AuthScreenContext";

const AuthScreen = () => {
  const { replace } = useRouter();
  const { user } = useUserAuth();

  useEffect(() => {
    if (user) {
      replace("/dashboard");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <SafeAreaView>
      <AuthScreenProvider>
        <AuthScreenContext.Consumer>
          {({ mode }) => {
            return mode === "sign-in" ? <SignIn /> : <SignUp />;
          }}
        </AuthScreenContext.Consumer>
      </AuthScreenProvider>
    </SafeAreaView>
  );
};

export default AuthScreen;
