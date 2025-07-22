import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebase-config";

import { Button, Input, Typography } from "@/common/components";
import theme from "@/common/configs/theme";
import { useRemoveAndReplace } from "@/common/hooks";

import { useAuthScreen, useUserAuth } from "../../contexts";
import type { ISignInForm } from "../../interfaces";

const SignIn = () => {
  const { removeAndReplace } = useRemoveAndReplace();

  const { setUser } = useUserAuth();
  const { setMode } = useAuthScreen();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInForm>();
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (values: ISignInForm) => {
    setIsLoading(true);
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      setUser(user);
      removeAndReplace("/dashboard");
      setIsLoading(false);
    } catch (err: any) {
      Alert.alert("Error", err.message);
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      <Typography fontWeight="700" style={styles.title}>
        Wellcome Back
      </Typography>
      <Typography fontWeight="500" style={styles.subtitle}>
        Please sign in to continue
      </Typography>

      <View style={styles.form}>
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email needs to be filled",
            validate: (val) => {
              if (
                !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val)
              ) {
                return "Email not valid";
              }
            },
          }}
          render={({ field }) => {
            return (
              <Input
                {...field}
                onChangeText={field.onChange}
                label="Email"
                placeholder="Enter your email"
                isRequired
                errorMessage={errors.email?.message}
                autoCapitalize="none"
                textContentType="emailAddress"
                keyboardType="email-address"
              />
            );
          }}
        />
        <Controller
          control={control}
          name="password"
          rules={{
            required: "Password needs to be filled",
          }}
          render={({ field }) => {
            return (
              <Input
                {...field}
                onChangeText={field.onChange}
                label="Password"
                placeholder="Password"
                isRequired
                secureTextEntry
                errorMessage={errors.password?.message}
              />
            );
          }}
        />
      </View>

      <Button
        onPress={handleSubmit(submitHandler)}
        fullWidth
        style={{ marginBottom: 6 }}
        isLoading={isLoading}
      >
        Login
      </Button>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Typography>Don't have an account? </Typography>
        <TouchableOpacity onPress={() => setMode("sign-up")}>
          <Typography fontWeight="700" style={{ color: theme.colors.primary }}>
            SignUp
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    position: "relative",
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    marginBottom: 4,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 16,
    color: "#999999",
  },
  form: {
    marginVertical: 16,
    gap: 12,
    width: "100%",
  },
});

export default SignIn;
