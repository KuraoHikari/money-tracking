import React, { useEffect } from "react";

import { Animated, StyleSheet, useAnimatedValue, View } from "react-native";
import { LinearGradient } from "react-native-gradients";

import { useTheme } from "@react-navigation/native";
import { Link } from "expo-router";

import { Button, Typography } from "@/common/components";

const GetStarted = () => {
  const theme = useTheme();
  const imageAnim = useAnimatedValue(0);

  useEffect(() => {
    const duration = 3000;
    Animated.loop(
      Animated.sequence([
        Animated.timing(imageAnim, {
          toValue: 30,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(imageAnim, {
          toValue: 0,
          duration,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [imageAnim]);

  return (
    <View style={styles.root}>
      <View style={styles.imageWrapper}>
        <View style={styles.circleImage}>
          <LinearGradient
            angle={120}
            colorList={[
              { color: theme.colors.primary, offset: "0%", opacity: "0.5" },
              { color: theme.colors.primary, offset: "20%", opacity: "0.4" },
              { color: theme.colors.primary, offset: "35%", opacity: "0.3" },
              { color: theme.colors.primary, offset: "80%", opacity: "0" },
            ]}
          />
        </View>

        <Animated.Image
          source={require("../../../../../assets/images/get-started.png")}
          style={[
            styles.image,
            {
              transform: [{ translateY: imageAnim }, { scale: 1.2 }],
            },
          ]}
        />
      </View>

      <View style={styles.titleWrapper}>
        <Typography fontWeight="700" style={styles.title}>
          Money
        </Typography>
        <Typography
          fontWeight="700"
          style={[styles.title, { color: theme.colors.primary }]}
        >
          Tracking
        </Typography>
      </View>

      <Typography style={styles.description}>
        Track your money easily and efficiently with our app. Manage your
        finances, monitor expenses, and achieve your financial goals with ease.
      </Typography>

      <Link href="/auth" asChild>
        <Button fullWidth>Get Started</Button>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    padding: 32,
  },
  titleWrapper: {
    flexDirection: "row",
    marginBottom: 14,
  },
  title: {
    fontSize: 38,
  },
  description: {
    textAlign: "center",
    lineHeight: 22,
    fontSize: 16,
    marginBottom: 24,
  },
  imageWrapper: {
    marginBottom: 24,
    position: "relative",
  },
  circleImage: {
    width: 300,
    height: 300,
    borderRadius: 999,
    overflow: "hidden",
  },
  image: {
    width: 300,
    height: 300,
    position: "absolute",
    inset: 0,
  },
});

export default GetStarted;
