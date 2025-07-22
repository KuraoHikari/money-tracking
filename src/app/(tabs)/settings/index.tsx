import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import { withAuth } from "@/common/hocs";
import { SettingsContainer } from "@/modules/settings/components";

const SettingsScreen = () => {
  return (
    <SafeAreaView>
      <SettingsContainer />
    </SafeAreaView>
  );
};

export default withAuth(SettingsScreen);
