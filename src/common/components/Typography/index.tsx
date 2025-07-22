import React, { forwardRef } from "react";

import type { TextProps } from "react-native";
import { Text } from "react-native";

import type { FontWeight } from "@/common/interfaces/typography";

const weightNames = {
  100: "Thin",
  200: "ExtraLight",
  300: "Light",
  400: "Regular",
  500: "Medium",
  600: "SemiBold",
  700: "Bold",
  800: "ExtraBold",
  900: "Black",
};

type TypographyProps = {
  fontWeight?: FontWeight;
} & TextProps;

const Typography = forwardRef<Text, TypographyProps>(
  ({ children, style, fontWeight = "400", ...props }, ref) => {
    return (
      <Text
        ref={ref}
        {...props}
        style={[
          {
            fontFamily: `Inter_${fontWeight}${weightNames[fontWeight]}`,
          },
          style,
        ]}
      >
        {children}
      </Text>
    );
  }
);

export default Typography;
