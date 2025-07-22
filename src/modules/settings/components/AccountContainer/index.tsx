import React from "react";

import { ScrollView, StyleSheet, View } from "react-native";

import { Container, Typography } from "@/common/components";
import { opacityColor } from "@/common/utils/colors";

import AccountForm from "../AccountForm";
import UpdatePasswordForm from "../UpdatePasswordForm";

const AccountContainer = () => {
  return (
    <ScrollView>
      <Container>
        <View style={styles.root}>
          <View>
            <Typography style={styles.title} fontWeight="700">
              Informasi Akun
            </Typography>
            <AccountForm />
          </View>

          <View style={styles.divider} />

          <View>
            <Typography style={styles.title} fontWeight="700">
              Ganti Password
            </Typography>
            <UpdatePasswordForm />
          </View>
        </View>
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    gap: 30,
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: opacityColor("#000000", 5),
    marginVertical: 8,
  },
});

export default AccountContainer;
