import React, { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";

import { StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

import { Button, Input } from "@/common/components";
import { useFetchState } from "@/common/hooks";
import { useUserAuth } from "@/modules/auth/contexts";

import type { IUpdatePasswordForm } from "../../interfaces";

const UpdatePasswordForm = () => {
  const { user } = useUserAuth();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IUpdatePasswordForm>();
  const passwordValue = useWatch({ control, name: "newPassword" });

  const [isOldValid, setIsOldValid] = useState(false);
  const [oldValue, setOldValue] = useState("");
  const {
    isLoading: isLoadingCheck,
    startLoading: startLoadingCheck,
    endLoading: endLoadingCheck,
  } = useFetchState();

  const handleCheckPassword = async () => {
    startLoadingCheck();
    if (user) {
      try {
        const credential = EmailAuthProvider.credential(
          user?.email ?? "",
          oldValue
        );
        await reauthenticateWithCredential(user, credential);
        setIsOldValid(true);
        endLoadingCheck();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        endLoadingCheck();
        setIsOldValid(false);
      }
    }
  };

  const { isLoading, startLoading, endLoading } = useFetchState();

  const submitHandler = async (values: IUpdatePasswordForm) => {
    startLoading();
    if (user) {
      try {
        await updatePassword(user, values.newPassword);
        endLoading();
        setIsOldValid(false);
        setOldValue("");
        Toast.show({
          type: "success",
          text1: "Berhasil",
          text2: "Password berhasil diganti",
        });
      } catch (error) {
        endLoading();
        Toast.show({
          type: "error",
          text1: "Error",
          text2: (error as any)?.message ?? "Terjadi kesalahan",
        });
      }
    }
  };

  return (
    <View style={styles.root}>
      {isOldValid ? (
        <>
          <Controller
            control={control}
            name="newPassword"
            rules={{
              required: "Password harus diisi",
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
                  errorMessage={errors.newPassword?.message}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: "Konfirmasi Password harus diisi",
              validate: (val) => {
                return passwordValue !== val
                  ? "Konfirmasi Password tidak cocok"
                  : undefined;
              },
            }}
            render={({ field }) => {
              return (
                <Input
                  {...field}
                  onChangeText={field.onChange}
                  label="Konfirmasi Password"
                  placeholder="Konfirmasi Password"
                  isRequired
                  secureTextEntry
                  errorMessage={errors.confirmPassword?.message}
                />
              );
            }}
          />
          <Button isLoading={isLoading} onPress={handleSubmit(submitHandler)}>
            Ganti Password
          </Button>
        </>
      ) : (
        <>
          <Input
            value={oldValue}
            onChangeText={setOldValue}
            label="Password Sekarang"
            placeholder="Masukkan password..."
            isRequired
            secureTextEntry
          />
          <Button
            isLoading={isLoadingCheck}
            disabled={!oldValue}
            onPress={handleCheckPassword}
          >
            Cek password
          </Button>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    gap: 16,
  },
});

export default UpdatePasswordForm;
