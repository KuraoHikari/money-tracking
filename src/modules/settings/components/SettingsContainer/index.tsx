import React from "react";

import { StyleSheet, View } from "react-native";

import { Link, useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "firebase-config";

import { AlertSheet, Button, Typography } from "@/common/components";
import { useDisclosure } from "@/common/hooks";
import { useUserAuth } from "@/modules/auth/contexts";

import { settingItems } from "../../constants";
import SettingItem from "../SettingItem";

const SettingsContainer = () => {
  const { dismissTo } = useRouter();

  const { setUser } = useUserAuth();

  const [isOpenLogout, { open: openLogout, close: closeLogout }] =
    useDisclosure();

  const handleSignOut = async () => {
    await signOut(auth);
    dismissTo("/auth");
    setUser(null);
  };

  return (
    <View style={styles.root}>
      <View style={{ flex: 1 }}>
        <Typography style={styles.listTitle} fontWeight="700">
          Settings
        </Typography>

        <View style={{ gap: 30 }}>
          {settingItems.map((item, index) => {
            const isSignOut = item.title === "Sign Out";

            return (
              <React.Fragment key={index}>
                {isSignOut ? (
                  <SettingItem
                    {...item}
                    action={item.title === "Sign Out" ? openLogout : undefined}
                  />
                ) : (
                  <Link asChild href={item.path ?? "/"}>
                    <SettingItem {...item} />
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </View>
      </View>

      <AlertSheet
        isOpen={isOpenLogout}
        title="Logout Account"
        description="Are you sure you want to logout? You will have to log in
        again."
        action={
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Button style={{ flex: 1 }} variant="light" onPress={handleSignOut}>
              Logout
            </Button>
            <Button style={{ flex: 1 }} onPress={closeLogout}>
              Cancel
            </Button>
          </View>
        }
        onClose={closeLogout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 24,
    minHeight: "100%",
  },
  titleWrapper: {
    flexDirection: "row",
    marginBottom: 14,
    justifyContent: "center",
  },
  listTitle: {
    fontSize: 30,
    marginVertical: 28,
    textAlign: "center",
  },
});

export default SettingsContainer;
