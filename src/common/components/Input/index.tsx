import React, { forwardRef, useState } from "react";

import type { TextInputProps } from "react-native";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import { useTheme } from "@react-navigation/native";

import { opacityColor } from "@/common/utils/colors";

import Typography from "../Typography";

export type InputProps = {
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  label?: string;
  isRequired?: boolean;
  errorMessage?: React.ReactNode;
} & TextInputProps;

const Input = forwardRef<TextInput, InputProps>(
  (
    {
      style,
      leftContent,
      rightContent,
      secureTextEntry,
      label,
      isRequired,
      errorMessage,
      ...props
    },
    ref
  ) => {
    const theme = useTheme();
    const [isPasswordShow, setIsPasswordShow] = useState(false);

    return (
      <View>
        <View style={styles.labelWrapper}>
          {label ? (
            <>
              <Typography fontWeight="600" style={styles.label}>
                {label}
              </Typography>
              {isRequired ? (
                <Typography style={{ color: theme.colors.notification }}>
                  *
                </Typography>
              ) : null}
            </>
          ) : null}
        </View>
        <View
          style={[
            styles.wrapper,
            {
              borderColor: errorMessage
                ? theme.colors.notification
                : opacityColor(theme.colors.gray, 20),
            },
          ]}
        >
          {leftContent}
          <TextInput
            {...props}
            secureTextEntry={secureTextEntry && !isPasswordShow}
            style={[styles.input, style]}
            placeholderTextColor={
              errorMessage
                ? theme.colors.red
                : opacityColor(theme.colors.gray, 50)
            }
            {...(secureTextEntry
              ? {
                  autoCapitalize: "none",
                  textContentType: "password",
                  keyboardType: isPasswordShow ? "visible-password" : undefined,
                }
              : {})}
            ref={ref}
          />
          {secureTextEntry ? (
            <TouchableOpacity
              onPress={() => setIsPasswordShow((prev) => !prev)}
              style={styles.eyeButton}
            >
              <Icon
                style={{
                  color: "#999999",
                }}
                name={isPasswordShow ? "eye-off" : "eye"}
                size={24}
              />
            </TouchableOpacity>
          ) : null}
          {rightContent}
        </View>
        {errorMessage ? (
          <View style={styles.errorWrapper}>
            <Icon
              name="alert-circle-outline"
              color={theme.colors.notification}
              size={16}
            />
            <Typography style={{ color: theme.colors.notification }}>
              {errorMessage}
            </Typography>
          </View>
        ) : null}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  root: {},
  labelWrapper: {
    flexDirection: "row",
    gap: 2,
  },
  label: {
    marginBottom: 6,
  },
  wrapper: {
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    paddingVertical: 14,
    paddingHorizontal: 8,
    fontFamily: "Inter_500Medium",
    flex: 1,
  },
  eyeButton: {
    marginRight: 6,
  },
  errorWrapper: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});

export default Input;
