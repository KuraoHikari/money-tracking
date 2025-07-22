import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import { Redirect } from "expo-router";

import { useUserAuth } from "@/modules/auth/contexts";
import { GetStarted } from "@/modules/landing/components";

const GetStartedScreen = () => {
  const { user } = useUserAuth();

  if (user) {
    return <Redirect href="/dashboard" />;
  }

  return (
    <SafeAreaView>
      <GetStarted />
    </SafeAreaView>
  );
};

export default GetStartedScreen;
