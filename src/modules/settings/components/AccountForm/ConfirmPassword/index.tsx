import React, { useState } from "react";

import { View } from "react-native";
import type { RBSheetProps, RBSheetRef } from "react-native-raw-bottom-sheet";
import RBSheet from "react-native-raw-bottom-sheet";
import Toast from "react-native-toast-message";

import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";

import { Button, Container, Input, Typography } from "@/common/components";
import { useFetchState } from "@/common/hooks";
import { useUserAuth } from "@/modules/auth/contexts";

type ConfirmPasswordProps = {
  onConfirmed: () => void;
  sheetRef: React.RefObject<RBSheetRef>;
} & RBSheetProps;

const ConfirmPassword: React.FC<ConfirmPasswordProps> = ({
  onConfirmed,
  sheetRef,
  ...props
}) => {
  const { user } = useUserAuth();

  const [passwordValue, setPasswordValue] = useState("");
  const { isLoading, startLoading, endLoading } = useFetchState();

  const handleCheckPassword = async () => {
    startLoading();
    if (user) {
      try {
        const credential = EmailAuthProvider.credential(
          user?.email ?? "",
          passwordValue
        );
        await reauthenticateWithCredential(user, credential);
        onConfirmed();
        endLoading();
        sheetRef.current?.close();
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
    <RBSheet ref={sheetRef} {...props} onOpen={() => setPasswordValue("")}>
      <Container>
        <Typography style={{ fontSize: 18, marginBottom: 8 }} fontWeight="700">
          Konfirmasi password
        </Typography>
        <Typography>
          Anda perlu memasukkan password untuk konfirmasi ingin mengganti email
        </Typography>

        <View style={{ marginTop: 10, gap: 14 }}>
          <Input
            secureTextEntry
            label="Password"
            placeholder="Password"
            value={passwordValue}
            onChangeText={setPasswordValue}
          />
          <Button
            onPress={handleCheckPassword}
            disabled={!passwordValue}
            isLoading={isLoading}
          >
            Konfirmasi
          </Button>
        </View>
      </Container>
    </RBSheet>
  );
};

export default ConfirmPassword;
