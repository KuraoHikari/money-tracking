import React, { forwardRef } from "react";

import type { ViewProps } from "react-native";
import { StyleSheet, View } from "react-native";

import { useTheme } from "@react-navigation/native";

import Typography from "../Typography";

type AvatarProps = {
  name?: string | null;
  size?: number;
} & ViewProps;

const Avatar = forwardRef<View, AvatarProps>(
  ({ style, name, size = 40, ...props }, ref) => {
    const theme = useTheme();

    return (
      <View
        style={[
          styles.root,
          { borderColor: theme.colors.primary },
          { width: size, height: size },
          style,
        ]}
        ref={ref}
        {...props}
      >
        <View style={[styles.inner, { backgroundColor: theme.colors.primary }]}>
          <Typography
            fontWeight="600"
            style={[styles.text, { fontSize: size / 2 }]}
          >
            {name?.trim()[0].toUpperCase() ?? "A"}
          </Typography>
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  root: {
    borderRadius: "50%",
    borderWidth: 1,
    borderStyle: "solid",
    padding: 1,
  },
  inner: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
});

export default Avatar;
