import React, { forwardRef, useEffect, useRef } from "react";

import type { ViewProps } from "react-native";
import { Animated, View } from "react-native";

import { useTheme } from "@react-navigation/native";

import { opacityColor } from "@/common/utils/colors";

import Typography from "../Typography";

const Loading = forwardRef<View, ViewProps>(({ style, ...props }, ref) => {
  const imageAnim = useRef(new Animated.ValueXY()).current;
  const theme = useTheme();

  useEffect(() => {
    const duration = 1000;
    Animated.loop(
      Animated.sequence([
        Animated.timing(imageAnim, {
          toValue: { x: 10, y: 5 },
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(imageAnim, {
          toValue: { x: 0, y: 10 },
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(imageAnim, {
          toValue: { x: -10, y: 5 },
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(imageAnim, {
          toValue: { x: 0, y: 0 },
          duration,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [imageAnim]);

  return (
    <View
      ref={ref}
      {...props}
      style={[style, { alignItems: "center", gap: 10 }]}
    >
      <Animated.Image
        source={require("../../../../assets/images/loading.png")}
        style={[
          { width: 100, height: 100, objectFit: "contain" },
          {
            transform: [
              { translateY: imageAnim.y },
              { translateX: imageAnim.x },
            ],
          },
        ]}
      />
      <Typography
        style={{
          textAlign: "center",
          color: opacityColor(theme.colors.gray, 80),
        }}
      >
        Memuat...
      </Typography>
    </View>
  );
});

export default Loading;
