import { useCallback, useEffect, useState } from "react";

import { View } from "react-native";
import Toast from "react-native-toast-message";

import {
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
  useFonts,
} from "@expo-google-fonts/inter";
import { ThemeProvider } from "@react-navigation/native";
import dayjs from "dayjs";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import theme from "@/common/configs/theme";
import { toastConfig } from "@/common/configs/toast";
import { UserAuthProvider } from "@/modules/auth/contexts";

import "react-native-reanimated";
import "dayjs/locale/id";

dayjs.locale("en");

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  const [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  useEffect(() => {
    if (fontsLoaded) {
      // Wait 5 seconds before setting isReady
      const timeout = setTimeout(() => {
        setIsReady(true);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(() => {
    if (isReady) {
      SplashScreen.hide();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <ThemeProvider value={theme}>
      <UserAuthProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="get-started" options={{ headerShown: false }} />
          <Stack.Screen name="auth" options={{ headerShown: false }} />
        </Stack>
        <Toast config={toastConfig} />
      </UserAuthProvider>
      <StatusBar style="auto" />
      <View onLayout={onLayoutRootView} />
    </ThemeProvider>
  );
}
