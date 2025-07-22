import React, { useEffect, useRef } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";

import { StyleSheet, View } from "react-native";
import type { RBSheetRef } from "react-native-raw-bottom-sheet";
import Toast from "react-native-toast-message";

import { updateEmail, updateProfile } from "firebase/auth";

import { Avatar, Button, Input } from "@/common/components";
import { useFetchState } from "@/common/hooks";
import { useUserAuth } from "@/modules/auth/contexts";

import type { IUpdateProfileForm } from "../../interfaces";
import ConfirmPassword from "./ConfirmPassword";

const AccountForm = () => {
  const { user } = useUserAuth();
  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<IUpdateProfileForm>();
  const emailValue = useWatch({ control, name: "email" });
  const nameValue = useWatch({ control, name: "displayName" });

  const { isLoading, startLoading, endLoading } = useFetchState();

  const pwSheetRef = useRef<RBSheetRef>(null);

  const handlePasswordConfirmed = async () => {
    if (user) {
      try {
        await updateProfile(user, { displayName: nameValue });
        await updateEmail(user, emailValue);
        endLoading();
        Toast.show({
          type: "success",
          text1: "Berhasil",
          text2: "Informasi akun berhasil diperbarui",
        });
        user.reload();
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: (error as any)?.message ?? "Terjadi kesalahan",
        });
      }

      endLoading();
    }
  };

  const submitHandler = async (values: IUpdateProfileForm) => {
    if (user) {
      startLoading();
      try {
        const isEmailChanged = user.email !== values.email;

        if (isEmailChanged) {
          pwSheetRef.current?.open();
        } else {
          await updateProfile(user, { displayName: values.displayName });
          endLoading();
          Toast.show({
            type: "success",
            text1: "Berhasil",
            text2: "Informasi akun berhasil diperbarui",
          });
          user.reload();
        }
      } catch (error) {
        // console.log("🚀 ~ submitHandler ~ error:", error);
        endLoading();
        Toast.show({
          type: "error",
          text1: "Error",
          text2: (error as any)?.message ?? "Terjadi kesalahan",
        });
      }
    }
  };

  useEffect(() => {
    if (user) {
      const { displayName, email } = user;
      reset({ displayName: displayName ?? "", email: email ?? "" });
    }
  }, [reset, user]);

  return (
    <>
      <View style={styles.root}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Avatar size={60} name={user?.displayName} />
        </View>

        <Controller
          control={control}
          name="displayName"
          rules={{
            required: "Nama harus diisi",
          }}
          render={({ field }) => {
            return (
              <Input
                {...field}
                onChangeText={field.onChange}
                label="Nama"
                placeholder="Nama"
                isRequired
                errorMessage={errors.displayName?.message}
                style={{ width: "100%" }}
              />
            );
          }}
        />
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email harus diisi",
            validate: (val) => {
              if (
                !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val)
              ) {
                return "Email tidak valid";
              }
            },
          }}
          render={({ field }) => {
            return (
              <Input
                {...field}
                onChangeText={field.onChange}
                label="Email"
                placeholder="Masukkan Email"
                isRequired
                errorMessage={errors.email?.message}
                autoCapitalize="none"
                textContentType="emailAddress"
                keyboardType="email-address"
              />
            );
          }}
        />
        <Button isLoading={isLoading} onPress={handleSubmit(submitHandler)}>
          Perbarui Informasi
        </Button>
      </View>

      <ConfirmPassword
        sheetRef={pwSheetRef}
        onConfirmed={handlePasswordConfirmed}
        onClose={endLoading}
      />
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    gap: 16,
  },
});

export default AccountForm;
