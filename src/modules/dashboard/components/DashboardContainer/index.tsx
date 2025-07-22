import React, { useMemo } from "react";

import IonIcon from "react-native-vector-icons/Ionicons";

import {
  Button,
  Container,
  RefreshableScrollView,
  Typography,
} from "@/common/components";
import { useUserAuth } from "@/modules/auth/contexts";
import { AddButton } from "@/modules/transactions/components";

import { useDashboardContext } from "../../contexts";
import Navbar from "../Navbar";
import RecentTrans from "../RecentTrans";
import Stats from "../Stats";

const DashboardContainer = () => {
  const { user } = useUserAuth();
  const { refreshers } = useDashboardContext();

  const displayName = useMemo(() => {
    return user?.displayName?.split(" ").slice(0, 2).join(" ");
  }, [user?.displayName]);

  return (
    <RefreshableScrollView
      refresher={async () => {
        await Promise.all(refreshers.map(async (r) => await r.action()));
      }}
    >
      <Container style={{ gap: 12 }}>
        <Navbar />
        <Typography fontWeight="700" style={{ fontSize: 24 }}>
          Halo, {displayName}!
        </Typography>
        <Stats />

        <AddButton
          customButton={
            <Button
              variant="light"
              leftIcon={(style) => (
                <IonIcon name="add" style={style} size={16} />
              )}
            >
              Add Record
            </Button>
          }
        />

        <RecentTrans />
      </Container>
    </RefreshableScrollView>
  );
};

export default DashboardContainer;
