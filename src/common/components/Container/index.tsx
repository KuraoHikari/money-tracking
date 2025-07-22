import React, { forwardRef } from "react";

import type { ViewProps } from "react-native";
import { StyleSheet, View } from "react-native";

const Container = forwardRef<View, ViewProps>(
  ({ style, children, ...props }, ref) => {
    return (
      <View style={[styles.root, style]} {...props} ref={ref}>
        {children}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  root: {
    padding: 16,
  },
});

export default Container;
