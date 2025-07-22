import React from "react";

import { Stack } from "expo-router";

const SettingsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="account"
        options={{
          title: "My Account",
          headerBackTitle: "Settings",
        }}
      />
      <Stack.Screen
        name="categories"
        options={{
          title: "Categories",
          headerBackTitle: "Settings",
        }}
      />
      <Stack.Screen
        name="about"
        options={{
          title: "About App",
          headerBackTitle: "Settings",
        }}
      />
    </Stack>
  );
};

export default SettingsLayout;
