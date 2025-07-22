import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import { withAuth } from "@/common/hocs";
import { DashboardContainer } from "@/modules/dashboard/components";
import { DashboardProvider } from "@/modules/dashboard/contexts";

const DashboardScreen = () => {
  return (
    <SafeAreaView>
      <DashboardProvider>
        <DashboardContainer />
      </DashboardProvider>
    </SafeAreaView>
  );
};

export default withAuth(DashboardScreen);
