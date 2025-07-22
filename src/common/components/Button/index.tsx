import React, { forwardRef, useMemo } from "react";

import type {
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { ActivityIndicator, View } from "react-native";
import { StyleSheet, TouchableOpacity } from "react-native";

import type { ColorsKey } from "@react-navigation/native";
import { useTheme } from "@react-navigation/native";

import { opacityColor } from "@/common/utils/colors";

import Typography from "../Typography";

type ButtonVariant = "filled" | "outlined" | "light" | "subtle";

type ButtonColor = ColorsKey;

type ButtonProps = {
  variant?: ButtonVariant;
  color?: ButtonColor;
  fullWidth?: boolean;
  isLoading?: boolean;
  isCompact?: boolean;
  innerStyle?: StyleProp<ViewStyle>;
  leftIcon?: (style: StyleProp<TextStyle>) => React.ReactNode;
  rightIcon?: (style: StyleProp<TextStyle>) => React.ReactNode;
} & TouchableOpacityProps;

const Button = forwardRef<View, ButtonProps>(
  (
    {
      style,
      variant = "filled",
      color = "primary",
      isLoading,
      fullWidth,
      children,
      isCompact,
      innerStyle,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    const theme = useTheme();

    const containerVariants = useMemo((): Record<
      ButtonVariant,
      StyleProp<ViewStyle>
    > => {
      return {
        filled: {
          backgroundColor: theme.colors[color],
        },
        outlined: {
          backgroundColor: "transparent",
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: theme.colors[color],
        },
        light: {
          backgroundColor: opacityColor(theme.colors[color], 20),
        },
        subtle: {
          backgroundColor: "transparent",
        },
      };
    }, [color, theme.colors]);

    const textVariants = useMemo((): Record<
      ButtonVariant,
      StyleProp<TextStyle>
    > => {
      return {
        filled: { color: theme.colors.white },
        outlined: { color: theme.colors[color] },
        light: { color: theme.colors[color] },
        subtle: { color: theme.colors[color] },
      };
    }, [color, theme.colors]);

    return (
      <TouchableOpacity
        {...props}
        style={[
          fullWidth ? { width: "100%" } : {},
          { opacity: isLoading || disabled ? 0.6 : 1 },
          style,
        ]}
        ref={ref}
        disabled={disabled || isLoading}
      >
        <View
          style={[
            styles.inner,
            {
              paddingVertical: isCompact ? 10 : 16,
              paddingHorizontal: isCompact ? 14 : 18,
            },
            containerVariants[variant],
            innerStyle,
          ]}
        >
          {isLoading ? (
            <ActivityIndicator
              color={
                variant === "filled" ? theme.colors.white : theme.colors[color]
              }
            />
          ) : (
            <>
              {leftIcon?.(textVariants[variant])}
              <Typography
                fontWeight="700"
                style={[
                  styles.text,
                  { fontSize: isCompact ? 14 : 16 },
                  textVariants[variant],
                ]}
              >
                {children}
              </Typography>
              {rightIcon?.(textVariants[variant])}
            </>
          )}
        </View>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  inner: {
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  text: {
    textAlign: "center",
  },
});

export default Button;
