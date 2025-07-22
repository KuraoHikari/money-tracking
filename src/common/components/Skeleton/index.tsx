import React, { forwardRef, useEffect } from "react";

import type { ViewProps } from "react-native";
import { View } from "react-native";
import { Animated, useAnimatedValue } from "react-native";

import { useTheme } from "@react-navigation/native";

import { opacityColor } from "@/common/utils/colors";

type SkeletonProps = ViewProps;

const Skeleton = forwardRef<View, SkeletonProps>(
  ({ style, children, ...props }, ref) => {
    const theme = useTheme();
    const fadeAnim = useAnimatedValue(0.5);

    useEffect(() => {
      const duration = 1000;
      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0.5,
            duration,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, [fadeAnim]);

    return (
      <Animated.View
        ref={ref}
        style={[
          {
            backgroundColor: opacityColor(theme.colors.black, 20),
            opacity: fadeAnim,
            borderRadius: 8,
            alignSelf: "flex-start",
          },
          style,
        ]}
        {...props}
      >
        {children ? (
          <View
            style={{
              opacity: 0,
            }}
          >
            {children}
          </View>
        ) : null}
      </Animated.View>
    );
  }
);

export default Skeleton;
